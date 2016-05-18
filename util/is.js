"use strict";

/**
 * 
 * Is
 * 
 */

const toString = Object.prototype.toString

function type(obj) {
  return toString.call(obj)
}

exports.string = function isString(obj) {
  return type(obj) === '[object String]'
}

exports.array = function isArray(obj) {
  return type(obj) === '[object Array]'
}

exports.object = function isObject(obj) {
  return type(obj) === '[object Object]'
}

exports.boolean = function isBoolean(obj) {
  return type(obj) === '[object Boolean]'
}
