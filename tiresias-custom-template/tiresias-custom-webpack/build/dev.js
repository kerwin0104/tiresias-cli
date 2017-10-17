const path = require('path')
const os = require('os')
const tiresiasWebpack = require('tiresias-webpack')
const opn = require('opn')
const getWebpackConfig = require('../config/webpack.dev.config.js')
const server = require('../../tiresias-custom-server/server.js')

// dev server port
const port = 9999

// tmp dir build for server
const webrootDir = path.join(os.tmpdir(), './webroot')

// source build root
const sourceRootDir = path.join(__dirname, '../../../src')

// default config for dev server
const defaultConfig = {}
defaultConfig.port = port
defaultConfig.rootDir = sourceRootDir
defaultConfig.distDir = webrootDir

// start server after first build end.
var firstBuildEnd = false

function startServer (port) {
  var serverConfig = {}
  serverConfig.rootDir = webrootDir
  serverConfig.port = port
  server.init(serverConfig)
  server.start()
}

function compileAndServe () {
  getWebpackConfig(webpackConfig => {
    var compiler = tiresiasWebpack.exec(webpackConfig)
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
            startServer(port)
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
