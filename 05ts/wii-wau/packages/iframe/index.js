import WauIframe from './src/index';

/* istanbul ignore next */
WauIframe.install = function (Vue) {
  Vue.component(WauIframe.name, WauIframe);
};

export default WauIframe;
