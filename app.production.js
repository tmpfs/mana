const parse = require('makestatic-preset-parse')
const optimize = require('makestatic-preset-optimize')

module.exports = {
  // disable source maps
  devtool: false,

  // generate manifest file
  manifest: true,

  // configure optimization lifecycle
  lifecycle: {
    parse: parse({css: false, js: false}),
    transform: [
      {
        test: /\.(html|sgr)$/,
        plugin: require('makestatic-inline-css')
      }
    ],
    optimize: optimize()
  }
}
