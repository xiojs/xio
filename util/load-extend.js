"use strict";

/**
 * 
 * Load Extend
 * 
 */

const logger = require('./logger')
const isObject = require('./is').object
const exec = require('./exec')
const pluginExists = require('./check').pluginExists

const importExtend =  (extend, xio, options) => {
  require('xio-' + extend)(xio, options)
  logger.success('插件加载成功: ' + extend)
}


const installExtend =  (name) => {
  logger.warn('插件不存在，自动下载插件: ' + name)
  exec('xio', ['import', name], {
    stdio: 'inherit'
  })
}

/**
 * 加载并装配插件
 * @param  {array} extends
 * @param  {object} config - webpack config
 */
module.exports =  (_extends, xio) => {
  let isObj = isObject(_extends)

  Object.keys(_extends || {}).forEach( (key) =>{
    let extend = isObj ? key : _extends[key]
    let options = isObj ? _extends[key] : {}
    let extendName = extend.split('@')[0]

    if (!pluginExists('xio-' + extendName)) {
      installExtend(extend)
    }

    importExtend(extendName, xio, options)
  })
  console.log()
}
