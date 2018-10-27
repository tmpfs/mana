import Swiper from 'swiper/dist/js/swiper.js'

class RoomSlideshow {

  constructor () {
    this.configure()
  }

  configure () {
    const roomSlideshow = document.querySelector('.room-slideshow')

    // No roomSlideshow elements for this page
    if (!roomSlideshow) {
      return
    }

    const s = new Swiper('.room-slideshow .swiper-container', {
      //spaceBetween: 10,
      autoplay: false,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })

  }
}

module.exports = RoomSlideshow
