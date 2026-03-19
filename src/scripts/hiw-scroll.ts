import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ===== PAIN HOOK TYPEWRITER =====
const painHook = document.querySelector('[data-hiw-typewriter]') as HTMLElement
if (painHook) {
  const fullText = painHook.textContent?.trim() || ''
  painHook.textContent = ''

  ScrollTrigger.create({
    trigger: painHook,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      let i = 0
      const interval = setInterval(() => {
        if (i < fullText.length) {
          painHook.textContent = fullText.slice(0, i + 1)
          i++
        } else {
          clearInterval(interval)
          painHook.classList.add('typed')
        }
      }, 20)
    },
  })
}

// ===== DESKTOP: STICKY LEFT + SCROLLING PANELS =====
ScrollTrigger.matchMedia({
  '(min-width: 1024px)': () => {
    const container = document.querySelector('[data-hiw-desktop]') as HTMLElement
    const panels = gsap.utils.toArray<HTMLElement>('[data-hiw-panel]')
    const stepNumber = document.querySelector('[data-hiw-number]') as HTMLElement
    const progressFill = document.querySelector('[data-hiw-progress]') as HTMLElement
    const dots = gsap.utils.toArray<HTMLElement>('[data-hiw-dot]')
    const icons = gsap.utils.toArray<HTMLElement>('[data-hiw-icon]')

    if (!container || panels.length === 0) return

    let activeStep = -1
    const numbers = ['01', '02', '03', '04']

    // Set initial state for all panel content
    panels.forEach((panel) => {
      const contentEls = panel.querySelectorAll('[data-hiw-content]')
      gsap.set(contentEls, { opacity: 0, y: 30 })
    })

    // Overall progress for the progress bar
    ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        if (progressFill) {
          progressFill.style.height = `${self.progress * 100}%`
        }
      },
    })

    // Per-panel triggers
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => {
          activateStep(i)
          animateContentIn(panel)
        },
        onLeave: () => {
          animateContentOut(panel, -20)
        },
        onEnterBack: () => {
          activateStep(i)
          animateContentIn(panel)
        },
        onLeaveBack: () => {
          animateContentOut(panel, 30)
        },
      })
    })

    function animateContentIn(panel: HTMLElement) {
      const content = panel.querySelectorAll('[data-hiw-content]')
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    function animateContentOut(panel: HTMLElement, yTarget: number) {
      const content = panel.querySelectorAll('[data-hiw-content]')
      gsap.to(content, {
        opacity: 0,
        y: yTarget,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.in',
        overwrite: true,
      })
    }

    function activateStep(index: number) {
      if (index === activeStep) return
      activeStep = index

      // Update step number with fade
      if (stepNumber) {
        gsap.to(stepNumber, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            stepNumber.textContent = numbers[index]
            gsap.to(stepNumber, { opacity: 1, duration: 0.15 })
          },
        })
      }

      // Update dots
      dots.forEach((dot, i) => {
        if (i <= index) {
          dot.classList.add('border-accent', 'bg-accent')
          dot.classList.remove('border-border', 'bg-bg-primary')
        } else {
          dot.classList.remove('border-accent', 'bg-accent')
          dot.classList.add('border-border', 'bg-bg-primary')
        }
      })

      // Toggle icon visibility
      icons.forEach((icon, i) => {
        if (i === index) {
          icon.classList.remove('opacity-0')
          icon.classList.add('opacity-100')
        } else {
          icon.classList.remove('opacity-100')
          icon.classList.add('opacity-0')
        }
      })
    }
  },

  // ===== MOBILE: TIMELINE SCROLL =====
  '(max-width: 1023px)': () => {
    const mobileContainer = document.querySelector('[data-hiw-mobile]') as HTMLElement
    const mobilePanels = gsap.utils.toArray<HTMLElement>('[data-hiw-mobile-panel]')
    const mobileLine = document.querySelector('[data-hiw-mobile-line]') as HTMLElement
    const mobileDots = gsap.utils.toArray<HTMLElement>('[data-hiw-mobile-dot]')
    const mobileStepDots = gsap.utils.toArray<HTMLElement>('[data-hiw-mobile-step-dot]')
    const mobileStepInners = gsap.utils.toArray<HTMLElement>('[data-hiw-mobile-step-inner]')

    if (!mobileContainer || mobilePanels.length === 0) return

    // Line fill scrub
    if (mobileLine) {
      ScrollTrigger.create({
        trigger: mobileContainer,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
        onUpdate: (self) => {
          mobileLine.style.height = `${self.progress * 100}%`
        },
      })
    }

    // Per-panel dot activation
    mobilePanels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          // Activate sticky dot
          if (mobileDots[i]) {
            mobileDots[i].classList.add('bg-accent', 'border-accent')
            mobileDots[i].classList.remove('bg-bg-primary', 'border-border')
          }
          // Activate timeline dot
          if (mobileStepDots[i]) {
            mobileStepDots[i].classList.add('border-accent')
            mobileStepDots[i].classList.remove('border-border')
          }
          if (mobileStepInners[i]) {
            mobileStepInners[i].classList.add('bg-accent')
            mobileStepInners[i].classList.remove('bg-border')
          }
        },
      })
    })
  },
})
