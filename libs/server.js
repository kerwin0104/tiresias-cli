const path = require('path')
const tiresias = require('tiresias')
const tiresiasWebpack = require('tiresias-webpack')

const webrootDir = path.join(__dirname, '../webroot')
const testBuildRootDir = path.join(__dirname, '../test')

function serve () {
  var serverConfig = {}
  serverConfig.rootDir = webrootDir

  tiresias.setConfig(serverConfig)
  tiresias.simpleStart(5555)
}

function compileAndServe () {
  var buildConfig = {}
  buildConfig.rootDir = testBuildRootDir
  buildConfig.distDir = webrootDir

  tiresiasWebpack(buildConfig, webpackConfig => {
    return webpackConfig
  }, compiler => {
    compiler.watch({           // watch options:
      aggregateTimeout: 300,   // wait so long for more changes
      poll: true               // use polling instead of native watchers
    }, function(err, stats) {
        compiler.run((err, stats) => {
          console.log('recompile end.')
        })
    });
    serve()
  })
}

compileAndServe()




