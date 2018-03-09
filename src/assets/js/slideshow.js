import Swiper from 'swiper/dist/js/swiper.js'

class SlideShow {
  constructor (options = {}) {
    const autoStart = options.autoStart !== undefined ? options.autoStart : false;
    //const element = document.querySelector('.swipe')
    const element = document.querySelector('.swiper-wrapper')

    // no slideshow on this page
    if (!element) {
      return
    }

    const s = new Swiper ('.swiper-container', {
      loop: true,
      //effect: 'slide',
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    })

    //this.playing = false

    //// Configure swipe component
    //this.swipe = new Swipe(element, {
      //startSlide: 0,
      //auto: 5000,
      //speed: 600,
      //draggable: true,
      //autoRestart: autoStart,
      //continuous: true,
      //disableScroll: true,
      //stopPropagation: false,
      //callback: function callback(index, element) {},
      //transitionEnd: function transitionEnd(index, element) {}
    //})

    //if (autoStart) {
      //this.playing = true;
    //} else {
      //this.stop();
    //}

    //// Disable auto slideshow if scroll position is not
    //// the top of the page
    //if (autoStart) {
      //window.addEventListener('scroll', () => {
        //var top = window.pageYOffset || document.documentElement.scrollTop
        //if (this.playing && top !== 0) {
          //this.stop()
        //} else if (!this.playing && top === 0) {
          //this.start()
        //}
      //})
    //}
  }

  //start() {
    //if (this.swipe) {
      //this.swipe.restart()
      //this.playing = true
    //}
  //}

  //stop() {
    //if (this.swipe) {
      //this.swipe.stop()
      //this.playing = false
    //}
  //}
}

module.exports = SlideShow
