import WauPageHeader from './src/index';

/* istanbul ignore next */
WauPageHeader.install = function (Vue) {
  Vue.component(WauPageHeader.name, WauPageHeader);
};

export default WauPageHeader;
