const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack');

const SRC = path.resolve(__dirname, './client/src')
const APP = path.resolve(__dirname, './client/app')
const SERVER_PATH = path.resolve(__dirname, './server')
const NODE_MODULE_PATH = path.resolve(__dirname, './node_modules')

const isProd = process.env.NODE_ENV === 'production'

let plugins = [
  new ExtractTextPlugin(isProd ? '[name].[contenthash].css' : '[name].css'),
  new HtmlWebpackPlugin({
    title: 'Basic React Project',
    template: SRC + '/index_html_template.ejs'
  })
]

if (isProd) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

module.exports = {
  entry: SRC + '/index.js',
  output: {
    path: APP,
    filename: isProd ? '[name].[hash].js' : '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [SRC, SERVER_PATH],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass?includePaths[]=' + SRC + '&includePaths[]=' + NODE_MODULE_PATH)
      },
      {
        test: /\.(jpe?g$|gif|svg|png)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(woff2?)$/,
        loader: 'file?mimetype=application/font-woff'
      },
      {
        test: /\.(ttf)$/,
        loader: 'file?mimetype=application/octet-stream'
      },
      {
        test: /\.(eot)$/,
        loader: 'file'
      },
      {
        test: require.resolve("jquery"),
        loader: 'expose?$!expose?jQuery'
      }
    ]
  },
  plugins: plugins,
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [SRC],
    alias: {
      server: SERVER_PATH
    }
  }
}
