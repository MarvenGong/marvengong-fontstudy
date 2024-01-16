import WauRichtextEditor from './src/index';

/* istanbul ignore next */
WauRichtextEditor.install = function (Vue) {
  Vue.component(WauRichtextEditor.name, WauRichtextEditor);
};

export default WauRichtextEditor;
