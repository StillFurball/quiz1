/**
 * bg.js — Animated neural-network / connected-dots background
 * Mimics the particle background seen on many modern portfolio sites.
 */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  // ── Config ──────────────────────────────────────────────
  const CONFIG = {
    particleCount: 80,       // number of dots
    dotRadius: 3,            // dot size (px)
    dotColor: '#9baab8',     // dot color
    lineColor: '#9baab8',    // line color
    maxDist: 140,            // max distance to draw a line (px)
    speed: 0.5,              // movement speed
    mouseInfluence: 120,     // radius around mouse that attracts nearby dots
  };

  let W, H, particles, mouse = { x: null, y: null };

  // ── Resize ───────────────────────────────────────────────
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // ── Particle factory ─────────────────────────────────────
  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.particleCount }, createParticle);
  }

  // ── Draw one frame ────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.dotColor;
      ctx.fill();
    }

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDist) {
          const alpha = 1 - dist / CONFIG.maxDist;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = hexToRgba(CONFIG.lineColor, alpha * 0.55);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw line to mouse if nearby
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseInfluence) {
          const alpha = 1 - dist / CONFIG.mouseInfluence;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = hexToRgba('#4a6fa5', alpha * 0.7);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  // ── Helper: hex → rgba string ────────────────────────────
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // ── Events ────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    resize();
    // Re-clamp particles that are now out of bounds
    for (const p of particles) {
      p.x = Math.min(p.x, W);
      p.y = Math.min(p.y, H);
    }
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // ── Start ─────────────────────────────────────────────────
  init();
  draw();
})();