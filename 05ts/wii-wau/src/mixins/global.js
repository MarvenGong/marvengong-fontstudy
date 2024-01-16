import { isEmpty } from 'lodash'

// 这里的 mixins 是全局引入的，不是全局暴露不要在此文件写入
export default {
  methods: {
    redirectTo(path) {
      this.$router.replace(path)
    },
    navigateTo(path, query = {}) {
      this.$router.push({ path, query })
    },
    navigateBack(n = -1) {
      this.$router.go(n)
    },
    deleteEmpty(json) {
      const data = { ...json, ...this.$route.query }
      Object.entries(data).forEach(([key, value], index) => {
        if (isEmpty(value)) {
          delete data[key]
        }
      })
      return data
    }
  }
}
