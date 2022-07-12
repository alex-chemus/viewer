/* eslint-disable */
const path = require('path')

const publicPath = process.env.NODE_ENV === 'production'
  ? 'https://alex-chemus.github.io/viewer/'
  : '/'

module.exports = {
  configureWebpack: {
    //entry: './src/main.ts',

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

  //transpileDependencies: true,
  //transpileDependencies: true
  //transpileDependencies: true
  publicPath,

  //transpileDependencies: true
  transpileDependencies: ['@vue/reactivity']
}
