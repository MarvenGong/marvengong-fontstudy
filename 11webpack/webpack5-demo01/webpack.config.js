const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", 'jsx', 'less', "..."]
  },
  devServer: {
    port: 8000,
    client: {
      progress: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
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
          'ts-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '测试webpack',
      template: '/public/index.html'
    }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      // e.g. Output each progress message directly to the console:
      console.info(chalk.blue(message), `${percentage * 100}%`, ...args);
    })
  ]
}