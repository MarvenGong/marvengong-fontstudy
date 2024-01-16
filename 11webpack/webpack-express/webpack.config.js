const path = require('path');
module.exports = {
  entry: {
    app: './bin/www'
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js',
    clean: true,
  },
  mode: 'production'
}