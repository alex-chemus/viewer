const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src/'),
        '@tests': path.resolve(__dirname, './tests/unit/')
      }
    },
  },
  devServer: {
    historyApiFallback: {
      index: '/index.html'
    }
  }
}