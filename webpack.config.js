const path = require('path')

// plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CssPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// RegExes
const jsRegEx = /\.jsx?$/
const cssRegEx = /\.css$/

// paths
const resolvePath = relPath => path.resolve(__dirname, relPath)
const appHtml = resolvePath('public/index.html')

module.exports = (webpackEnv) => {
  const isDevelopment = webpackEnv === 'development'

  const config = {
    mode: webpackEnv,
    entry: './src/index.js',
    output: {
      filename: 'js/bundle.js',
      path: resolvePath('dist')
    },
    module: {
      rules: [
        {
          test: jsRegEx,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: require.resolve('eslint-loader'),
          options: {
            emitWarning: true,
            emitError: true
          }
        },
        {
          test: jsRegEx,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        {
          test: cssRegEx,
          exclude: /node_modules/,
          use: [
            {
              loader: CssPlugin.loader
            },
            {
              loader: require.resolve('css-loader')
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlPlugin({
        template: appHtml
      }),
      new CssPlugin({
        filename: 'assets/css/styles.[contenthash:8].css'
      }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      })
    ],
    devtool: isDevelopment? 'inline-source-map': false,
    watch: isDevelopment? true : false
  }

  return config
}