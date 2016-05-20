"use strict";

/**
 * xio lib 
 */

const _set = require('lodash.set')
const _unset = require('lodash.unset')
const getBaseConfig = require('../util/get-base-config')
const merge = require('../util/merge')
const parse = require('../util/parse')
const loadExtend = require('../util/load-extend')
const loadPackage = require('../util/load-package')

/**
 * loader.vue => module.loaders.vue
 */
const replacePath =  (path) =>{
  return path
          .replace(/^((pre|post)?loader)s?/ig, 'module.$1s')
          .replace(/^(plugin)s?/g, '$1s')
}

/**
 * set config
 */
exports.set =  (config) => {
  config = config || {}
  this.config = merge(config, getBaseConfig(config))

  loadPackage(config.use)
  loadExtend(config.extends, {
    add: this.add,
    remove: this.remove,
    config: this.config,
    _userConfig: config
  })

  return this
}

/**
 * remove option
 * @param  {string} _path
 * @example
 * cooking.remove('loader.js')
 */
exports.remove =  (_path) =>{ 
  _unset(this.config, replacePath(_path))

  return this
}

/**
 * add a option config
 * @param {string} _path - path of config
 * @param {object} value - config
 * @example
 * cooking.add('loader.vue', {
 *   test: /\.vue$/,
 *   loaders: ['vue']
 * })
 */
exports.add =  (_path, value) => {
  _set(this.config, replacePath(_path), value)

  return this
}

/**
 * return webpack config
 */
exports.resolve =  () => {
  return parse(this.config)
}
