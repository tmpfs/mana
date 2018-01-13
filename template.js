const template = (options, input = {}) => {
  const {vars} = options

  vars.body = vars.message.replace(/\r?\n+/g, ' ')

  input.subject = 'Website Contact (manaveda.com)'
  input.text = `Name: ${vars.name}
Email: ${vars.email}

Message:

${vars.message}
`
  input.attachment =
   [
      {
        data:
          `<html>
            <p>Name: <b>${vars.name}</b></p>
            <p>Email: <b>${vars.email}</b></p>
            <p>Message:</p>
            <p>${vars.message}</p>
            <p><hr /></p>
            <p><a href="mailto:${vars.email}?subject=Mana: Thank you for your enquiry&body=> ${vars.body}">Reply to ${vars.email}</a></p>
          </html>`,
        alternative: true
      }
   ]

  return input
}

module.exports = template
