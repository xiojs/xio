"use strict";

/**
 * 
 * hot reload
 * 
 */


const isString = require('./is').string
const logger = require('./logger')

module.exports = function (entry, host, enable) {
  let result = {}

  if (!entry) {
    logger.fatal('请配置 entry')
  }

  if (isString(entry)) {
    result.app = [].concat(entry)
  } else {
    Object.keys(entry || {}).forEach(function (name) {
      result[name] = [].concat(entry[name])
    })
  }

  if (enable) {
  // add hot-reload related code to entry chunks
    let webpackDevServer = 'webpack-dev-server/client?' + host + '/'
    let hotDevServer = 'webpack/hot/dev-server'

    Object.keys(result).forEach(function (name) {
      result[name] = [hotDevServer, webpackDevServer].concat(result[name])
    })
  }

  return result
}
