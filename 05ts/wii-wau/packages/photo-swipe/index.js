import WauphotoSwipe from './src/index';

/* istanbul ignore next */
WauphotoSwipe.install = function (Vue) {
  Vue.component(WauphotoSwipe.name, WauphotoSwipe);
};

export default WauphotoSwipe;
