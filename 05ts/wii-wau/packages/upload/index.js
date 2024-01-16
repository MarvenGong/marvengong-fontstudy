import WauUpload from './src/upload';

/* istanbul ignore next */
WauUpload.install = function (Vue) {
  Vue.component(WauUpload.name, WauUpload);
};

export default WauUpload;
