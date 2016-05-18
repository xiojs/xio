#!/usr/bin/env node

const npm           = require('../util/npm')
const path          = require('path')
const exec          = require('../util/exec')
const slush         = require.resolve('slush/bin/slush')
const config        = require('../util/config')
const logger        = require('../util/logger')
const program       = require('commander')
const isInstalled   = require('../util/is-installed')


program
  .option('-r --registry <registry-url>', '指定镜像')
  .parse(process.argv)

const option = program.args[0] || config.get('template')

if (!option) {
  logger.fatal('请指定脚手架')
}

const name = 'xio-' + option
const template = 'slush-' + name

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * download template
 * @param  {string} template template name
 */
const installTemplate = (template) => {
  logger.log('downloading \'' + template + '\'')
  npm.install(template, program.registry)
  logger.success('脚手架安装成功\n')
}

/**
 * run slush
 * @param  {string} name slush template name
 */
const generator = (name) => {
  logger.log('generator project')
  exec(slush, [ name ], {
    stdio: 'inherit',
    errorMessage: 'slush runtime error'
  })
}

if (!isInstalled('generator-package-xio')) {
  logger.log('下载脚手架相关依赖')
  npm.install('generator-package-xio', program.registry)
}
if (!isInstalled(path.join(template.split('@')[0], 'package.json'))) {
  installTemplate(template)
}

generator(name.split('@')[0])
