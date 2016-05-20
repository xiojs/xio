"use strict";

/**
 * 
 * Load Server
 * 
 */


const isObject = require('./is').object
const defaultServer = {
  publicPath: '/',
  port: 8080,
  hot: true,
  log: true,
  enable: true,
  historyApiFallback: true,
  lazy: false,
  stats: 'errors-only',
  protocol: 'http:',
  hostname: 'localhost'
}

module.exports =  (server) =>{
  // null, undefined, false
  if (!server || server === false) {
    return {
      enable: false,
      stats: 'errors-only'
    }
  }

  // object
  if (isObject(server)) {
    return Object.assign(defaultServer, server)
  }

  // array, string, true, number .etc
  return defaultServer
}
