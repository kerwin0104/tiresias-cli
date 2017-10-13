const cpr = require('cpr')
const path = require('path')

const hbsTemplatePath = path.join(__dirname, '../tiresias-hbs-template')
const createDirPath = path.join(process.cwd(), './tiresias-hbs-project-template')

function copyProjectFiles (config, callback) {
  console.log('copying project files...')
  cpr(hbsTemplatePath, config.distDir, {
    deleteFirst: true,  //Delete "to" before
    overwrite: true,    //If the file exists, overwrite it
    confirm: true       //After the copy, stat all the copied files to make sure they are there
  }, (err, files) => {
      if (typeof callback === 'function') {
        callback(err, files)
      } 
  })
}

function createProject (projectConfig) {
  var config = {}
  config.rootDir = hbsTemplatePath
  config.distDir = createDirPath
  config = Object.assign({}, config, projectConfig)

  copyProjectFiles(config, (err, files) => {
    if (err) {
      throw err
    } else {
      console.log(files.join(',\n'))
      console.log('proejct files copied!')
    }
  })
}

// createProject({
//   distDir: path.join(process.cwd(), './test-project')
// })
module.exports = createProject


