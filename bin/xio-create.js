#!/usr/bin/env node


const exec      = require('../util/exec')
const shelljs   = require('shelljs')
const program   = require('commander').parse(process.argv)
const logger    = require('../util/logger')


const projectName = program.args[0]
const template = program.args[1] || ''

console.log()
process.on('exit',  () =>{
  console.log()
})

if (!projectName) {
  logger.fatal('project-name is required.')
}

shelljs.mkdir(projectName)
shelljs.cd(projectName)
exec('cooking', ['init', template], {
  stdio: 'inherit',
})