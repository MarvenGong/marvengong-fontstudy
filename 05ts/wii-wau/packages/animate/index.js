import WauAnimate from './src/index';

/* istanbul ignore next */
WauAnimate.install = function (Vue) {
  Vue.component(WauAnimate.name, WauAnimate);
};

export default WauAnimate;
