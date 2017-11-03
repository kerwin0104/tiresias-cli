const path = require('path')
const os = require('os')
const tiresiasWebpack = require('tiresias-webpack')
const opn = require('opn')
const getWebpackConfig = require('../config/webpack.dev.config.js')
const server = require('../../tiresias-custom-server/server.js')

// tmp dir build for server
const webrootDir = path.join(os.tmpdir(), './webroot')

// source build root
const sourceRootDir = path.join(__dirname, '../../../src')

// start server after first build end.
var firstBuildEnd = false

function startServer (port, devServerConfig, devServer) {
  var serverConfig = {}
  serverConfig.rootDir = webrootDir
  serverConfig.port = port
  var tiresias = devServer.init(serverConfig)
  var proxyConf = devServerConfig.proxy
  if (proxyConf) {
    var proxy = require('http-proxy-middleware')
    for(var path in proxyConf) {
      tiresias.app.use(path, proxy(proxyConf[path]))
    }
  }
  devServer.start()
}

function compileAndServe (port = 9999, buildConfig = {}, devServer, projectConfig) {
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
          var date = new Date
          console.log(
            `=> build end at: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          )
          if (!firstBuildEnd) { 
            startServer(port, projectConfig.server || {}, devServer)
            
            opn('http://127.0.0.1:' + port)
            firstBuildEnd = true
          }
        })
    }); 

    console.log('building resource please wait...')
  }, buildConfig)
}

// compileAndServe()

module.exports = compileAndServe
