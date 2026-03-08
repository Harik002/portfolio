/* ═══════════════════════════════════════════
   HARI K — CYBERSECURITY PORTFOLIO
   script.js
═══════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. ANIMATED CANVAS BACKGROUND
────────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], connections = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5
        ? `rgba(0, 255, 136, ${this.alpha})`
        : `rgba(0, 212, 255, ${this.alpha * 0.6})`;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor((W * H) / 18000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
  window.addEventListener('resize', () => { resize(); initParticles(); });
})();


/* ──────────────────────────────────────────
   2. TYPED TEXT EFFECT
────────────────────────────────────────── */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = [
    'Cybersecurity Student',
    'SOC Analyst (Learning)',
    'Ethical Hacker',
    'Penetration Tester',
    'Network Security Enthusiast'
  ];
  let stringIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = strings[stringIndex];
    const displayed = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    el.textContent = displayed;

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex > current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1000);
})();


/* ──────────────────────────────────────────
   3. NAVBAR — SCROLL BEHAVIOR & HAMBURGER
────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
})();


/* ──────────────────────────────────────────
   4. SCROLL REVEAL ANIMATIONS
────────────────────────────────────────── */
(function initReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => observer.observe(el));
})();


/* ──────────────────────────────────────────
   5. SKILL BAR ANIMATION
────────────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 300);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ──────────────────────────────────────────
   6. COUNTER ANIMATION
────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current;
        }, 50);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* ──────────────────────────────────────────
   7. CONTACT FORM HANDLER
────────────────────────────────────────── */
function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn = form.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.innerHTML = '<i class="ph ph-circle-notch" style="animation: spin 1s linear infinite;"></i> Transmitting...';

  // Simulate sending
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'flex';
  }, 1500);
}

// Spin animation for loader
const style = document.createElement('style');
style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(style);


/* ──────────────────────────────────────────
   8. SCROLL TO TOP
────────────────────────────────────────── */
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ──────────────────────────────────────────
   9. SMOOTH SCROLL FOR NAV LINKS
────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ──────────────────────────────────────────
   10. CURSOR GLOW EFFECT (desktop only)
────────────────────────────────────────── */
(function initCursorGlow() {
  if (window.innerWidth < 768) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
})();


/* ──────────────────────────────────────────
   11. PROJECT CARD TILT EFFECT
────────────────────────────────────────── */
(function initTilt() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ──────────────────────────────────────────
   12. TERMINAL TYPING EFFECT (About section)
────────────────────────────────────────── */
(function initTerminalTyping() {
  const outputLines = document.querySelectorAll('.t-output');
  let revealed = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !revealed) {
        revealed = true;
        outputLines.forEach((line, i) => {
          const text = line.textContent;
          line.textContent = '';
          setTimeout(() => {
            let c = 0;
            const interval = setInterval(() => {
              line.textContent += text[c++];
              if (c >= text.length) clearInterval(interval);
            }, 35);
          }, i * 600);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const terminal = document.querySelector('.about-terminal');
  if (terminal) observer.observe(terminal);
})();


/* ──────────────────────────────────────────
   13. GLITCH EFFECT ON HERO NAME (subtle)
────────────────────────────────────────── */
(function initGlitch() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;

  function glitch() {
    nameEl.style.textShadow = `
      2px 0 rgba(0,255,136,0.4),
      -2px 0 rgba(0,212,255,0.4)
    `;
    setTimeout(() => {
      nameEl.style.textShadow = '';
    }, 100);
  }

  // Random glitch every 4-8 seconds
  function scheduleGlitch() {
    const delay = 4000 + Math.random() * 4000;
    setTimeout(() => { glitch(); scheduleGlitch(); }, delay);
  }
  setTimeout(scheduleGlitch, 3000);
})();


/* ──────────────────────────────────────────
   14. INIT — on DOMContentLoaded
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Trigger hero reveal immediately
  document.querySelectorAll('#hero .reveal-up, #hero .reveal-right').forEach(el => {
    setTimeout(() => el.classList.add('revealed'), 200);
  });
});
