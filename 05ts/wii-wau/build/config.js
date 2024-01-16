var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
// var transitionList = fs.readdirSync(
//   path.resolve(__dirname, '../src/transitions')
// )
var externals = {};

Object.keys(Components).forEach(function (key) {
  externals[`@wii-fe/wau/packages/${key}`] = `@wii-fe/wau/lib/${key}`;
});

// externals['@wii-fe/wau/src/locale'] = '@wii-fe/wau/lib/locale';
utilsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`@wii-fe/wau/src/utils/${file}`] = `@wii-fe/wau/lib/utils/${file}`;
});
mixinsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[
    `@wii-fe/wau/src/mixins/${file}`
  ] = `@wii-fe/wau/lib/mixins/${file}`;
});
// transitionList.forEach(function (file) {
//   file = path.basename(file, '.js')
//   externals[
//     `@wii-fe/wau/src/transitions/${file}`
//   ] = `@wii-fe/wau/lib/transitions/${file}`
// })

externals = [
  Object.assign(
    {
      vue: 'vue'
    },
    externals
  ),
  nodeExternals(),
  /\@wii-fe\/wau\/public/i // 静态资源地址
];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  '@wii-fe/wau': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules/;
