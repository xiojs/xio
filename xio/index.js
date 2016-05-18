"use strict";

/**
 * index 
 * 
 */


const path      = require('path');
const PATH      = require('../util/path');
const check     = require('../util/check');
const program   = require('commander');
const config    = require('../util/config');



// prevent sudo
if (process.argv.indexOf('--allow-root') < 0) {
  check.preventSudo()
}

check.initPluginPackage()
config.init()

console.log(config.get('updateCheck'))
if (config.get('updateCheck')) {
  check.checkVersion()
}


process.env['NODE_PATH'] += [
    '',
    path.join(PATH.CWD_PATH, 'node_modules'),
    path.join(PATH.ROOT_PATH, 'node_modules'),
    path.join(PATH.PLUGIN_PATH, 'node_modules'),
    PATH.LIB_PATH
  ].join(path.delimiter)
  
  
//   console.log(process.env)
  
require('module').Module._initPaths()

    
program
  .usage('<command> [options]')
  .version(require('../package.json').version)
  .option('--allow-root', 'Allow root.')
  .command('config <option>', '查看当前项目的配置信息')
  .command('init <template>', '初始化一个空项目，例如 vue')
  .command('create <project-name> <template>', '创建一个空项目文件夹并初始化')
  .command('import <plugin>', '安装插件/脚手架')
  .command('update <plugin>', '更新插件/脚手架')
  .command('remove <plugin>', '卸载插件/脚手架')
  .command('list', '查看已安装的插件/脚手架')
  .command('watch', '开发模式 development')
  .command('build', '生产模式 production')
  
  
// 加载动态指令
require('../util/load-command')(program)
program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}