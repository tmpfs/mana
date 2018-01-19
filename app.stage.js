const conf = require('./app.production')

// subdomain for stage deployment
conf.url = 'https://stage.manaveda.com'

// run as static web server
// disables browsersync network requests
conf.static = true

// disable manifest generation
conf.manifest = false

// no need to audit in stage
conf.lifecycle.audit = null

conf.deploy = {
  stage: {
    s3: {
      domain: 'manaveda.com',
      credentials: {
        profile: 'mana'
      },
       prefix: 'stage',
      params: {
        CacheControl: 'no-store, no-cache, must-revalidate'
      },
      region: 'ap-southeast-1',
      error: 'stage/404.html',
      redirects: [
        'www.manaveda.com',
        'manaubud.com',
        'www.manaubud.com',
        'ubudmana.com',
        'www.ubudmana.com'
      ],
      publish: true,
      cloudfront: {
        key: 'cloudfront_distribution_stage',
        invalidate: true,
        paths: ['/*']
      }
    }
  }
}

module.exports = conf
