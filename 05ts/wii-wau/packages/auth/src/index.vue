<script>
function includeArray(list1, list2) {
  let status = false
  list2.forEach((item) => {
    if (list1.includes(item)) status = true
  })
  return status
}

export default {
  name: 'WauAuth',
  props: {
    to: {
      type: [Object, String],
      default: ''
    },
    authority: {
      type: [String, Array, Function, Boolean],
      default: true
    },
    access: {
      type: [String, Array],
      default: ''
    },
    prevent: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '您没有权限进行此操作'
    },
    customTip: {
      type: Boolean,
      default: false
    },
    display: {
      type: String,
      default: ''
    }
  },
  computed: {
    isPermission() {
      let state
      if (typeof this.authority === 'boolean') {
        state = this.authority
      } else if (this.authority instanceof Function) {
        state = this.authority()
      } else {
        const authority =
          typeof this.authority === 'string' ? [this.authority] : this.authority
        const access =
          typeof this.access === 'string' ? [this.access] : this.access
        state = includeArray(authority, access)
      }
      return state
    },
    options() {
      const style = {}
      const { display } = this
      if (display) style.display = display
      return {
        class: {
          'ivu-auth': true,
          'ivu-auth-permission': this.isPermission,
          'ivu-auth-no-math': !this.isPermission,
          'ivu-auth-redirect': !this.isPermission && this.to,
          'ivu-auth-prevent': this.prevent
        },
        style
      }
    }
  },
  created() {
    if (!this.isPermission && this.to) {
      this.redirect(false)
    }
  },
  methods: {
    redirect() {
      const router = this.$router
      if (router) {
        this.replace
          ? this.$router.replace(this.to)
          : this.$router.push(this.to)
      } else {
        window.location.href = this.to
      }
    },
    handlePreventClick(event) {
      if (!this.isPermission) {
        if (!this.customTip) {
          this.$Message.info({
            content: this.message,
            duration: 3
          })
        }
        this.$emit('click', event)
      }
    }
  },
  render(h) {
    if (this.isPermission) {
      return h('div', this.options, this.$slots.default)
    } else if (this.to) {
      return h('div', this.options)
    } else if (this.prevent) {
      return h(
        'div',
        Object.assign({}, this.options, {
          on: {
            click: this.handlePreventClick
          }
        }),
        [
          h(
            'div',
            {
              class: 'ivu-auth-prevent-no-match'
            },
            [
              h(
                'Button',
                {
                  props: {
                    type: 'primary'
                  }
                },
                '没有权限'
              )
            ]
          )
        ]
      )
    } else {
      return h('div', this.options, this.$slots.noMatch)
    }
  }
}
</script>
