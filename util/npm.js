"use strict";

/**
 * 
 * Npm
 * 
 */

const exec          = require('./exec')
const PLUGIN_PATH   = require('./path').PLUGIN_PATH
const checkRegistry = require('./check').registry
const config        = require('./config')


/**
 * npm ...
 * 
 */

const npm = (options, registry) => {
  registry = registry || config.get('registry')

  if (registry) {
    options.push(checkRegistry(registry))
  }

  options = options.concat(['--prefix', PLUGIN_PATH, '--save', '--silent'])
  exec('npm', options, {stdio: 'inherit'})
  
}

exports.install = (name, registry) => {
  npm(['install', name], registry)
}

exports.update = (name, registry) => {
  npm(['update', name], registry)
}

exports.uninstall = (name) => {
  npm(['uninstall', name])
}

exports.list =  () => {
  npm(['list', '--depth=0'])
}
