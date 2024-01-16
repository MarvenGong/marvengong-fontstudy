import WauPropertyTable from './src/index';

/* istanbul ignore next */
WauPropertyTable.install = function (Vue) {
  Vue.component(WauPropertyTable.name, WauPropertyTable);
};

export default WauPropertyTable;
