#!/usr/bin/env node


const exec    = require('../util/exec')
const logger  = require('../util/logger')
const config  = require('../util/config')
const json    = require('format-json')


const program   = require('commander').parse(process.argv);

console.log()
process.on('exit', () => {
  console.log()
})

program
  .option('-l --list', '查看配置信息')

const option = program.args[0];
const value = program.args[1] || '';

if (!option) {
  logger.log('--------------')
  logger.log('配置信息')
  logger.log('--------------')

  console.log(json.plain(config.get()))
  process.exit()
}

if (config.set(option, value)) {
  config.get(option)
  logger.success(`${option} = ${config.get(option)}`)
} else {
  logger.fatal('不存在配置项')
}

