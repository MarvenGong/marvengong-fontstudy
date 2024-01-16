/**
 * 基础混合
 * */

export default {
  methods: {
    // 当 $route 更新时触发
    appRouteChange(to, from) {
      // 页面加载完成后执行
      this.$nextTick(function() {
        this.handlePostScrollHeight()
      })
    },
    // 向父页面发送页面高度
    handlePostScrollHeight() {
      // 向父vue页面发送信息
      window.parent.postMessage(
        {
          cmd: 'setIframeHeight',
          params: {
            success: true,
            data: {
              body: {
                height: document.body.scrollHeight
              }
            }
          }
        },
        '*'
      )
    },
    // 页面回退
    goBack() {
      this.$router.back(-1)
    },
    /**
     * 跳转到页面
     * @param {*} page
     * @param {*} query
     */
    toUrl(path, query) {
      if (path) {
        this.$router.push({
          path,
          query
        })
      }
    }
  }
}
