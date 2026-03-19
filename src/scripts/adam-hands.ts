const canvas = document.getElementById('adam-hands-canvas') as HTMLCanvasElement | null;

if (canvas && window.innerWidth >= 768) {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const dpr = window.devicePixelRatio || 1;

    interface Dot {
      // Target (sampled) position
      tx: number;
      ty: number;
      // Current position (for assembly animation)
      x: number;
      y: number;
      // Scattered start position
      sx: number;
      sy: number;
      radius: number;
      baseOpacity: number;
      // Per-dot phase offset for breathing
      phase: number;
    }

    let dots: Dot[] = [];
    let sparkX = 0;
    let sparkY = 0;
    let animationId = 0;
    let assemblyStart = 0;
    let isVisible = true;
    const ASSEMBLY_DURATION = 1500; // ms
    const ASSEMBLY_DELAY = 1400; // ms after page load

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.style.width = rect.width + 'px';
      canvas!.style.height = rect.height + 'px';
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function sampleImage(img: HTMLImageElement) {
      const offscreen = document.createElement('canvas');
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const offCtx = offscreen.getContext('2d')!;
      offCtx.drawImage(img, 0, 0);
      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imageData.data;

      const canvasW = canvas!.width / dpr;
      const canvasH = canvas!.height / dpr;

      const scale = (canvasW * 0.75) / img.naturalWidth;
      const offsetX = (canvasW - img.naturalWidth * scale) / 2;
      const offsetY = (canvasH - img.naturalHeight * scale) / 2 - canvasH * 0.05;

      const isTablet = window.innerWidth < 1024;
      const step = isTablet ? 4 : 3;

      dots = [];
      let sumX = 0;
      let sumY = 0;
      let centerCount = 0;

      for (let gy = 0; gy < img.naturalHeight; gy += step) {
        for (let gx = 0; gx < img.naturalWidth; gx += step) {
          const pixelIndex = (gy * img.naturalWidth + gx) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
          const a = data[pixelIndex + 3];

          // Support both RGBA (alpha-based) and RGB (brightness-based) images.
          // For RGB with no transparency, use pixel brightness as the signal.
          // For RGBA with transparent bg, use alpha.
          const brightness = (r + g + b) / 3;
          const signal = a < 250 ? a : brightness; // if fully opaque, use brightness

          if (signal > 30) {
            const norm = signal / 255;
            const targetX = gx * scale + offsetX;
            const targetY = gy * scale + offsetY;

            // Track center area for spark position
            const relX = gx / img.naturalWidth;
            if (relX > 0.4 && relX < 0.6) {
              sumX += targetX;
              sumY += targetY;
              centerCount++;
            }

            dots.push({
              tx: targetX,
              ty: targetY,
              x: targetX + (Math.random() - 0.5) * canvasW * 0.8,
              y: targetY + (Math.random() - 0.5) * canvasH * 0.8,
              sx: targetX + (Math.random() - 0.5) * canvasW * 0.8,
              sy: targetY + (Math.random() - 0.5) * canvasH * 0.8,
              radius: 0.8 + norm * 1.7,
              baseOpacity: 0.15 + norm * 0.55,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      // Spark position at center gap between hands
      if (centerCount > 0) {
        sparkX = sumX / centerCount;
        sparkY = sumY / centerCount;
      } else {
        sparkX = canvasW / 2;
        sparkY = canvasH / 2;
      }
    }

    function draw(now: number) {
      if (!isVisible) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      const canvasW = canvas!.width / dpr;
      const canvasH = canvas!.height / dpr;
      ctx!.clearRect(0, 0, canvasW, canvasH);

      const elapsed = now - assemblyStart;
      const assemblyElapsed = elapsed - ASSEMBLY_DELAY;
      const assemblyT = Math.max(0, Math.min(1, assemblyElapsed / ASSEMBLY_DURATION));
      const easedT = easeOutCubic(assemblyT);

      const breathTime = now / 1000;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Assembly interpolation
        if (assemblyT < 1) {
          d.x = d.sx + (d.tx - d.sx) * easedT;
          d.y = d.sy + (d.ty - d.sy) * easedT;
        } else {
          // Breathing oscillation
          const breathX = Math.sin(breathTime * 0.8 + d.phase) * 1.5;
          const breathY = Math.cos(breathTime * 0.6 + d.phase * 1.3) * 1.5;
          d.x = d.tx + breathX;
          d.y = d.ty + breathY;
        }

        const breathOpacity = assemblyT >= 1
          ? d.baseOpacity + Math.sin(breathTime * 0.5 + d.phase) * 0.08
          : d.baseOpacity * easedT;

        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(6, 182, 212, ${Math.max(0, breathOpacity)})`;
        ctx!.fill();
      }

      // Fingertip spark (only after assembly completes)
      if (assemblyT >= 1) {
        const sparkPhase = (now % 3000) / 3000;
        const sparkOpacity = 0.12 + Math.sin(sparkPhase * Math.PI * 2) * 0.08;
        const sparkRadius = 20 + Math.sin(sparkPhase * Math.PI * 2) * 8;

        const gradient = ctx!.createRadialGradient(
          sparkX, sparkY, 0,
          sparkX, sparkY, sparkRadius
        );
        gradient.addColorStop(0, `rgba(103, 232, 249, ${sparkOpacity})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${sparkOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx!.beginPath();
        ctx!.arc(sparkX, sparkY, sparkRadius, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Load image and start
    const img = new Image();
    img.onload = () => {
      resize();
      sampleImage(img);
      assemblyStart = performance.now();
      animationId = requestAnimationFrame(draw);
    };
    img.onerror = () => {
      // Silent fail — no image, no effect
    };
    img.src = '/adam-hands.png';

    // Handle resize
    let resizeTimeout: number;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (window.innerWidth < 768) {
          cancelAnimationFrame(animationId);
          return;
        }
        resize();
        if (img.complete && img.naturalWidth > 0) {
          sampleImage(img);
        }
      }, 200);
    });
  }
}
