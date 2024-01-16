import WauAuth from './src/index';

/* istanbul ignore next */
WauAuth.install = function (Vue) {
  Vue.component(WauAuth.name, WauAuth);
};

export default WauAuth;
