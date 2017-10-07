/**
 *  mana
 *
 *  Ubud mana villas
 */
class Application {
  start () {
    // Handle selected state for room sub navigation
    /*
    window.addEventListener('hashchange', (e) => {
      const hash = document.location.hash
      const selection = document.querySelectorAll('.room-nav .selected')
      for (let i = 0; i < selection.length; i++) {
        if (selection[i].classList) {
          selection[i].classList.remove('selected')
        }
      }
      const el = document.querySelector(`a[href="${hash}"]`)
      if (el && el.classList) {
        el.classList.add('selected')
      }
    })
    */
  }
}

const app = new Application()
app.start()
