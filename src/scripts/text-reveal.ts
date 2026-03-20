import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

interface SplitRecord {
  el: HTMLElement
  type: 'chars' | 'words' | 'lines'
  split: SplitType
  trigger: ScrollTrigger
}

const records: SplitRecord[] = []

function initSplits() {
  // Kill existing triggers and revert splits
  records.forEach((rec) => {
    rec.trigger.kill()
    rec.split.revert()
  })
  records.length = 0

  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const type = el.getAttribute('data-split') as 'chars' | 'words' | 'lines'
    const split = new SplitType(el, { types: type })
    const targets = split[type]

    if (!targets || targets.length === 0) return

    gsap.set(targets, { opacity: 0, y: type === 'chars' ? 40 : 30 })

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: type === 'chars' ? 0.5 : 0.7,
      stagger: type === 'chars' ? 0.02 : type === 'words' ? 0.04 : 0.08,
      ease: 'power3.out',
      paused: true,
    })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tween.play(),
    })

    records.push({ el, type, split, trigger })
  })
}

// Defer until load so fonts are ready before SplitType measures character widths,
// which avoids a forced reflow and ensures correct split positions.
if (document.readyState === 'complete') {
  initSplits()
} else {
  window.addEventListener('load', initSplits)
}

// Re-initialize on resize so SplitType recalculates dimensions
let resizeTimer: number
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(() => {
    initSplits()
  }, 300)
})
