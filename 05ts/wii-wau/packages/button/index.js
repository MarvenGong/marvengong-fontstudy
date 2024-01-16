import WauButton from './src/button';

/* istanbul ignore next */
WauButton.install = function (Vue) {
  Vue.component(WauButton.name, WauButton);
};

export default WauButton;
