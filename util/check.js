/**
 * check 
 */

const path = require('path'),
    fs = require('fs'),
    isRoot = require('is-root'),
    updateNotifier = require('update-notifier'),
    pkg = require('../package.json'),
    PLUGIN_PATH = require('./path').PLUGIN_PATH;



// Checks for available update and returns an instance 
const notifier = updateNotifier({pkg});

// Notify using the built-in convenience method 
notifier.notify();

// `notifier.update` contains some useful info about the update 
console.log(notifier);