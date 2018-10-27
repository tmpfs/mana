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

    const splash = document.querySelector('.home-splash')

    const fix = () => {
      const h = window.innerHeight
      list.forEach((el) => {
        el.style.height = h + 'px'
      })
      splash.style['min-height'] = h + 'px'
      console.log(splash.style)
    }

    window.onload = fix
    window.onresize = fix
    window.onscroll = fix
  }
}

module.exports = VhFix
