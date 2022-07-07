const path = require('path')

const publicPath = process.env.NODE_ENV === 'production'
  ? '/viewer/'
  : '/'

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    },
  },
  devServer: {
    historyApiFallback: {
      index: '/index.html'
    },
    port: process.env.PORT
  },
  publicPath
}