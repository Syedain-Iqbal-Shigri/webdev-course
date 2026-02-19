// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .module, .stack-item, .project-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// ── Sticky Nav ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Animated Counters ──
const counters = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 1600;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// ── Scroll Reveal ──
const revealEls = document.querySelectorAll(
  '.module, .stack-item, .project-card, .section-header, .cta-inner'
);

revealEls.forEach(el => el.classList.add('reveal'));

let countersTriggered = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Counter observer (trigger when hero stats visible)
const heroStats = document.querySelector('.hero-stats');
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersTriggered) {
    countersTriggered = true;
    counters.forEach(animateCounter);
  }
}, { threshold: 0.5 });
if (heroStats) counterObserver.observe(heroStats);

// ── Smooth Scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Module reveal with stagger ──
const moduleObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.06}s`;
      entry.target.classList.add('visible');
      moduleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.module').forEach(m => {
  m.classList.add('reveal');
  moduleObserver.observe(m);
});

// ── Console Easter Egg ──
console.log(`%c
██╗    ██╗███████╗██████╗ ██████╗ ███████╗██╗   ██╗
██║    ██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║   ██║
██║ █╗ ██║█████╗  ██████╔╝██║  ██║█████╗  ██║   ██║
██║███╗██║██╔══╝  ██╔══██╗██║  ██║██╔══╝  ╚██╗ ██╔╝
╚███╔███╔╝███████╗██████╔╝██████╔╝███████╗ ╚████╔╝
 ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═════╝ ╚══════╝  ╚═══╝
`, 'color: #d4f244; font-family: monospace;');

console.log('%c👋 Hey, curious developer! The source is all yours.', 'color: #6b6860; font-size: 13px;');
