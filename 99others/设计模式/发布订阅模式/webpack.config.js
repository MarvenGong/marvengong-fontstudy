const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: '/src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/index.html',
      minify: false
    })
  ]
}