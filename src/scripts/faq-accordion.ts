import { gsap } from 'gsap'

document.querySelectorAll<HTMLElement>('.faq-item').forEach((item) => {
  const toggle = item.querySelector<HTMLButtonElement>('.faq-toggle')!
  const content = item.querySelector<HTMLElement>('.faq-content')!
  const inner = item.querySelector<HTMLElement>('.faq-inner')!
  const icon = item.querySelector<HTMLElement>('.faq-icon')!
  let isOpen = false

  toggle.addEventListener('click', () => {
    isOpen = !isOpen
    toggle.setAttribute('aria-expanded', String(isOpen))

    if (isOpen) {
      // Close any other open items
      document.querySelectorAll<HTMLElement>('.faq-item').forEach((other) => {
        if (other !== item && other.classList.contains('faq-open')) {
          closeItem(other)
        }
      })

      item.classList.add('faq-open')
      gsap.to(content, {
        height: inner.offsetHeight,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(inner, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        delay: 0.1,
        ease: 'power2.out',
      })
      gsap.to(icon, {
        rotation: 45,
        duration: 0.3,
        ease: 'power2.out',
      })
    } else {
      closeItem(item)
    }
  })
})

function closeItem(item: HTMLElement) {
  const content = item.querySelector<HTMLElement>('.faq-content')!
  const inner = item.querySelector<HTMLElement>('.faq-inner')!
  const icon = item.querySelector<HTMLElement>('.faq-icon')!
  const toggle = item.querySelector<HTMLButtonElement>('.faq-toggle')!

  item.classList.remove('faq-open')
  toggle.setAttribute('aria-expanded', 'false')

  gsap.to(inner, {
    opacity: 0,
    y: -8,
    duration: 0.2,
    ease: 'power2.in',
  })
  gsap.to(content, {
    height: 0,
    duration: 0.35,
    delay: 0.1,
    ease: 'power2.inOut',
  })
  gsap.to(icon, {
    rotation: 0,
    duration: 0.3,
    ease: 'power2.out',
  })
}
