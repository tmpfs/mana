function easeOutQuad(iteration, start, diff, total) {
  return -diff * (iteration /= total) * (iteration - 2) + start;
}

class Scroll {

  constructor () {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.scrollToLink = this.onScrollToLink.bind(this);
    for (var i = 0; i < this.links.length; i++) {
      this.links[i].addEventListener('click', this.scrollToLink, false);
      this.links[i].addEventListener('touchend', this.scrollToLink, false);
    }
  }

  getScrollPosition() {
    const doc = document.documentElement
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    return {left: left, top: top}
  }

  onScrollToLink(e) {
    e.preventDefault();
    var id = e.currentTarget.getAttribute('href');
    if (id) {
      this.scrollToId(id);
      document.location.hash = id;
    }
  }

  scrollToId(id) {
    id = id.replace(/^#/, '');
    var el = document.getElementById(id);
    if (el) {
      var bounds = el.getBoundingClientRect();
      this.scrollToTop(bounds.top);
    }
  }

  scrollToTop(val) {
    let start = this.getScrollPosition().top
    let iteration = 0
    let duration = 50
    let diff = val === 0 ? -start : val
    let requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    // perform the animation
    function doScroll() {
      var value = easeOutQuad(iteration, start, diff, duration)
      var amount = value < 0 ? -value : value
      window.scrollTo(0, amount)
      if (iteration >= duration) {
        window.scrollTo(0, Math.floor(amount))
        return
      }
      requestAnimationFrame(doScroll)
      iteration++
    }

    doScroll()
  }
}

module.exports = Scroll
