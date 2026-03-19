import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const heroSection = document.querySelector('#hero-section') as HTMLElement
if (heroSection) {
  const heroEls = ['#hero-badge', '#hero-heading', '#hero-subheading', '#hero-ctas', '#hero-stats']
  // Make visible but transparent so GSAP can animate opacity
  heroEls.forEach(sel => {
    const el = document.querySelector(sel) as HTMLElement
    if (el) {
      el.style.visibility = 'visible'
      el.style.opacity = '0'
    }
  })

  const tl = gsap.timeline({ delay: 0.6 })

  // Badge
  tl.to('#hero-badge', {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out',
  })

  // Heading
  tl.fromTo('#hero-heading', {
    y: 60,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.3')

  // Subheading
  tl.fromTo('#hero-subheading', {
    y: 40,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.4')

  // CTAs
  tl.fromTo('#hero-ctas', {
    y: 30,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.3')

  // Stats
  tl.fromTo('#hero-stats', {
    y: 30,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.2')

  // Trigger adam-hands assembly at t=1.2s
  tl.call(() => {
    window.dispatchEvent(new CustomEvent('start-adam-assembly'))
  }, [], 1.2)

  // Scroll parallax (desktop only)
  if (window.innerWidth >= 1024) {
    gsap.to('#hero-heading', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    gsap.to('#hero-subheading', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    gsap.to('#hero-stats', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }
}
