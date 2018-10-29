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

    //const h = window.innerHeight
    //const splash = document.querySelector('.home-splash')

    const fix = (h) => {
      list.forEach((el) => {
        el.style.height = h + 'px'
      })
      //splash.style['min-height'] = h + 'px'
    }

    window.onresize = window.onload = () => fix(window.innerHeight)
  }
}

module.exports = VhFix
