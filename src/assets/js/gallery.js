import Swiper from 'swiper/dist/js/swiper.js'

class ImageGallery {

  constructor () {
    this.configure()
  }

  configure () {
    const gallery = document.querySelector('.gallery')

    // No gallery elements for this page
    if (!gallery) {
      return
    }

    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      autoplay: false,
      //loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })

    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      autoplay: false,
      centeredSlides: true,
      slidesPerView: 'auto',
      //loop: true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
    })

    galleryTop.controller.control = galleryThumbs
    galleryThumbs.controller.control = galleryTop
  }
}

module.exports = ImageGallery
