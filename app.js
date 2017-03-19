module.exports = {
  input: 'src',
  output: 'public',

  server: {
    ghostMode: false
  },

  styles: () => {
    const std= require('makestatic-css-standard')
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
  }
}
