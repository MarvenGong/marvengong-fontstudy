import WauDeleteModal from './src/index';

/* istanbul ignore next */
WauDeleteModal.install = function (Vue) {
  Vue.component(WauDeleteModal.name, WauDeleteModal);
};

export default WauDeleteModal;
