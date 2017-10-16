const getWebpackgeBaseConfig = require('./webpack.base.config.js')
const os = require('os')
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// base config
const sourceRoot = path.join(__dirname, '../../')
const webrootDir = path.join(os.tmpdir(), './webroot')

const baseConfig = {
  rootDir: sourceRoot,
  pageDir: 'src/pages',
  resourceDir: 'src/resources',
  staticDir: 'src/static',
  actionDir: 'src/actions',
  distDir: webrootDir
}

// build config for common
function buildConfig (callback) {
  const rootDir = baseConfig.rootDir
  const pageDir = path.join(rootDir, baseConfig.pageDir)
  const resourceDir = path.join(rootDir, baseConfig.resourceDir)
  const actionDir = path.join(rootDir, baseConfig.actionDir)
  const staticDir = path.join(rootDir, baseConfig.staticDir)

  const globPath = path.join(pageDir, './**/*.*')

  getWebpackgeBaseConfig(baseConfig, config => {
    const entry = config.entry || {}
    const plugins = config.plugins || []

    config.output.path = baseConfig.distDir

    // clean dist dirctory
    plugins.push(
      new CleanWebpackPlugin(['*'], {
          root: baseConfig.distDir,   //  clean build root
          verbose:  true,  　　       //  show detail 
          dry:      false  　　       //  only delete files
        }
      )
    )

    // copy actions and static
    plugins.push(
      new CopyWebpackPlugin([
        {
          context: actionDir,
          from: '**/*',
          to: path.join(baseConfig.distDir, 'controllers')
        },
        {
          context: staticDir,
          from: '**/*',
          to: path.join(baseConfig.distDir, 'static')
        }
      ])
    )

    var processPromise= []

    glob(globPath, (err, filePaths) => {
      filePaths.forEach(filePath => {
        let relativeFilePath = path.relative(pageDir, filePath)
        let pathInfo = path.parse(relativeFilePath)

        processPromise.push(
          new Promise((resolve, reject) => {
            let scriptFile = path.join(
                resourceDir,
                path.dirname(relativeFilePath), 
                './main.js'
            )

            fs.stat(scriptFile, (err, stat) => {
              // add to entry
              if (err) {
                console.warn(`scripts: [${scriptFile }] not found`)
              } else {
                entry[pathInfo.name] = scriptFile 
              }

              // add to plugins
              plugins.push(
                new HtmlWebpackPlugin({
                  inject: err ? false : true,
                  chunks: err ? [] : [pathInfo.name],
                  filename: path.join(
                      pathInfo.ext === '.html' ? 'htmls' : 'templates',
                      relativeFilePath
                  ),
                  template: filePath,
                })
              )
              resolve()
            })
            
          })
        )
      })

      Promise.all(processPromise)
        .then(() => {
          config.entry = entry
          config.plugins = plugins
          callback(config)
        })
    })
  })
}

module.exports = buildConfig
