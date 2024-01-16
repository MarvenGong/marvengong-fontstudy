import WauCodeEditor from './src/index';

/* istanbul ignore next */
WauCodeEditor.install = function (Vue) {
  Vue.component(WauCodeEditor.name, WauCodeEditor);
};

export default WauCodeEditor;
