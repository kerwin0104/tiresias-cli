const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

var config = {
  entry: {},

  output: {
    // options related to how webpack emits results

    path: path.join(__dirname, '../dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "resources/js/[name].js", // string
    // the filename template for entry chunks

    publicPath: "/", // string
    // the url to the output directory resolved relative to the HTML page

    library: "libs", // string,
    // the name of the exported library

    libraryTarget: "umd", // universal module definition
    // the type of the exported library

    /* Advanced output configuration (click to show) */
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.js$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: false,
              presets: ["babel-preset-es2015"].map(require.resolve),
              plugins: [require("babel-plugin-syntax-dynamic-import")]
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: 'resources/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: 'resources/fonts/[name].[hash:7].[ext]'
        }
      }

    ],

    /* Advanced module configuration (click to show) */
  },

  // This set of options is identical to the resolve property set above, 
  // but is used only to resolve webpack's loader packages. Default:
  resolveLoader: {
    modules: [path.resolve(__dirname, "../../../node_modules/")],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"]
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      path.resolve(__dirname, '../../../node_modules'),
      "node_modules"
    ],


    // directories where to look for modules

    extensions: [".js", ".json", ".jsx", ".css", ".vue"],
    // extensions that are used

    alias: {
      // a list of module name aliases
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

      // modules aliases are imported relative to the current context
    },
    /* alternative alias syntax (click to show) */

    /* Advanced resolve configuration (click to show) */
  },

  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: "source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: path.join(__dirname, '..'), // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  // externals: ["react", /^@angular\//],
  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: "errors-only",
  // lets you precisely control what bundle information gets displayed

  plugins: [],
  // list of additional plugins

  /* Advanced configuration */
}

function buildConfig (baseConfig, callback) {
  let rootDir = baseConfig.rootDir
  let distDir = baseConfig.distDir 

  config.output.path = distDir

  callback(config)
}

module.exports = buildConfig
