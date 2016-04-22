var path = require('path')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: './dist',
    filename: 'app.js'
  },
  resolve: {
    root: path.resolve('./src'),
    alias: {}
  },
  externals: {
    'rx': 'Rx',
    'ramda': 'R',
    '@cycle/core': 'Cycle',
    '@cycle/dom': 'CycleDOM',
    'history': 'History',
    'moment': 'moment'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/,
        loader: 'file'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      }
    ]
  },
  postcss: function (webpack) {
    return [
      require('postcss-nested'),
      require('autoprefixer'),
      require('postcss-import')({
        addDependencyTo: webpack
      })
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin('./src/favicon.png'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    new ExtractTextPlugin('styles.css')
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}
