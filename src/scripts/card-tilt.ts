import { gsap } from 'gsap'

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

if (!isTouch) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const setRx = gsap.quickSetter(card, 'rotateX', 'deg') as (value: number) => void
    const setRy = gsap.quickSetter(card, 'rotateY', 'deg') as (value: number) => void

    card.style.transformStyle = 'preserve-3d'
    card.style.willChange = 'transform'

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)

      setRx(-dy * 8)
      setRy(dx * 8)

      // Set CSS vars for spotlight gradient
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mouse-x', `${px}%`)
      card.style.setProperty('--mouse-y', `${py}%`)
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
    })
  })
}
