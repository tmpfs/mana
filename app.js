const parse = require('makestatic-preset-parse')

module.exports = {
  input: __dirname + '/src',
  output: __dirname + '/public',

  server: {
    ghostMode: false
  },

  entry: {
    'assets/js/main.js': ['./assets/js/index.js']
  },

  styles: () => {
    const std = require('makestatic-css-standard')
    return std()
  },

  markup: () => {
    const id = require('makestatic-page-id')
    const std = require('makestatic-html-standard')
    return std({locals: (ctx, options) => {
      return {
        pageId: id(ctx, options)
      }
    }})
  },

  script: {
    presets: ['env']
  },

  lifecycle: {
    parse: parse({js: false}),
    graph: require('makestatic-graph-resources'),
    transform: [
      {
        plugin: require('makestatic-sitemap'),
        formats: ['html'],
        template: 'sitemap/index.html'
      }
    ]
  }
}
