<template>
  <div class="iframe-wrapper">
    <iframe-loading :is-loading="isLoading"></iframe-loading>
    <div id="iframe"></div>
  </div>
</template>

<script>
import { Message, Notice, Modal } from 'view-design'
import IframeLoading from './loading'
import { IframePost } from '@wii-fe/wau/src/iframe/index'
export default {
  name: 'WauIframe',
  components: {
    IframeLoading
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  async mounted() {
    const child = await new IframePost({
      container: document.querySelector('#iframe'),
      url: this.src,
      classList: ['iframe-content']
    })
    this.isLoading = false
    child.on('iframe.resize', (height) => {
      child.frame.style.height = `${height}px`
    })
    child.on('wau.post.test', (data) => {})
    child.on('wau.post.Message', (data) => {
      data.genre = data.genre ? data.genre : 'info'
      data.background =
        typeof data.background !== 'undefined' ? data.background : true
      Message[data.genre](data)
    })

    child.on('wau.post.Notice', (data) => {
      data.genre = data.genre ? data.genre : 'info'
      data.background =
        typeof data.background !== 'undefined' ? data.background : true
      Notice[data.genre](data)
    })

    child.on('wau.post.Modal', (data) => {
      data.genre = data.genre ? data.genre : 'info'
      data.onOk = function(e) {
        console.log('ok 你点击啦 OK', child)
        const callData = {
          id: data.id,
          callName: 'onOK',
          callagment: e
        }
        // debugger;
        child.call('test', JSON.stringify(callData))
      }
      Modal[data.genre](data)
    })
    console.log(child, 'child')
  }
}
</script>

