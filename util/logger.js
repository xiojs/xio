"use strict";

/**
 * 
 * Logger
 * 
 */


const format = require('util').format;
const chalk = require('chalk');


console.log(chalk.blue('Hello xiojs!'));


/**
 * Prefix
 */
const prefix = '[xio]';
const sep = chalk.gray('-');
      

 /**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
exports.log = () => {
  let msg = format.apply(format, arguments)
  console.log(chalk.cyan(prefix), sep, msg)
}



/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
exports.fatal =  (message) => {
  exports.error(message)

  if (process.env.NODE_ENV === 'testing') {
    throw new Error('exit')
  } else {
    process.exit(1)
  }
}
 
 
/**
 * Log an error `message` to the console and no exit.
 *
 * @param {String} message
 */
exports.error =  (message) => {
  if (message instanceof Error) {
    message = message.message.trim()
  } 
  
  let msg = format.apply(format, arguments)

  console.error(chalk.red(prefix), sep, msg)
}


exports.warn =  () => {
  let msg = format.apply(format, arguments)
  console.log(chalk.yellow(prefix), sep, msg)
}



/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */
exports.success =  () => {
  let msg = format.apply(format, arguments)
  console.log(chalk.green(prefix), sep, msg)
}