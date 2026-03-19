function animateCounters() {
  document.querySelectorAll<HTMLElement>('[data-target]').forEach((el) => {
    const target = parseInt(el.getAttribute('data-target') || '0');
    if (!target) return;
    const suffix = el.textContent?.replace(/[0-9]/g, '') || '';
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 40);
  });
}

setTimeout(animateCounters, 1200);
