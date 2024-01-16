/**
 * Tea 项目配置
 * @type {import("@tencent/tea-types/config").Configuration}
 */
module.exports = {
  command: {
    dev: {
      https: true,
      port: 8090,
      template: "./public/index.html",
      proxy: {
        '/api': {
          logLevel: 'debug',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          target: 'http://localhost:3000',
        },
      },
    },
    build: {
      template: "./public/index.html"
    }
  },
  webpack: (config, { webpack }) => ({
    ...config,
    externals: {},
    plugins: [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|ja|ko/)
    ]
  })
};
