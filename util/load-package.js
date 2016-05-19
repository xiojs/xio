"use strict";

/**
 * 
 * Load Package
 * 
 */

const exec          = require('./exec')
const logger        = require('./logger')
const isArray       = require('./is').array
const isString      = require('./is').string
const pluginExists  = require('./check').pluginExists

const installExtend =  (name) => {
  logger.warn('依赖包不存在，自动下载依赖包: ' + name)
  exec('xio', ['import', name, '-p'], {
    stdio: 'inherit'
  })
}


module.exports =  (pkg) => {
  if (!pkg) {
    return
  }

  if (!isString(pkg) && !isArray(pkg)) {
    logger.fatal('use 字段只接受数组和字符串类型')
  }

  if (isString(pkg)) {
    pkg = [pkg]
  }

  pkg.forEach( (name) =>{
    if (!pluginExists('xio-package-' + name)) {
      installExtend(name)
    }
  })
}