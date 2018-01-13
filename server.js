const http = require('http')
const multiparty = require('multiparty')
const dotenv = require('dotenv')
const promise = require('bluebird')
const conn = require('emailjs/email')
const Schema = require('async-validate')

Schema.plugin([
  require('async-validate/plugin/object'),
  require('async-validate/plugin/string'),
  require('async-validate/plugin/util')
])

const template = require('./template')

dotenv.config({path: __dirname + '/.env', silent: true})

const server = http.createServer(handler)
const ENDPOINT = '/contact'
const MIME = 'application/json'

const schema = new Schema(require('./schema'))

const email = (options = {}) => {
  const auth = {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_SERVER,
    ssl: true
  }
  const server 	= conn.server.connect(auth)

  options.to = process.env.SMTP_FROM
  options.from = options.from || process.env.SMTP_FROM

  const fn = promise.promisify(server.send, {context: server})
  return fn(options)
}

function handler (req, res) {

  function reply (status, message) {
    res.statusCode = status
    res.statusMessage = message
    const pkt = {code: status, message: message}
    const payload = JSON.stringify(pkt)
    const len = Buffer.byteLength(payload)
    res.setHeader('Content-Type', MIME)
    res.setHeader('Content-Length', len)
    res.write(payload)
  }

  const method = req.method
  const url = req.url
  if (method !== 'POST') {
    return reply(405, 'Method not allowed')
  }


  if (url === ENDPOINT) {
    const origin = req.headers['origin']
    const whitelist = [
      'http://localhost:1111',
      'https://manaveda.com',
      'https://www.manaveda.com'
    ]

    if (~whitelist.indexOf(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }

    const form = new multiparty.Form()
    form.parse(req, function(err, fields, files) {
      const source = fields
      for (let k in source) {
        // Unwrap array values
        source[k] = source[k][0]
      }

      schema.validate(source, (err, res) => {
        if (err) {
          return reply(500, err.message)
        }

        if (res) {
          res.errors = res.errors.map((e) => {
            return e.message
          })
          return reply(400, res)
        }

        const msg = template({vars: source}, {})

        // So that receivers can reply directly
        //msg.from = source.email

        return email(msg)
          .then(() => {
            if (source.redirect) {
              res.setHeader('Location', source.redirect)
              return reply(200)
            }
            return reply(200, 'Message sent')
          })
          .catch((e) => {
            return reply(500, e.message)
          })
      })
    })

    // Do not fall through to 404 catch all
    return
  }

  return reply(404, 'Not found')
}

const listen = (port) => {
  port = port || process.env.PORT || 3001
  server.listen(port, () => {
    console.log('listening on port %s', port)
  })
}

if (!module.parent) {
  listen()
}

module.exports = listen
