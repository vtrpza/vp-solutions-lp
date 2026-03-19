import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const canvas = document.getElementById('particles') as HTMLCanvasElement;
if (canvas) {
  const ctx = canvas.getContext('2d')!;
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 15 : 50;
  let globalOpacity = 1;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Fade particles as user scrolls past hero
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: '+=800',
    scrub: true,
    onUpdate: (self) => {
      globalOpacity = 1 - self.progress * 0.7; // fades to 30% opacity
    },
  });

  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;

    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.3 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity * globalOpacity})`;
      ctx.fill();
    }
  }

  const particles: Particle[] = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const connectionDist = isMobile ? 100 : 150;

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - dist / connectionDist) * globalOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}
