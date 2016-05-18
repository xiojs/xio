"use strict";

/**
 * bash config
 * 
 */

var path = require('path')
var webpack = require('webpack')
var PATH = require('./path')

module.exports = function (userConfig) {
  var limit = 1
  if (userConfig.urlLoaderLimit !== false) {
    limit = userConfig.urlLoaderLimit || 10000
  }

  return {
    output: {
      path: path.resolve(PATH.CWD_PATH, 'dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      chunkFilename: '[id].js'
    },

    template: true,

    plugins: {
      occurenceorder: new webpack.optimize.OccurenceOrderPlugin()
    },

    resolve: {
      extensions: ['', '.js']
    },

    resolveLoader: {},

    module: {
      loaders: {
        js: {
          test: /\.(jsx?|babel|es6)$/,
          include: PATH.CWD_PATH,
          exclude: /node_modules|bower_components/,
          loaders: ['babel-loader']
        },
        json: {
          test: /\.json$/,
          loaders: ['json-loader']
        },
        css: {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        html: {
          test: /\.html$/,
          loaders: ['html-loader?minimize=false']
        },
        assets: {
          test: /\.(gif|png|jpe?g|svg|otf|ttf|woff2?|eot)(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.join(userConfig.assetsPath || 'static', '[name].[hash:7].[ext]')
          }
        }
      }
    }
  }
}
