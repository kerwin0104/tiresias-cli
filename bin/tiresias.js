#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander')
const createDevServer = require('../libs/server')
const buildProd = require('../libs/buildProd')
const createProject = require('../libs/createProject')
const packageFile = require('../package.json')
 
const description = `
  =======================================================================
    provide develop environment & build project for tiresias framework.
    for more description use:
       ----------------------
       | tiresias run -h    |
       | tiresias init -h   |
       ----------------------
  =======================================================================
`
program
  .version('tiresias-cli v' + packageFile.version)
  .description(description)

program
  .command('run <env>')
  .description( 'use "tiresias run dev" to start dev server and use "tiresias run prod" to build project.')
  .option('-p, --port [port]', 'dev server\'s port')
  .option('-d, --dist [dist]', 'build tartget directory')
  .option('-c, --custom [custom]', 'custom [webpack cofing] and [tiresias server] for dev or build')
  .action((env, options) => {
    if (options.custom) {
      var build = require(path.join(process.cwd(), `./tiresias-custom-webpack/build/${env}`))
      if (env === 'dev') {
        var buildConfig = {}
        buildConfig.port =  options.port || 9999
        buildConfig.rootDir = process.cwd()
        var projectConfigPath = path.join(buildConfig.rootDir, './project.json')
        var projectConfigPath = path.join(buildConfig.rootDir, './project.json')
        fs.stat(projectConfigPath, (err, stat) => {
          var projectConfig
          if (err) {
            console.log('no project config, use default.')
            projectConfig = {}
          } else {
            console.log('got project config.')
            projectConfig = require(projectConfigPath)
          }
          
          build(options.port, config, null, projectConfig)
        })
      } 
      if (env === 'pord') {
        build()
      }
    } else {
      if (env === 'dev') {
        var buildConfig = {}
        buildConfig.port =  options.port || 9999
        buildConfig.rootDir = process.cwd()
        var projectConfigPath = path.join(buildConfig.rootDir, './project.json')
        fs.stat(projectConfigPath, (err, stat) => {
          var projectConfig
          if (err) {
            console.log('no project config, use default.')
            projectConfig = {}
          } else {
            console.log('got project config.')
            projectConfig = require(projectConfigPath)
          }
          createDevServer(buildConfig, projectConfig)  
        })
      } 
      if (env === 'prod') {
        var cwd = process.cwd()
        var config = {}
        config.rootDir = path.join(cwd)
        config.distDir = options.dist || path.join(cwd, './dist')
        console.log(config)
        buildProd(config)
      }
    }
  })

program
  .command('init <projectName>')
  .description( 'use "tiresias init <your project name>" to init your project.')
  .option('-c, --custom [custom]', 'custom [webpack cofing] and [tiresias server] for dev or build')
  .action((projectName, options) => {
    var projectConfig = {}
    projectConfig.distDir = path.join(process.cwd(), projectName)
    if (options.custom) {
      createProject('hbs', projectConfig, () => {
        createProject('custom', projectConfig) 
      }) 
    } else {
      createProject(projectConfig) 
    }
  })

program.parse(process.argv)
 
if (!program.args.length) program.help();


