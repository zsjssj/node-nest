/**
 * @description: 一个竖排列元素，从底部进入可见视口时候，向上滑动的动画
 */

const OFFSET = 100
const DURATION = 500
const map = new WeakMap()

const ob = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = map.get(entry.target)
      if (animation) {
        animation.play()
        ob.unobserve(entry.target)
      }
    } else {
      entry.target.animation.pause()
    }
  }
})

function belowViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}
const vBottom_top = {
  mounted: el => {
    if (!belowViewport(el)) return
    const animation = el.animate(
      [
        { transform: `translateY(${OFFSET}px)`, opacity: 0 },
        { transform: `translateY(0)`, opacity: 0 },
      ],
      { duration: DURATION, easing: 'ease-out', fill: 'forwards' },
    )
    animation.pause() //暂停动画
    ob.observe(el)
    map.set(el, animation)
  },
}
export default vBottom_top
