const Scroll = require('./scroll')
const SlideShow = require('./slideshow')

/**
 *  mana
 *
 *  Ubud mana villas
 */
class Application {
  start () {
    this.scroller = new Scroll();
    this.slideshow = new SlideShow({ autoStart: true });
  }
}

const app = new Application()
app.start()
