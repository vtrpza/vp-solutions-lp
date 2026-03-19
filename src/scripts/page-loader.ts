import { gsap } from 'gsap'

const loader = document.querySelector('.page-loader') as HTMLElement

if (loader) {
  const tl = gsap.timeline()

  tl.to(loader, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      loader.style.display = 'none'
    },
  })

  // Stagger in orbs
  tl.fromTo('.orb', {
    scale: 0,
    opacity: 0,
  }, {
    scale: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    ease: 'power2.out',
  }, '-=0.3')

  // Stagger in grid background
  tl.from('.grid-bg', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.8')
}
