const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const package = require('./package.json');
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: package?.name + '.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", 'jsx', "..."]
  },
  module: {
    rules: [
      { test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              exclude: /(node_modules|bower_components)/,
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
}