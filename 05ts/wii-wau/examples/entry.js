import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBus from 'vue-bus'
import hljs from 'highlight.js';

import Wau from 'main/index.js';
import entry from './app';
import routes from './route.config';
import demoBlock from './components/demo-block';
import SideNav from './components/side-nav';

import 'packages/styles/index.less';
import './styles/index.less';

Vue.use(Wau);
Vue.use(VueRouter);
Vue.use(VueBus);
Vue.component('DemoBlock', demoBlock);
Vue.component('SideNav', SideNav);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach((route) => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  // document.title = 'Wau';
});

new Vue(
  Object.assign(
    {
      router
    },
    entry
  )
).$mount('#app');
