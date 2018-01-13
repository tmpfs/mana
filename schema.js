const contact = {
  type: 'object',
  fields: {
    name: {type: 'string', required: true},
    email: [
      {type: 'string', required: true},
      function (cb) {
        // simple email validation
        const ptn =/^[^@]+@.+\..+/
        if (!ptn.test(this.value)) {
          this.raise('Invalid email address %s', this.value)
        }
        cb()
      }
    ],
    message: {type: 'string', required: true}
  }
}

module.exports = contact
