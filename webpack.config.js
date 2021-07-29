const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //removes old files from dist when you run the build process
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') //generates a HTML file that includes the CSS and JS files in the build process
const fse = require('fs-extra')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

let pages = fse.readdirSync('./app').filter(function(file) {
  return file.endsWith('.html') //select only html files from array of all files in app folder returned by readdirSync
  }).map(function(page) {
  return new HtmlWebpackPlugin({
    filename: page, 
    template: `./app/${page}` //the existing HTML file
  }) // HtmlWebpackPlugin generates a HTML file linked to CSS and JS 
}) 

let config

if (currentTask == 'dev') {
  config = {
    entry: './app/assets/scripts/index.js',
    output: {
      filename: 'bundled.js',
      path: path.resolve(__dirname, 'app')
    },
    devServer: {
      before: function(app, server) {
        server._watch('./app/**/*.html')
      },
      contentBase: path.join(__dirname, 'app'),
      hot: true,
      port: 3000,
      host: '0.0.0.0'
    },
    mode: 'development',
    plugins: pages,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader?url=false", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
        }
      ]
    }
  }
}

if (currentTask == 'build') {
  config = {
    entry: './app/assets/scripts/index.js',
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'docs')
    },
    mode: 'production',
    plugins: [...pages, new CleanWebpackPlugin(), new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'})], /* The plugins option is used to customize the webpack build process */
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader?url=false", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
        },
        { //apply babel to JS files to ensure that they are compatible with all (esp older) browsers
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }, /* These options determine how the different types of modules within a project will be treated. */
    optimization: {
      splitChunks: {chunks: 'all'}, /* splits out vendor code which will not be updated often from code we wrote */
      minimize: true,
      minimizer: [`...`, new CssMinimizerPlugin()] /* Minimise the CSS files */
    }

  
  }
  // config.module.rules[0].use.unshift(MiniCssExtractPlugin.loader)
}

module.exports = config