class Contact {
  constructor (form, redirect) {
    const action = form.getAttribute('action')
    const fields = [
      'name',
      'email',
      'message'
    ]

    redirect.setAttribute('value', document.location.href)

    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const values = new FormData()
      fields.forEach((field) => {
        const el = form.querySelector(`[name="${field}"]`)
        //values[field] = el.value
        values.append(field, el.value)
      })

      const opts = {
        method: 'post',
        body: values
      }

      fetch(action, opts)
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
        })
    })
  }
}

module.exports = Contact
