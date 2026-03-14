/* ============================================================
   ROOPESH RAO S — Portfolio JavaScript
   File: js/main.js
   ============================================================ */

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '20px';
    cursor.style.height     = '20px';
    cursor.style.background = 'var(--accent4)';
    ring.style.width        = '52px';
    ring.style.height       = '52px';
    ring.style.borderColor  = 'var(--accent4)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '12px';
    cursor.style.height     = '12px';
    cursor.style.background = 'var(--accent2)';
    ring.style.width        = '36px';
    ring.style.height       = '36px';
    ring.style.borderColor  = 'rgba(167,139,250,0.5)';
  });
});

/* ── Animated Canvas Background (grid + floating dots) ── */
const canvas = document.getElementById('canvas-bg');
const ctx    = canvas.getContext('2d');
let W, H;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const dots = Array.from({ length: 70 }, () => ({
  x:  Math.random() * 3000,
  y:  Math.random() * 3000,
  r:  Math.random() * 1.8 + 0.2,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  a:  Math.random() * Math.PI * 2,
}));

function drawCanvas() {
  ctx.clearRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = 'rgba(167,139,250,0.035)';
  ctx.lineWidth   = 1;
  const gs = 80;
  for (let x = 0; x < W; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gs) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Moving particles
  dots.forEach(d => {
    d.x += d.vx;
    d.y += d.vy;
    d.a += 0.007;
    if (d.x < 0) d.x = W;
    if (d.x > W) d.x = 0;
    if (d.y < 0) d.y = H;
    if (d.y > H) d.y = 0;
    const alpha = 0.2 + Math.sin(d.a) * 0.15;
    ctx.beginPath();
    ctx.arc(d.x % W, d.y % H, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(167,139,250,${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawCanvas);
}
drawCanvas();

/* ── Floating Hero Particles ── */
const pc    = document.getElementById('particles');
const pcols = [
  'rgba(167,139,250,0.6)',
  'rgba(6,182,212,0.5)',
  'rgba(244,114,182,0.5)',
  'rgba(124,58,237,0.4)',
];

for (let i = 0; i < 30; i++) {
  const p   = document.createElement('div');
  p.classList.add('particle');
  const sz  = Math.random() * 5 + 1;
  const dur = Math.random() * 14 + 8;
  const del = Math.random() * 12;
  const dx  = (Math.random() - 0.5) * 300;
  p.style.cssText = `width:${sz}px;height:${sz}px;background:${pcols[i % 4]};left:${Math.random() * 100}%;bottom:0;animation-duration:${dur}s;animation-delay:-${del}s;--dx:${dx}px`;
  pc.appendChild(p);
}

/* ── Typewriter Effect ── */
const phrases = [
  'Senior Software Engineer',
  'Kony Infinity Expert',
  'Banking App Developer',
  'Full-Stack Engineer',
  'Technical Consultant',
  'Fintech Enthusiast',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  if (!deleting) {
    if (ci < phrases[pi].length) {
      tw.textContent = phrases[pi].slice(0, ++ci);
      setTimeout(type, 65);
    } else {
      deleting = true;
      setTimeout(type, 2500);
    }
  } else {
    if (ci > 0) {
      tw.textContent = phrases[pi].slice(0, --ci);
      setTimeout(type, 28);
    } else {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(type, 300);
    }
  }
}
setTimeout(type, 1200);

/* ── Animated Stat Counters ── */
function animCount(el, target, suffix, dur) {
  dur = dur || 2000;
  const start = Date.now();
  (function tick() {
    const progress = Math.min((Date.now() - start) / dur, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  })();
}

setTimeout(() => {
  animCount(document.getElementById('count1'), 4, '+');
  animCount(document.getElementById('count2'), 3, '');
  animCount(document.getElementById('count3'), 2, '');
}, 1000);

/* ── Scroll Reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 0.07 + 's';
  revealObserver.observe(el);
});