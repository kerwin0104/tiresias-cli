const getWebpackgeBaseConfig = require('./webpack.base.config.js')
const os = require('os')
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// base config
const sourceRoot = path.join(__dirname, '../../')
const webrootDir = path.join(__dirname, '../../dist/src')

const baseConfig = {
  rootDir: sourceRoot,
  pageDir: 'src/pages',
  resourceDir: 'src/resources',
  staticDir: 'src/static',
  actionDir: 'src/actions',
  distDir: webrootDir
}

// build config for common
function buildConfig (callback,  buildConfig) {
  buildConfig = Object.assign({}, baseConfig, buildConfig)
  const rootDir = buildConfig.rootDir
  const pageDir = path.join(rootDir, buildConfig.pageDir)
  const resourceDir = path.join(rootDir, buildConfig.resourceDir)
  const actionDir = path.join(rootDir, buildConfig.actionDir)
  const staticDir = path.join(rootDir, buildConfig.staticDir)

  const globPath = path.join(pageDir, './**/*.*')

  getWebpackgeBaseConfig(buildConfig, config => {
    const entry = config.entry || {}
    const plugins = config.plugins || []
    const rules = config.module.rules || []

    config.output.path = buildConfig.distDir
    config.output.filename = "resources/js/[name].[hash].js", // string

  console.log('---------------------------------------------------------------')
  console.log('babel-loader?presets[]=' + ["babel-preset-es2015"].map(require.resolve))

    // build rules for production
    rules.push(
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true,
          loaders: {
            js: 'babel-loader?presets[]=' + ["babel-preset-es2015"].map(require.resolve)
          }
        }
      }
    )
    
    rules.push(
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "less-loader"
          ]
        })
      }
    )

    rules.push(
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100,
                name: 'resources/img/[name].[hash:7].[ext]'
              }
            }
        ]
      }
    )

    // /build rules for production
    
    // build for production
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    )

    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true,
        parallel: true
      })
    )

    plugins.push(
      new ExtractTextPlugin({
        filename: 'resources/css/[name].[contenthash].css'
      })
    )

    plugins.push(
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    )
    // /build for product

    // clean dist dirctory
    plugins.push(
      new CleanWebpackPlugin(['*'], {
          root: buildConfig.distDir,   //  clean build root
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
          to: path.join(buildConfig.distDir, 'controllers')
        },
        {
          context: staticDir,
          from: '**/*',
          to: path.join(buildConfig.distDir, 'static')
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

            let fileName = path.join(pathInfo.dir, pathInfo.name)

            fs.stat(scriptFile, (err, stat) => {
              // add to entry
              if (err) {
                console.warn(`scripts: [${scriptFile }] not found`)
              } else {
                entry[fileName] = scriptFile 
              }

              // add to plugins
              plugins.push(
                new HtmlWebpackPlugin({
                  inject: err ? false : true,
                  chunks: err ? [] : [fileName],
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
          config.module.rules = rules
          callback(config)
        })
    })
  })
}

module.exports = buildConfig
