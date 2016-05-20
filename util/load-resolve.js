"use strict";

/**
 * 
 * Load Resolve
 * 
 */


const path = require('path')
const PATH = require('./path')

const rootPath = [
  path.join(PATH.CWD_PATH, 'node_modules'),
  path.join(PATH.PLUGIN_PATH, 'node_modules')
]
const fallback = [
  path.join(PATH.ROOT_PATH, 'node_modules')
]

module.exports =  (config) => {
  config.resolve = config.resolve || {}
  config.resolveLoader = config.resolveLoader || {}

  config.resolve.root = (config.resolve.root || []).concat(rootPath)
  config.resolve.fallback = (config.resolve.fallback || []).concat(fallback)
  config.resolveLoader.root = (config.resolveLoader.root || []).concat(rootPath)
  config.resolveLoader.fallback = (config.resolveLoader.fallback || []).concat(fallback)
}
