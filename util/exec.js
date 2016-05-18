"use strict";

/**
 * 
 * Exec
 * 
 */


const spawnSync = require('child_process').spawnSync
const logger = require('./logger')

module.exports = function exec(cmd, args, opts) {
  opts = opts || {}

  const errMessage = opts.errorMessage
  const command = spawnSync(cmd, args || [], opts)

  if (command.status === 1) {
    if (command.stderr) {
      logger.fatal(errMessage || command.stderr.toString())
    }
    process.exit(1)
  }

  return command
}
