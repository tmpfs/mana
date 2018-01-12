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
        console.log(el)
        const href = el.getAttribute('href')
        let index = 0
        for (let i = 0; i < items.length; i++) {

          //console.log(items[i])

          if (items[i].src === href) {
            index = i
            break
          }
        }

        //console.log('show index: ' + index)

        this.show({index, items, pswp})
      })
    })

  }

  show (options = {}) {
    const {index, items, pswp} = options
    const opts = {
      index,
      history: false,
      galleryPIDS: true,
      escKey: true,
      closeOnScroll: false
    }

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
