import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ===== NAV SCROLL STATE =====
const nav = document.querySelector('nav') as HTMLElement
if (nav) {
  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      if (self.direction === 1 && self.scroll() > 100) {
        nav.classList.add('nav-scrolled')
        nav.classList.remove('nav-transparent')
      } else if (self.scroll() <= 100) {
        nav.classList.remove('nav-scrolled')
        nav.classList.add('nav-transparent')
      }
    },
  })
  // Start transparent
  nav.classList.add('nav-transparent')
}

// ===== BATCH REVEAL (replaces IntersectionObserver) =====
ScrollTrigger.batch('.reveal', {
  onEnter: (batch) => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      overwrite: true,
    })
  },
  start: 'top 88%',
  once: true,
})

// ===== ORB PARALLAX + FLOAT =====
const orbs = document.querySelectorAll('.orb')
if (orbs.length >= 3) {
  const speeds = [0.3, 0.5, 0.7]
  const floatDurations = [20, 25, 30]

  orbs.forEach((orb, i) => {
    // Scroll-linked parallax
    gsap.to(orb, {
      yPercent: -50 * speeds[i],
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // GSAP-controlled float (replaces CSS animation: float)
    const dur = floatDurations[i] * 0.25
    const tl = gsap.timeline({ repeat: -1 })
    tl.to(orb, { xPercent: 6, scale: 1.05, duration: dur, ease: 'sine.inOut' })
      .to(orb, { xPercent: -4, scale: 0.95, duration: dur, ease: 'sine.inOut' })
      .to(orb, { xPercent: 8, scale: 1.02, duration: dur, ease: 'sine.inOut' })
      .to(orb, { xPercent: 0, scale: 1, duration: dur, ease: 'sine.inOut' })
  })
}

// ===== TRUST MARQUEE SKEW =====
const marqueeSection = document.querySelector('.marquee-section') as HTMLElement
if (marqueeSection) {
  gsap.from(marqueeSection, {
    skewX: -2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: marqueeSection,
      start: 'top 90%',
      end: 'top 50%',
      scrub: 1,
    },
  })
}

// ===== SOLUTIONS CARDS STAGGER =====
gsap.set('[data-tilt]', { y: 80, rotationY: 15, opacity: 0 })
ScrollTrigger.batch('[data-tilt]', {
  onEnter: (batch) => {
    gsap.fromTo(batch,
      { y: 80, rotationY: 15, opacity: 0 },
      {
        y: 0,
        rotationY: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      }
    )
  },
  start: 'top 88%',
  once: true,
})

// ===== ABOUT PHOTO CLIP PATH =====
const aboutPhoto = document.querySelector('.about-photo-reveal') as HTMLElement
if (aboutPhoto) {
  gsap.from(aboutPhoto, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger: aboutPhoto,
      start: 'top 75%',
      once: true,
    },
    onComplete: () => {
      gsap.to(aboutPhoto, {
        y: -3,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    },
  })
}

// ===== ABOUT TRUST BADGES SPRING =====
ScrollTrigger.batch('.trust-badge', {
  onEnter: (batch) => {
    gsap.from(batch, {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(2)',
    })
  },
  start: 'top 88%',
  once: true,
})

// ===== PROJECTS FEATURED ENTRANCE =====
const featuredCard = document.querySelector('.project-featured') as HTMLElement
if (featuredCard) {
  gsap.from(featuredCard, {
    y: 100,
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: featuredCard,
      start: 'top 80%',
      once: true,
    },
  })
}

// ===== CTA GRADIENT MESH ANIMATION =====
const ctaMesh = document.querySelector('.cta-mesh') as HTMLElement
if (ctaMesh) {
  // Oscillating gradient positions
  gsap.to(ctaMesh, {
    '--g1-x': '70%',
    '--g1-y': '30%',
    '--g2-x': '30%',
    '--g2-y': '70%',
    duration: 8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}
