import { gsap } from 'gsap'

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
if (!isTouch) {
  const magneticEls = document.querySelectorAll<HTMLElement>('[data-magnetic]')

  magneticEls.forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const radius = Math.max(rect.width, rect.height) * 0.8

      if (dist < radius) {
        const strength = 0.35
        xTo(dx * strength)
        yTo(dy * strength)
      }
    })

    el.addEventListener('mouseleave', () => {
      xTo(0)
      yTo(0)
    })
  })
}
