const http = require('http')
const server = http.createServer(handler)
const qs = require('querystring')
const dotenv = require('dotenv')
const Schema = require('async-validate')

dotenv.config({path: __dirname + '/.env', silent: true})

const ENDPOINT = '/contact'
const MIME = 'application/json'

Schema.plugin([
  require('async-validate/plugin/object'),
  require('async-validate/plugin/string'),
  require('async-validate/plugin/util')
])

const schema = new Schema(require('./schema'))


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
    let body = new Buffer(0)
    req.on('data', function (data) {
      body = Buffer.concat([body, data]);
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        return reply (413, 'Request entity too large')
      }
    })

    req.on('end', function () {
      // NOTE: need to assign as the object returned from
      // NOTE: qs.parse() does not have `hasOwnProperty`
      const source = Object.assign({}, qs.parse(body.toString()))

      schema.validate(source, (err, res) => {
        if (err) {
          return reply(500, err.message)
        }

        if (res && res.errors && res.errors.length) {
          return reply(400, res.errors[0].message)
        }

        console.log('send contact info')
        return reply(200)
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
