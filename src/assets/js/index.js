const Scroll = require('./scroll')
const SlideShow = require('./slideshow')
const Gallery = require('./gallery')
const Contact = require('./contact')
const RoomSlideshow = require('./room-slideshow')
const VhFix = require('./vh-fix')

/**
 *  mana
 *
 *  Ubud mana villas
 */
class Application {
  start () {
    this.scroller = new Scroll()
    this.slideshow = new SlideShow()
    this.gallery = new Gallery()
    this.roomSlideshow = new RoomSlideshow()
    this.vhFix = new VhFix()

    // Configure contact form redirect
    const form = document.querySelector('form.contact')
    if (form) {
      const redirect = form.querySelector('input[type="hidden"][name="redirect"]')
      if (redirect) {
        this.contact = new Contact(form, redirect)
      }
    }
  }
}

const app = new Application()
app.start()
