const Scroll = require('./scroll')
const SlideShow = require('./slideshow')
const Gallery = require('./gallery')

/**
 *  mana
 *
 *  Ubud mana villas
 */
class Application {
  start () {
    this.scroller = new Scroll()
    this.slideshow = new SlideShow({ autoStart: true })
    this.gallery = new Gallery()
  }
}

const app = new Application()
app.start()
