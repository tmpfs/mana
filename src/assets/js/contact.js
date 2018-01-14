class Contact {
  constructor (form, redirect) {
    const action = form.getAttribute('action')
    const fields = [
      'name',
      'email',
      'message'
    ]

    redirect.setAttribute('value', document.location.href)

    const yes = document.querySelector('.form .success')
    const no = document.querySelector('.form .error')
    const fetchErr = document.querySelector('.form .fetch')
    const errFields = document.querySelector('.form ul.fields')

    const again = document.querySelector('.form a.send')

    function fetchError (e) {
      fetchErr.classList.remove('hidden')
      fetchErr.innerHTML = 'The server may be unavailable or there may be a network problem,  please check your internet connection.'
    }

    function response (res, packet) {
      if (packet.code === 200) {
        form.classList.add('hidden')
        return yes.classList.remove('hidden')
      } else if (packet.code === 400) {
        errFields.classList.remove('hidden')
        errFields.innerHTML = ''
        packet.message.errors.forEach((msg) => {
          // Consistent title case
          msg = msg.charAt(0).toUpperCase() + msg.slice(1)
          errFields.innerHTML += `<li>${msg}</li>`
        })
        return no.classList.remove('hidden')
      }
    }

    function resetErrors () {
      yes.classList.add('hidden')
      no.classList.add('hidden')
      fetchErr.classList.add('hidden')
      errFields.classList.add('hidden')
    }

    function resetFields () {
      fields.forEach((field) => {
        const el = form.querySelector(`[name="${field}"]`)
        el.value = ''
      })
    }

    again.addEventListener('click', (e) => {
      e.preventDefault()
      yes.classList.add('hidden')
      form.classList.remove('hidden')
      resetErrors()
      resetFields()
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()

      resetErrors()

      const values = new FormData()
      fields.forEach((field) => {
        const el = form.querySelector(`[name="${field}"]`)
        values.append(field, el.value)
      })

      const opts = {
        method: 'post',
        body: values,
        mode: 'cors'
      }

      form.classList.add('disabled')

      fetch(action, opts)
        .then((res) => {
          return res.json()
            .then((result) => {
              form.classList.remove('disabled')
              response(res, result)
            })
        })
        .catch((e) => {
          form.classList.remove('disabled')
          return fetchError(e)
        })

      return false
    })
  }
}

module.exports = Contact
