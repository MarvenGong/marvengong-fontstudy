import WauImage from './src/index';

/* istanbul ignore next */
WauImage.install = function (Vue) {
  Vue.component(WauImage.name, WauImage);
};

export default WauImage;
