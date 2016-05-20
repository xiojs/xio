"use strict";

/**
 * 
 * Parse
 * 
 */

const _toArray = require('lodash.toarray')

module.exports = function (config) {
  // parse loader
  [
    'loaders',
    'preLoaders',
    'postLoaders'
  ].forEach(function (key) {
    config.module[key] = _toArray(config.module[key])
  })
  // parse plugin
  config.plugins = _toArray(config.plugins)

  return config
}
