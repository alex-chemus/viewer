/* eslint-disable */
const path = require('path')

const publicPath = process.env.NODE_ENV === 'production'
  ? 'https://alex-chemus.github.io/viewer/'
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
  //transpileDependencies: true,
  publicPath,
  /*settings: {
    'vetur.completion.autoImport': false,
    'vetur.experimental.templateInterpolationService': false,
    'vetur.validation.interpolation': false,
    'vetur.validation.template': false,
    'vetur.validation.templateProps': false,
    'vetur.validation.style': false,
    'vetur.validation.script': false,
    'vetur.format.enable': false,
    'vetur.ignoreProjectWarning': true,
    'vetur.languageFeatures.codeActions': false,
    'vetur.languageFeatures.semanticTokens': false,
    'vetur.languageFeatures.updateImportOnFileMove': false,
    'vetur.trace.server': 'off',
    'vetur.underline.refValue': false,
  }*/
}