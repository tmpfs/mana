class VhFix {
  constructor (options = {}) {
    // Fixes a flicker on mobile firefox as the address bar is shown/hidden
    // when the page is scrolled
    const elements = document.querySelectorAll('.locations .sari .img, .locations .boutique .img')
    const list = Array.from(elements)

    // no elements on this page
    if (!list.length) {
      return
    }

    const h = window.innerHeight
    const splash = document.querySelector('.home-splash')

    const fix = (height) => {
      list.forEach((el) => {
        el.style.height = height + 'px'
      })
      splash.style['min-height'] = height + 'px'
    }

    window.onload = () => fix(h)
    window.onresize = () => fix(window.innerHeight)
    //window.onscroll = () => fix(h)
  }
}

module.exports = VhFix
