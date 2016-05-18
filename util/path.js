"use strict";

/**
 * path get
 */

const path = require('path');
const ROOT_PATH = path.join(__dirname, '..');

exports.CWD_PATH = process.cwd()
exports.ROOT_PATH = ROOT_PATH
exports.PLUGIN_PATH = path.join(ROOT_PATH, '.xio')
exports.LIB_PATH = path.join(ROOT_PATH, 'lib')