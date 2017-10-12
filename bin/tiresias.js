#! /usr/bin/env node

const path = require('path')
const program = require('commander')
const createDevServer = require('../libs/server')
const buildProd = require('../libs/buildProd')
const packageFile = require('../package.json')
 
program
  .version(packageFile.version)

program
  .command('run <env>')
  .description( 'use "tiresias run dev" to start dev server and use "tiresias run prod" to build project.')
  .option('-p, --port [port]', 'dev server\'s port')
  .option('-d, --dist [dist]', 'build tartget directory')
  .action((env, options) => {
    if (env === 'dev') {
      var buildConfig = {}
      buildConfig.port =  options.port || 9999
      buildConfig.rootDir = process.cwd()
      createDevServer(buildConfig)  
    } 
    if (env === 'prod') {
      var cwd = process.cwd()
      var config = {}
      config.rootDir = path.join(cwd)
      config.distDir = options.dist || path.join(cwd, './dist')
      console.log(config)
      buildProd(config)
    } 
  })

program
  .command('int <projectName>')
  .action(projectName => {
    
  })

program.parse(process.argv)
 


