/* eslint-disable */
const path = require('path')

const resolvePath = p => path.join(path.resolve(__dirname, p))

const publicPath = process.env.NODE_ENV === 'production'
  ? 'https://alex-chemus.github.io/viewer/'
  : '/'

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src/'), //resolvePath('src/'),
        //'@shared': path.resolve(__dirname, '/src/shared/index') //resolvePath('src/shared')
      },
    },
  },

  devServer: {
    historyApiFallback: {
      index: '/index.html'
    },
    port: process.env.PORT
  },

  //transpileDependencies: true,
  //transpileDependencies: true
  //transpileDependencies: true
  publicPath,

  //transpileDependencies: true
  transpileDependencies: ['@vue/reactivity']
}
