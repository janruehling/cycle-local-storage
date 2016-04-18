'use strict'

var wallabyWebpack = require('wallaby-webpack')
var webpackConfig = require('./webpack.config')

webpackConfig.module.loaders = webpackConfig.module.loaders.filter(function (l) {
  return l.loader !== 'babel-loader'
})

var wallabyPostprocessor = wallabyWebpack(webpackConfig)

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'node_modules/rx/dist/rx.all.min.js', instrument: false },
      { pattern: 'node_modules/history/umd/History.min.js', instrument: false },
      { pattern: 'node_modules/@cycle/core/dist/cycle.min.js', instrument: false },
      { pattern: 'node_modules/@cycle/dom/dist/cycle-dom.min.js', instrument: false },
      { pattern: 'node_modules/ramda/dist/ramda.min.js', instrument: false },
      { pattern: 'src/**/*.js', load: false },
      { pattern: 'src/**/*.css', load: false },
      { pattern: 'src/**/*.spec.js', ignore: true }
    ],

    tests: [
      { pattern: 'src/**/*.spec.js', load: false }
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests()
    }
  }
}
