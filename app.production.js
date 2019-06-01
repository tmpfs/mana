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
      require('makestatic-dom-version'),
      {
        test: /\.(html|sgr)$/,
        plugin: require('makestatic-inline-css')
      }
    ],
    verify: [
      require('makestatic-verify-id')
      // require('makestatic-verify-anchor'),
      // require('makestatic-verify-link')
    ],
    emit: [
      {
        plugin: require('makestatic-fingerprint'),
        rules: [/main\.js$/]
      },
      {
        plugin: require('makestatic-sitemap'),
        formats: ['xml', 'html'],
        template: 'sitemap/index.html',
        robots: true
      }
    ],
    optimize: optimize(),
    audit: [
      //require('makestatic-validate-html'),
      require('makestatic-archive-zip')
    ]
  },

  deploy: {
    production: {
      s3: {
        domain: 'manaveda.com',
        credentials: {
          profile: 'mana'
        },
        prefix: 'production',
        region: 'ap-southeast-1',
        error: 'production/404.html',
        redirects: [
          'www.manaveda.com',
          'manaubud.com',
          'www.manaubud.com',
          'ubudmana.com',
          'www.ubudmana.com'
        ],
        publish: true,
        cloudfront: {
          key: 'cloudfront_distribution_production',
          invalidate: true,
          paths: ['/*']
        }
      }
    }
  }
}
