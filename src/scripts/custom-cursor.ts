import { gsap } from 'gsap'

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

if (!isTouch) {
  const dot = document.querySelector('.cursor-dot') as HTMLElement
  const ring = document.querySelector('.cursor-ring') as HTMLElement
  const glow = document.getElementById('cursorGlow') as HTMLElement

  if (dot && ring) {
    let mouseX = -100
    let mouseY = -100
    let dotX = -100
    let dotY = -100
    let ringX = -100
    let ringY = -100

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Also move glow
      if (glow) {
        glow.style.left = mouseX + 'px'
        glow.style.top = mouseY + 'px'
      }
    })

    gsap.ticker.add(() => {
      // Dot follows closely (lerp 0.8)
      dotX += (mouseX - dotX) * 0.8
      dotY += (mouseY - dotY) * 0.8
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`

      // Ring trails behind (lerp 0.15)
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
    })

    // Scale ring on hoverable elements
    const hoverables = 'a, button, [data-magnetic], .btn-primary, .btn-secondary, .glass-card'
    document.addEventListener('mouseover', (e) => {
      if ((e.target as HTMLElement).closest(hoverables)) {
        ring.style.width = '60px'
        ring.style.height = '60px'
        ring.style.borderColor = 'rgba(6, 182, 212, 0.5)'
        dot.style.opacity = '0.5'
      }
    })
    document.addEventListener('mouseout', (e) => {
      if ((e.target as HTMLElement).closest(hoverables)) {
        ring.style.width = '40px'
        ring.style.height = '40px'
        ring.style.borderColor = 'rgba(6, 182, 212, 0.3)'
        dot.style.opacity = '1'
      }
    })
  }
} else {
  // Hide cursor elements on touch devices
  document.querySelectorAll('.cursor-dot, .cursor-ring, .cursor-glow').forEach(el => {
    ;(el as HTMLElement).style.display = 'none'
  })
}
