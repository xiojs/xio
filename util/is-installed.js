"use strict";

/**
 * install
 * 
 */

module.exports = (name) => {
  try {
    require.resolve(name)
    return true
  } catch (e) {
    return false
  }
}