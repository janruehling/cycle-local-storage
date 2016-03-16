var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: './dist',
    filename: 'app.js'
  },
  resolve: {
    root: path.resolve('./src')
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
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file'
      }
    ],
    postcss: function (webpack) {
      return [
        require('postcss-nested'),
        require('autoprefixer'),
        require('postcss-import')({
          addDependencyTo: webpack
        })
      ]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('styles.css')
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}
