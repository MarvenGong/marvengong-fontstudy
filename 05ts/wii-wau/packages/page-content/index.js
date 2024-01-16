import WauPageContent from './src/index';

/* istanbul ignore next */
WauPageContent.install = function (Vue) {
  Vue.component(WauPageContent.name, WauPageContent);
};

export default WauPageContent;
