const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack');

const SRC = path.resolve(__dirname, './client/src')
const APP = path.resolve(__dirname, './client/app')
const NODE_MODULE_PATH = path.resolve(__dirname, './node_modules')
const SERVER_PATH = path.resolve(__dirname, './server')

module.exports = {
  entry: SRC + '/index.js',
  output: {
    path: APP,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: SRC,
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass?includePaths[]=' + SRC + '&includePaths[]=' + NODE_MODULE_PATH)
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(eot|ttf|gif|png)$/,
        loader: 'file'
      },
      {
        test: require.resolve("jquery"),
        loader: 'expose?$!expose?jQuery'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      title: 'Basic React Project',
      template: SRC + '/index_html_template.ejs'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV === 'production' ? JSON.stringify('production') : undefined
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
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
