#! /usr/bin/env node

const program = require('commander');
const createDevServer = require('../libs/server')
const packageFile = require('../package.json')
 
program
  .version(packageFile.version)

program
  .command('run <env> [serverPort]')
  .action((env, serverPort) => {
    if (env === 'dev') {
      var buildConfig = {}
      buildConfig.port = serverPort || 9999
      buildConfig.rootDir = process.cwd()
      createDevServer(buildConfig)  
    }
  })

program.parse(process.argv)
 


