import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

// Split elements with data-split attribute and animate on scroll
document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  const type = el.getAttribute('data-split') as 'chars' | 'words' | 'lines'

  const split = new SplitType(el, { types: type })
  const targets = split[type]

  if (!targets || targets.length === 0) return

  gsap.set(targets, { opacity: 0, y: type === 'chars' ? 40 : 30 })

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: type === 'chars' ? 0.5 : 0.7,
    stagger: type === 'chars' ? 0.02 : type === 'words' ? 0.04 : 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  })
})

// Cleanup on resize
let resizeTimer: number
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(() => {
    ScrollTrigger.refresh()
  }, 300)
})
