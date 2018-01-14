const config = require('./_slides')

class SlideShow {
  constructor (options = {}) {
    const autoStart = options.autoStart !== undefined ? options.autoStart : false;
    const element = document.querySelector('.swipe')

    // no slideshow on this page
    if (!element) {
      return
    }

    this.playing = false

    const type = document.querySelector('body').getAttribute('data-id')
    let slides = config[type]
    // no slides configured for this page
    if (!slides) {
      return
    }

    const width = Math.max(
      document.documentElement.clientWidth, window.innerWidth || 0)

    console.log('viewport width: ' + width)

    let size
    if (width <= 480) {
      size  = 'sml'
    } else if (width <= 640) {
      size  = 'med'
    } else if (width <= 1024) {
      size  = 'lge'
    } else if (width <= 1536) {
      size  = 'big'
    } else {
      size = 'huge'
    }

    // Set up slideshow images
    const wrap = document.querySelector('.swipe-wrap')
    let div
    let slide
    let url
    for (let i = 0; i < slides.length; i++) {
      url = `/assets/img/slides/${type}/${size}/${slides[i]}`
      //url = '/assets/img/slides/' + type + '/' + slides[i]
      slide = this.element('div',
        {
          class: 'slide',
          style: 'background-image: url("' + url + '")'
        }
      )
      wrap.appendChild(slide)
    }

    // Configure swipe component
    this.swipe = new Swipe(element, {
      startSlide: 0,
      auto: 5000,
      speed: 600,
      draggable: true,
      autoRestart: autoStart,
      continuous: true,
      disableScroll: true,
      stopPropagation: false,
      callback: function callback(index, element) {},
      transitionEnd: function transitionEnd(index, element) {}
    })

    if (autoStart) {
      this.playing = true;
    } else {
      this.stop();
    }

    // Disable auto slideshow if scroll position is not
    // the top of the page
    if (autoStart) {
      window.addEventListener('scroll', () => {
        var top = window.pageYOffset || document.documentElement.scrollTop
        if (this.playing && top !== 0) {
          this.stop()
        } else if (!this.playing && top === 0) {
          this.start()
        }
      })
    }
  }


  element(name, attrs) {
    const elm = document.createElement(name)
    for (let k in attrs) {
      elm.setAttribute(k, attrs[k])
    }
    return elm
  }

  start() {
    if (this.swipe) {
      this.swipe.restart()
      this.playing = true
    }
  }

  stop() {
    if (this.swipe) {
      this.swipe.stop()
      this.playing = false
    }
  }
}

module.exports = SlideShow
