<template>
  <Modal v-model="model" title="删除" @on-ok="ok" @on-cancel="cancel">
    <Alert type="warning" show-icon>是否确认删除 <b>{{ value.content }}</b> ?</Alert>
  </Modal>
</template>
<script>
import { Modal, Alert } from 'view-design'
export default {
  name: 'WauDeleteModal',
  components: { Modal, Alert },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      model: false
    }
  },
  watch: {
    // 监听的参数是通过对象获取的，watch要进行深度监听
    value: {
      handler() {
        if (this.value.show) {
          this.model = true;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ok() {
      this.$emit('on-ok', this.value)
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
    }
  }
}
</script>
