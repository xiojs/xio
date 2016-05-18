"use strict";

/**
 * 
 * Config
 * 
 */
const fs            = require('fs')
const path          = require('path')
const PLUGIN_PATH   = require('./path').PLUGIN_PATH

// import fs            from 'fs';
// import path          from 'path';
// import {PLUGIN_PATH} from './path';

// file
const filename = 'config.json'
const filePath = path.join(PLUGIN_PATH,filename)



/**
 * formatBoolean.
 * 
 * @param {String} ...
 */

const formatBoolean = (value) => {
    if (value === 'true') {
        return true
    } else if (value === 'false') {
        return false
    } 
    return value
}


/**
 * requireFile.
 * 
 * @param 
 */


const requireFile = () => {
    return require(filePath)
}

/**
 * init.
 * 
 */

exports.init = () => {
    if (!fs.existsSync(filePath)) {
        let config = {
            template: 'vue',
            registry: '',
            updateCheck: true,
            github: '',
            author: ''
        }
        fs.writeFileSync(filePath, JSON.stringify(config, null, 2))
    }
}

/**
 * get.
 * 
 */

exports.get = (option) => {
    
    if (!option) {
        return requireFile()
    }
    
    return requireFile()[option]
}

/**
 * set.
 * 
 */

exports.set = function (option, value) {
    
    let config = requireFile()

    if (config[option] !== undefined) {
        
        config[option] = formatBoolean(value)
        fs.writeFileSync(filePath, JSON.stringify(config, null, 2))

        return true
    }

    return false
}