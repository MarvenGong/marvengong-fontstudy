import { render } from '@/libs/utils'
import { findComponentsUpward } from '@/libs/find'
// import { isPlainObject } from 'lodash'
// import { INDEX } from '@/lib/constant'
// import { INDEX, BUS } from '@/lib/constant'

// function watchParent () {
//   if (!this.$vnode) return

//   let { tag } = this.$vnode.componentOptions
//   if (tag === 'r-form') return

//   let [component] = findComponentsUpward(this, 'r-form')
//   let result = ''
//   component && isPlainObject(component.detail) && component.$watch(component.provide || 'detail', (newVal) => {
//     if (newVal) {
//       result = render(this.value, newVal)
//       this['currentValue'] = result
//       if (this.$options.name === 'r-button') {
//         this[BUS].forEach(item => {
//           item['params'] = render(item['params'], newVal)
//         })
//         this.currentHide = render(this.hide, newVal)
//       }
//       if (typeof this.currentOptions !== 'undefined') {
//         result = render(this.options, newVal)
//         this['currentOptions'] = result
//       }
//       if (typeof this.currentParams !== 'undefined') {
//         result = render(this.params, newVal)
//         this['currentParams'] = result
//       }
//     }
//   })
// }

function notifyParent(name, key, val) {
  const [parent] = findComponentsUpward(this, 'r-form')
  if (parent && parent.detail[this.name] !== val) {
    parent.detail[this.name] = val
  }
}

export default {
  props: {
    provide: {
      type: String,
      default() {
        return ''
      }
    },
    name: {
      type: String,
      default: ''
    }
  },
  watch: {
    currentValue(newVal) {
      // let [block] = findComponentsUpward(this, 'r-block')
      // if (block) {
      //   block.currentValue[this[INDEX]][this.name] = newVal
      // } else {
      if (this.name) {
        notifyParent.call(this, this.name, 'value', newVal)
      }
      // }
    },
    value(val) {
      this.$nextTick(() => {
        this.currentValue = val
      })
    }
  },
  methods: {
    __render(key, data) {
      const { variable } = Object.create({ variable: key })
      return render(variable, data)
    },
    _changeValue(form) {
      if (form.params[this.name]) {
        this.currentValue = form.params[this.name]
      }
    }
  },
  data() {
    return {
      currentValue: render(this.value, {})
    }
  },
  created() {
    // watchParent.call(this)
  }
}
