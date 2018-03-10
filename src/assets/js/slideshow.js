import Swiper from 'swiper/dist/js/swiper.js'

class SlideShow {
  constructor (options = {}) {
    const autoStart = options.autoStart !== undefined ? options.autoStart : false;
    const element = document.querySelector('.slideshow')

    // no slideshow on this page
    if (!element) {
      return
    }

    const s = new Swiper ('.slideshow .swiper-container', {
      loop: true,
      //effect: 'slide',
      autoplay: false,
      //autoplay: {
        //delay: 10000,
        //disableOnInteraction: false,
      //},

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    })

  }
}

module.exports = SlideShow
