const path = require('path')
const tiresias = require('tiresias')
const tiresiasWebpack = require('tiresias-webpack')
const opn = require('opn')

const webrootDir = path.join(__dirname, '../webroot')
const testBuildRootDir = path.join(__dirname, '../test')

const defaultConfig = {}
defaultConfig.port = 9999
defaultConfig.rootDir = testBuildRootDir
defaultConfig.distDir = webrootDir

var firstBuildEnd = false

function serve (port) {
  var serverConfig = {}
  serverConfig.rootDir = webrootDir

  tiresias.setConfig(serverConfig)
  tiresias.simpleStart(port)
}

function compileAndServe (customConfig = defaultConfig) {
  var buildConfig = {}
  buildConfig.rootDir = defaultConfig.rootDir
  buildConfig.distDir = defaultConfig.distDir

  buildConfig = Object.assign({}, buildConfig, customConfig)

  var port = buildConfig.port

  tiresiasWebpack(buildConfig, webpackConfig => {
    return webpackConfig
  }, compiler => {
    compiler.watch({           // watch options:
      aggregateTimeout: 300,   // wait so long for more changes
      poll: true               // use polling instead of native watchers
    }, function(err, stats) {
        compiler.run((err, stats) => {
          if (err) throw err
          process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n')
          if (!firstBuildEnd) {
            serve(port)
            opn('http://127.0.0.1:' + port)
            firstBuildEnd = true
          }
        })
    }); 
    console.log('building resource please wait...')
  })
}

// compileAndServe()
module.exports = compileAndServe


