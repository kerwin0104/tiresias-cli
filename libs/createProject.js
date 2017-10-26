const cpr = require('cpr')
const path = require('path')
const fs = require('fs')

const hbsTemplatePath = path.join(__dirname, '../tiresias-hbs-template')
const customTemplatePath = path.join(__dirname, '../tiresias-custom-template')
const createDirPath = path.join(process.cwd(), './tiresias-hbs-project-template')

function copyProjectFiles (config, callback, custom) {
  console.log('copying project files...')
  var options = {
    deleteFirst: true,  //Delete "to" before
    overwrite: true,    //If the file exists, overwrite it
    confirm: true       //After the copy, stat all the copied files to make sure they are there
  }
  if (!custom) {
    options.filter = /tiresias-custom-server|tiresias-custom-webpack/
  }
  cpr(config.rootDir || hbsTemplatePath, config.distDir, options, (err, files) => {
      if (typeof callback === 'function') {
        callback(err, files)
      } 
  })
}

function createProject (action, projectConfig, callback) {
  var config = {}
  config.rootDir = customTemplatePath
  config.distDir = createDirPath
  if (typeof action !== 'string') {
    callback = projectConfig
    projectConfig = action
  }
  config = Object.assign({}, config, projectConfig)

  if (typeof action === 'string') {
    if (action === 'hbs') {
      copyProjectFiles(config, (err, files) => {
        callback && callback(err, files)
        if (err) {
          throw err
        } else {
          console.log(files.join(',\n'))
          console.log('proejct [hbs] files copied!')
        }
      })     
    } 

    if (action === 'custom') {
      config.rootDir = customTemplatePath

      var newConfig = Object.assign({}, config)
      newConfig.rootDir = path.join(config.rootDir, './tiresias-custom-server')
      newConfig.distDir = path.join(config.distDir, './tiresias-custom-server')

      copyProjectFiles(newConfig, (err, files) => {
        callback && callback(err, files)
        if (err) {
          throw err
        } else {
          console.log(files.join(',\n'))
          console.log('proejct [custom] server files copied!')
          
          var newConfig = Object.assign({}, config)
          newConfig.rootDir = path.join(config.rootDir, './tiresias-custom-webpack')
          newConfig.distDir = path.join(config.distDir, './tiresias-custom-webpack')

          copyProjectFiles(newConfig, (err, files) => {
            callback && callback(err, files)
            if (err) {
              throw err
            } else {
              console.log(files.join(',\n'))
              console.log('proejct [custom] webpack files copied!')
              console.log('proejct [custom] ready!')
            }
          }, true)


          
        }
      }, true)     
    } 
  } else {
    copyProjectFiles(config, (err, files) => {
      callback && callback(err, files)
      if (err) {
        throw err
      } else {
        console.log(files.join(',\n'))
        console.log('proejct files copied!')
      }
    })
  }
}

module.exports = createProject


