/**
 * load command
 * 
 */
const path          = require('path')
const PLUGIN_PATH   = require('../util/path').PLUGIN_PATH
const info          = require(path.join(PLUGIN_PATH,'package.json'))
const dependencies  = info.dependencies


module.exports = (program) => {
    
    for (var name in dependencies) {
        
        if (/^xio-(\S+)-cli$/.test(name)) {
            var commandName = name.replace(/^xio-(\S+)-cli$/, '$1')
            var description = require(path.join(name, 'package.json')).description
            var action = ( (_name) => {
                return  () => {
                    require(_name)(program)
                }
            })(name)
            
            var command = program.command(commandName)

            command.description(description)
            try {
                require(path.join(name, 'options'))(command)
            } catch (e) {
                // options.js 文件不存在则不处理
            }
            
            command.action(action)
        }
    }
    
}