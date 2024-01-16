import { Message } from 'view-design'
import log from '@wii-fe/wau/src/utils/log'

const messageType = 'application/x-wau-v1+json'
const maxHandshakeRequests = 5
let _messageId = 0
const generateNewMessageId = () => ++_messageId
const isDev = process.env.NODE_ENV !== 'production'
const print = (text) => {
  if (isDev) {
    if (text.includes('Parent:')) {
      log.primary(text)
    } else if (text.includes('Child:')) {
      log.success(text)
    } else {
      log.default(text)
    }
  }
}

const resolveOrigin = (url) => {
  const a = document.createElement('a')
  a.href = url
  const protocol = a.protocol.length > 4 ? a.protocol : window.location.protocol
  const host = a.host.length
    ? a.port === '80' || a.port === '443'
      ? a.hostname
      : a.host
    : window.location.host
  return a.origin || `${protocol}//${host}`
}

const messageTypes = {
  handshake: 1,
  'handshake-reply': 1,
  call: 1,
  emit: 1,
  reply: 1,
  request: 1
}

const sanitize = (message, allowedOrigin) => {
  if (typeof allowedOrigin === 'string' && message.origin !== allowedOrigin)
    return false
  if (!message.data) return false
  if (typeof message.data === 'object' && !('waupost' in message.data))
    return false
  if (message.data.type !== messageType) return false
  if (!messageTypes[message.data.waupost]) return false
  return true
}

const resolveValue = (model, property) => {
  const unwrappedContext =
    typeof model[property] === 'function' ? model[property]() : model[property]
  return Promise.resolve(unwrappedContext)
}

class ParentAPI {
  constructor(info) {
    this.parent = info.parent
    this.frame = info.frame
    this.child = info.child
    this.childOrigin = info.childOrigin

    this.events = {}
    print('Parent: iframe parent register')
    print('Parent: await messages...')

    this.listener = (e) => {
      if (!sanitize(e, this.childOrigin)) return false
      const { data, name } = ((e || {}).data || {}).value || {}

      if (e.data.waupost === 'emit') {
        print(`Parent: receive event name: ${name}`)
        if (name in this.events) {
          this.events[name].forEach((callback) => {
            callback.call(this, data)
          })
        }
      }
    }

    this.parent.addEventListener('message', this.listener, false)
    print('Parent: await event name from child')
  }

  get(property) {
    return new Promise((resolve) => {
      // Extract data from response and kill listeners
      const uid = generateNewMessageId()
      const transact = (e) => {
        if (e.data.uid === uid && e.data.waupost === 'reply') {
          this.parent.removeEventListener('message', transact, false)
          resolve(e.data.value)
        }
      }

      // Prepare for response from Child...
      this.parent.addEventListener('message', transact, false)

      // Then ask child for information
      this.child.postMessage(
        {
          waupost: 'request',
          type: messageType,
          property,
          uid
        },
        this.childOrigin
      )
    })
  }

  call(property, data) {
    this.child.postMessage(
      {
        waupost: 'call',
        type: messageType,
        property,
        data
      },
      this.childOrigin
    )
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  destroy() {
    print('Parent: destroy IframePost instance')
    window.removeEventListener('message', this.listener, false)
    this.frame.parentNode.removeChild(this.frame)
  }
}

class ChildAPI {
  constructor(info) {
    this.model = info.model
    this.parent = info.parent
    this.parentOrigin = info.parentOrigin
    this.child = info.child

    print('Child: iframe child register')
    print('Child: await messages...')

    this.child.addEventListener('message', (e) => {
      if (!sanitize(e, this.parentOrigin)) return

      print('Child: receive request', e.data)

      const { property, uid, data } = e.data

      if (e.data.waupost === 'call') {
        if (
          property in this.model &&
          typeof this.model[property] === 'function'
        ) {
          this.model[property](data)
        }
        return
      }

      // Reply to Parent
      resolveValue(this.model, property).then((value) =>
        e.source.postMessage(
          {
            property,
            waupost: 'reply',
            type: messageType,
            uid,
            value
          },
          e.origin
        )
      )
    })
  }

  emit(name, data) {
    print(`Child: emit event "${name}"`, data)
    this.parent.postMessage(
      {
        waupost: 'emit',
        type: messageType,
        value: {
          name,
          data
        }
      },
      this.parentOrigin
    )
  }
}

class IframePost {
  static debug = false

  constructor({ container, model, url, name, classList = [] }) {
    this.parent = window
    this.frame = document.createElement('iframe')
    this.frame.name = name || ''
    this.frame.classList.add.apply(this.frame.classList, classList)
    container.appendChild(this.frame)
    this.child =
      this.frame.contentWindow || this.frame.contentDocument.parentWindow
    this.model = model || {}

    return this.sendHandshake(url)
  }

  sendHandshake(url) {
    const childOrigin = resolveOrigin(url)
    let attempt = 0
    let responseInterval
    return new Promise((resolve, reject) => {
      const reply = (e) => {
        if (!sanitize(e, childOrigin)) return false
        if (e.data.waupost === 'handshake-reply') {
          clearInterval(responseInterval)
          print('Parent: receive handshake reply from child')
          this.parent.removeEventListener('message', reply, false)
          this.childOrigin = e.origin
          print('Parent: from child origin', this.childOrigin)
          return resolve(new ParentAPI(this))
        }

        // Might need to remove since parent might be receiving different messages
        // from different hosts
        print('Parent: invalid handshake reply')
        return reject(new Error('failed handshake'))
      }

      this.parent.addEventListener('message', reply, false)

      const doSend = () => {
        attempt++
        print(`Parent: send handshake attempt ${attempt}`, { childOrigin })
        this.child.postMessage(
          {
            waupost: 'handshake',
            type: messageType,
            model: this.model
          },
          childOrigin
        )

        if (attempt === maxHandshakeRequests) {
          Message.error({
            content: '加载失败，请检查地址是否正确？',
            duration: 3
          })
          clearInterval(responseInterval)
        }
      }

      const loaded = () => {
        doSend()
        responseInterval = setInterval(doSend, 500)
      }

      if (this.frame.attachEvent) {
        this.frame.attachEvent('onload', loaded)
      } else {
        this.frame.addEventListener('load', loaded)
      }

      print('Parent: loading iframe', { url })
      this.frame.src = url
    })
  }
}

IframePost.Model = class Model {
  constructor(model) {
    this.child = window
    this.model = model
    this.parent = this.child.parent
    return this.sendHandshakeReply()
  }

  sendHandshakeReply() {
    return new Promise((resolve, reject) => {
      const shake = (e) => {
        if (!e.data.waupost) {
          return
        }
        if (e.data.waupost === 'handshake') {
          print('Child: receive handshake from parent')
          this.child.removeEventListener('message', shake, false)
          print('Child: send handshake reply to parent')
          e.source.postMessage(
            {
              waupost: 'handshake-reply',
              type: messageType
            },
            e.origin
          )
          this.parentOrigin = e.origin

          const defaults = e.data.model
          if (defaults) {
            Object.keys(defaults).forEach((key) => {
              this.model[key] = defaults[key]
            })
            print('Child: extended model from parent')
          }

          print('Child: from parent origin', this.parentOrigin)
          return resolve(new ChildAPI(this))
        }
        return reject(new Error('handshake reply failed'))
      }
      this.child.addEventListener('message', shake, false)
    })
  }
}

export { IframePost }
