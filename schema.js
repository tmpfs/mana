function empty (cb) {
  if (this.value.trim() === '') {
    this.raise('%s may not be empty', this.field)
  }
  cb()
}

const contact = {
  type: 'object',
  fields: {
    name: [{type: 'string', required: true}, empty],
    email: [
      {type: 'string', required: true},
      empty,
      function (cb) {
        // simple email validation
        const ptn =/^[^@]+@.+\..+/
        if (!ptn.test(this.value)) {
          this.raise('Invalid email address %s', this.value)
        }
        cb()
      }
    ],
    message: [{type: 'string', required: true}, empty]
  }
}

module.exports = contact
