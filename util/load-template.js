"use strict";

/**
 * 
 * Load template
 * 
 */

const is                = require('./is')
const path              = require('path')
const CWD_PATH          = require('./path').CWD_PATH
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports =  (template) =>{
  let templates = {}

  if (template === true) {
    templates['index.html'] = new HtmlWebpackPlugin()
  } else if (is.string(template)) {
    templates['index.html'] = new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(CWD_PATH, template)
    })
  } else if (is.object(template)) {
    for (var name in template) {
      if ({}.hasOwnProperty.call(template, name)) {
        if (is.string(template[name])) {
          templates[name] = new HtmlWebpackPlugin({
            filename: name,
            template: template[name]
          })
        } else {
          template[name].filename = template[name].filename || name
          templates[name] = new HtmlWebpackPlugin(template[name])
        }
      }
    }
  }

  return templates
}
