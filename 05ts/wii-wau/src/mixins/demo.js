import { mapState, mapActions } from 'vuex'

export default {
  mounted() {
    this.getStatusList()
  },
  computed: {
    ...mapState('demo/status', ['statusList'])
  },
  methods: {
    ...mapActions('demo/status', ['getStatusList'])
  }
}
