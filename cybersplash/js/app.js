/* ══════════════════════════════════════════
   CYBER SPLASH · app.js
   Navigation, particles, animations
══════════════════════════════════════════ */
'use strict';

/* ── Scroll progress & navbar shadow ── */
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100 || 0;
  const bar = document.getElementById('scroll-bar');
  if (bar) bar.style.width = pct + '%';
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Page navigation ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  const target = document.getElementById('page-' + id);
  if (!target) return;
  target.style.display = 'block';
  void target.offsetWidth;
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
  const menu = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');
  if (menu) menu.classList.remove('open');
  if (toggle) toggle.classList.remove('open');
  setTimeout(triggerReveal, 90);
}

/* Delegated navigation clicks */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el) { e.preventDefault(); showPage(el.dataset.page); }
});

/* ── Mobile menu toggle ── */
const navToggle = document.getElementById('nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    document.getElementById('nav-menu').classList.toggle('open');
  });
}

/* ── Scroll-triggered reveal ── */
let revealObserver;
function triggerReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.remove('revealed');
    revealObserver.observe(el);
  });
}

/* ── 3D card tilt ── */
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.round-card').forEach(card => {
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / r.width;
    const dy = (e.clientY - r.top  - r.height / 2) / r.height;
    if (Math.abs(dx) < 1.2 && Math.abs(dy) < 1.2) {
      card.style.transform = `translateY(-6px) perspective(700px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) scale(1.02)`;
    } else {
      card.style.transform = '';
    }
  });
});

/* ── Particle system ── */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const COLORS = ['rgba(0,215,255,', 'rgba(182,0,255,', 'rgba(255,32,112,'];
  const N = Math.min(90, Math.floor(W * H / 14000));
  const pts = Array.from({ length: N }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 1.8 + 0.4,
    col: COLORS[Math.floor(Math.random() * COLORS.length)],
    op: Math.random() * 0.5 + 0.1,
    phase: Math.random() * Math.PI * 2,
  }));

  let mx = W / 2, my = H / 2;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 125) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,215,255,${(1 - d / 125) * 0.11})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    // particles
    pts.forEach(p => {
      p.phase += 0.018;
      const op = p.op * (0.7 + 0.3 * Math.sin(p.phase));
      const dx = p.x - mx, dy = p.y - my;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 90) { p.vx += (dx / d) * 0.045; p.vy += (dy / d) * 0.045; }
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.shadowBlur = 7;
      ctx.shadowColor = p.col + '0.8)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + op + ')';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── Contact form → mailto ── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = this.name.value.trim();
    const replyto = this.replyto.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();
    const body    = `Name: ${name}\nReply-to: ${replyto}\n\n${message}`;
    window.location.href =
      `mailto:cybersonicrangers@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const btn = form.querySelector('.btn-submit span');
    const msg = document.getElementById('form-msg');
    if (btn) btn.textContent = 'Opening…';
    setTimeout(() => {
      if (btn) btn.textContent = 'Send Message';
      if (msg) {
        msg.className = 'ok';
        msg.textContent = '✓ Mail client opened — hit Send there to deliver your message.';
      }
      this.reset();
    }, 700);
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  initParticles();
  initForm();
});
