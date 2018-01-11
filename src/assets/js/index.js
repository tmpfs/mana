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

    //const frames = Array.from(document.querySelectorAll('iframe'))
      //console.log(frames)
    //frames.forEach((frame) => {
      //frame.onload = () => {
        //frame.style.height = frame.contentWindow.document.body.scrollHeight + 'px';
        //console.log(frame.style.height)
      //}
    //})
  }
}

const app = new Application()
app.start()
