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

module.exports = template
