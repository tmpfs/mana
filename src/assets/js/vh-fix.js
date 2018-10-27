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
    //const splash = document.querySelector('.home-splash')

    const fix = () => {
      //list.forEach((el) => {
        //el.style.height = height + 'px'
      //})
      //splash.style['min-height'] = height + 'px'
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);

    }

    window.onresize = fix

    fix()
  }
}

module.exports = VhFix
