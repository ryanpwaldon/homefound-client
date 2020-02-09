const map = new Map()

export default function install (Vue) {
  Vue.directive('contain-scroll', {
    bind (el) {
      const handler = e => {
        if (
          !el.contains(e.target) ||
          (el.scrollTop === 0 && e.deltaY < 0) ||
          (Math.abs(el.scrollTop - (el.scrollHeight - el.clientHeight)) <= 1 && e.deltaY > 0)
        ) {
          e.preventDefault()
        }
      }
      map.set(el, handler)
      document.addEventListener('wheel', handler, { passive: false })
    },
    unbind (el) {
      document.removeEventListener('wheel', map.get(el))
      map.delete(el)
    }
  })
}
