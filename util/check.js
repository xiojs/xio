"use strict";

/**
 * check 
 */

const path = require('path');
const fs = require('fs');
const isRoot = require('is-root');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const logger = require('./logger');
const PLUGIN_PATH = require('./path').PLUGIN_PATH;



// Checks for available update and returns an instance 
const notifier = updateNotifier({pkg});

// Notify using the built-in convenience method 
notifier.notify();

// `notifier.update` contains some useful info about the update 
console.log(notifier);