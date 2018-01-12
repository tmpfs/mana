const PhotoSwipe = require('./photoswipe/photoswipe')
const PhotoSwipeUI = require('./photoswipe/photoswipe-ui-default')

class ImageGallery {

  constructor () {
    this.configure()
  }

  configure () {
    const gallery = document.querySelector('.gallery')
    const pswp = document.querySelector('.pswp')

    // No gallery elements for this page
    if (!gallery || !pswp) {
      return
    }

    const config = require('./_gallery')
    const type = document.querySelector('body').getAttribute('data-id')
    let items = config[type]

    // no gallery configured for this page
    if (!items) {
      return
    }

    const links = Array.from(gallery.querySelectorAll('a'))
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const el = e.currentTarget
        const href = el.getAttribute('href')
        const options = {
          getThumbBoundsFn: function() {
            const thumbnail = el.querySelector('img')
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            const pageXScroll = window.pageXOffset || document.documentElement.scrollLeft
            const rect = thumbnail.getBoundingClientRect()
            return {x: rect.left + pageXScroll, y: rect.top + pageYScroll, w:rect.width}
          }
        }

        let index = 0

        for (let i = 0; i < items.length; i++) {
          if (items[i].msrc === href) {
            index = i
            break
          }
        }

        this.show({index, items, pswp, options})
      })
    })

  }

  show (options = {}) {
    const {index, items, pswp} = options
    const defaults = {
      index,
      history: false,
      galleryPIDS: true,
      escKey: true,
      closeOnScroll: false
    }

    const opts = Object.assign({}, defaults, options.options)

    this.gallery = new PhotoSwipe(pswp, PhotoSwipeUI, items, opts)
    this.gallery.listen('close', () => {
      this.close()
    })
    this.gallery.init()
  }

  close () {
    if (this.gallery) {
      this.gallery.listen('destroy', () => {
        this.gallery = null
      })
      this.gallery.close()
    }
  }
}

module.exports = ImageGallery
