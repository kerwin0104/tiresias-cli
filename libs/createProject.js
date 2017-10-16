const cpr = require('cpr')
const path = require('path')

const hbsTemplatePath = path.join(__dirname, '../tiresias-hbs-template')
const customTemplatePath = path.join(__dirname, '../tiresias-custom-template')
const createDirPath = path.join(process.cwd(), './tiresias-hbs-project-template')

function copyProjectFiles (config, callback) {
  console.log('copying project files...')
  cpr(config.rootDir || hbsTemplatePath, config.distDir, {
    deleteFirst: true,  //Delete "to" before
    overwrite: true,    //If the file exists, overwrite it
    confirm: true       //After the copy, stat all the copied files to make sure they are there
  }, (err, files) => {
      if (typeof callback === 'function') {
        callback(err, files)
      } 
  })
}

function createProject (action, projectConfig, callback) {
  var config = {}
  config.rootDir = hbsTemplatePath
  config.distDir = createDirPath
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
      console.log(newConfig)

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
          })


          
        }
      })     
    } 
  } else {
    callback = projectConfig
    projectConfig = action
    copyProjectFiles(config, (err, files) => {
      callback(err, files)
      if (err) {
        throw err
      } else {
        console.log(files.join(',\n'))
        console.log('proejct files copied!')
      }
    })
  }
}

// createProject({
//   distDir: path.join(process.cwd(), './test-project')
// })
module.exports = createProject


