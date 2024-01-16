import Vue from 'vue';
import Wau from 'main/index.js';
import App from './play/index.vue';
import 'packages/styles/index.less';

Vue.use(Wau);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
