import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

document.querySelectorAll<HTMLElement>('[data-target]').forEach((el) => {
  const target = parseInt(el.getAttribute('data-target') || '0');
  if (!target) return;
  const suffix = el.textContent?.match(/[^0-9]+$/)?.[0] || '';

  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
    onUpdate: () => {
      el.textContent = Math.floor(obj.val) + suffix;
    },
  });
});
