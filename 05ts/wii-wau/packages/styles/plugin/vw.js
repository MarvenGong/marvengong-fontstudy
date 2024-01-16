module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('px2vw', function (data1, data2) {
      var v1 = typeof data1 === 'object' ? data1.value : 0;
      var v2 = typeof data2 === 'object' ? data2.value : 1920;
      return new tree.Dimension((v1 / v2) * 100, 'vw');
    });

    functions.add('vw2px', function (data1, data2) {
      var v1 = typeof data1 === 'object' ? data1.value : 0;
      var v2 = typeof data2 === 'object' ? data2.value : 1920;
      return new tree.Dimension((v1 / 100) * v2, 'px');
    });
  }
};
