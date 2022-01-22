const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
//const OptimizedCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//const TerserWebpackPlugin = require('terser-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: {
    main: ['@babel/polyfill', './src/index.js']
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 8080,
    //open: true,
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src/'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    /*minimizer: [
      new OptimizedCSSAssetsPlugin(),
      new TerserWebpackPlugin()
    ]*/
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    //new CopyWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    //new EslintWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  }
}