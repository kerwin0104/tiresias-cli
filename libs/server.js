const dev = require('../build/tiresias-custom-webpack/build/dev.js')
const devServer = require('../build/tiresias-custom-server/server')

// compileAndServe (port = 9999, buildConfig = {}, server) 
function createDevServer (config, projectConfig) {
  dev(config.port, config, devServer, projectConfig)
}

module.exports = createDevServer

