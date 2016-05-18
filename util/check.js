"use strict";

/**
 * check 
 */
const fs                = require('fs');
const pkg               = require('../package.json');
const path              = require('path');
const isRoot            = require('is-root');
const logger            = require('./logger');
const PLUGIN_PATH       = require('./path').PLUGIN_PATH;
const updateNotifier    = require('update-notifier');


// Checks for available update and returns an instance 
const notifier = updateNotifier({pkg});

// Notify using the built-in convenience method 
notifier.notify();

// `notifier.update` contains some useful info about the update 
// console.log(notifier);

/**
 * registry.
 * 
 * @param {String} ...
 */

exports.registry = (registry) => {
  if (!registry) {
    return ''
  }
  return '--registry=' + registry
}

/**
 * initPluginPackage
 * 
 * @param init ...
 */


exports.initPluginPackage =  () => {
  if (!fs.existsSync(PLUGIN_PATH)) {
    fs.mkdirSync(PLUGIN_PATH)
  }

  let pluginPkg = path.join(PLUGIN_PATH, 'package.json')

  if (!fs.existsSync(pluginPkg)) {
    fs.writeFileSync(pluginPkg, '{}')
  }
  
}


/**
 * checkVersion
 * 
 * @param console.log ...
 */

exports.checkVersion = () => {
  let notifier = updateNotifier({pkg: pkg})

  notifier.notify()
  
  if (notifier.update) {
    console.log(notifier.update)
  }
  
}

/**
 * pluginExists
 * 
 * @param {name} modules name
 */

exports.pluginExists = (name) => {
  return fs.existsSync(path.join(PLUGIN_PATH, 'node_modules', name))
}

/**
 * preventSudo
 * 
 * @param log
 */

exports.preventSudo = () => {
  if (isRoot()) {
    console.log()
    logger.fatal('禁止使用 sudo 执行\n')
  }
}