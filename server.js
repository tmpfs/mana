const http = require('http')
const qs = require('querystring')
const dotenv = require('dotenv')
const promise = require('bluebird')
const conn = require('emailjs/email')
const Schema = require('async-validate')

dotenv.config({path: __dirname + '/.env', silent: true})

const server = http.createServer(handler)
const ENDPOINT = '/contact'
const MIME = 'application/json'

Schema.plugin([
  require('async-validate/plugin/object'),
  require('async-validate/plugin/string'),
  require('async-validate/plugin/util')
])

const schema = new Schema(require('./schema'))

const template = (options, input = {}) => {
  const {vars} = options
  inputsubject = 'Mana Website Contact'
  input.text = `Hello,

Contact received from the Mana website.

Name: ${vars.name}
Email: ${vars.email}

${vars.message}

Mana Team
https://manaveda.com
reservations@manaveda.com
`
  input.attachment =
   [
      {
        data:
          `<html>
            <p>Hello,</p>
            <p>Contact received from the Mana website.</p>
            <p>Name: <b>${vars.name}</b></p>
            <p>Email: <b>${vars.email}</b></p>
            <p>${vars.message}</p>
            <p>Thanks,</p>
            <p>Mana Team<br />https://manaveda.com<br />reservations@manaveda.com</p>
          </html>`,
        alternative: true
      }
   ]

  return input
}

const email = (options = {}) => {
  const server 	= conn.server.connect({
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_SERVER,
    ssl: true
  })

  options.to = process.env.SMTP_FROM
  options.from = options.from || process.env.SMTP_FROM

  console.log(options)

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

        const msg = template({vars: source}, {})

        // So that receivers can reply directly
        //msg.from = source.email

        return email(msg)
          .then(() => {
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
