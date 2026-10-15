import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGlobe } from './globe.js';

gsap.registerPlugin(ScrollTrigger);

const MOTION = {
  quick: 0.2,
  moderate: 0.28,
  gentle: 0.48,
  reveal: 0.96,
};

const EASE = {
  entrance: 'power2.out',
  emphasized: 'power4.out',
};

const body = document.body;
const progressEl = document.querySelector('.scroll-progress-value');
const logoDots = document.querySelectorAll('.logo-dots span');
const methodSlides = [...document.querySelectorAll('.method-slide')];
const methodTrack = document.querySelector('[data-method-track]');
const cookieBanner = document.querySelector('.cookie-banner');
const reviewsTrack = document.querySelector('.reviews-track');

let globe = null;

function init() {
  const canvas = document.getElementById('globe-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    globe = initGlobe(canvas);
  }

  duplicateReviews();
  setupScrollProgress();
  setupThemeSwitch();
  setupMethodScroll();
  setupHeroReveal();
  setupMetricsReveal();
  setupStackReveal();
  setupCookieBanner();
  setupHeaderDots();
}

function duplicateReviews() {
  if (!reviewsTrack) return;
  reviewsTrack.innerHTML += reviewsTrack.innerHTML;
}

function setupScrollProgress() {
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const pct = Math.round(self.progress * 100);
      if (progressEl) {
        progressEl.textContent = `${String(pct).padStart(3, '0')}%`;
      }
    },
  });
}

function setupThemeSwitch() {
  const lightSections = ['.method-intro', '.method-track', '.contact-section'];

  lightSections.forEach((selector) => {
    ScrollTrigger.create({
      trigger: selector,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => body.classList.add('theme-light-active'),
      onEnterBack: () => body.classList.add('theme-light-active'),
      onLeave: () => body.classList.remove('theme-light-active'),
      onLeaveBack: () => body.classList.remove('theme-light-active'),
    });
  });
}

function setupMethodScroll() {
  if (!methodTrack || methodSlides.length === 0) return;

  const total = methodSlides.length;

  ScrollTrigger.create({
    trigger: methodTrack,
    start: 'top top',
    end: 'bottom bottom',
    pin: '.method-sticky',
    anticipatePin: 1,
    onUpdate: (self) => {
      const index = Math.min(total - 1, Math.floor(self.progress * total));
      methodSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      logoDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      body.classList.toggle('theme-light-active', index < total - 1);
    },
  });

  methodSlides.forEach((slide, index) => {
    gsap.fromTo(
      slide.querySelector('.method-slide-content'),
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: MOTION.gentle,
        ease: EASE.entrance,
        scrollTrigger: {
          trigger: methodTrack,
          start: () => `top+=${(index / total) * 100}% top`,
          end: () => `top+=${((index + 0.15) / total) * 100}% top`,
          toggleActions: 'play none none reverse',
        },
      },
    );
  });
}

function setupHeroReveal() {
  const tl = gsap.timeline({ defaults: { ease: EASE.emphasized } });

  tl.from('.header-pill', { y: -16, opacity: 0, duration: MOTION.gentle }, 0)
    .from('.hero-eyebrow', { y: 12, opacity: 0, duration: MOTION.moderate }, 0.1)
    .from('.hero-title', { y: 24, opacity: 0, duration: MOTION.reveal }, 0.15)
    .from('.hero-sub', { y: 16, opacity: 0, duration: MOTION.gentle }, 0.3)
    .from('.logo-marquee', { y: 16, opacity: 0, duration: MOTION.gentle }, 0.45);
}

function setupMetricsReveal() {
  const section = document.querySelector('[data-metrics-section]');
  if (!section) return;

  gsap.from('.metric-item', {
    y: 24,
    opacity: 0,
    duration: MOTION.gentle,
    ease: EASE.entrance,
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

function setupStackReveal() {
  const section = document.querySelector('.stack-section');
  if (!section) return;

  gsap.from('.stack-heading, .stack-sub', {
    y: 20,
    opacity: 0,
    duration: MOTION.gentle,
    ease: EASE.entrance,
    stagger: 0.08,
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.stack-card', {
    y: 28,
    opacity: 0,
    duration: MOTION.gentle,
    ease: EASE.entrance,
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.stack-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

function setupCookieBanner() {
  if (!cookieBanner) return;

  const accepted = localStorage.getItem('cookie-consent');
  if (accepted) {
    cookieBanner.classList.add('hidden');
    return;
  }

  cookieBanner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    cookieBanner.classList.add('hidden');
  });

  cookieBanner.querySelector('.cookie-reject')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'rejected');
    cookieBanner.classList.add('hidden');
  });
}

function setupHeaderDots() {
  ScrollTrigger.create({
    trigger: document.querySelector('.hero-section'),
    start: 'top top',
    end: 'bottom top',
    onEnter: () => setActiveDot(0),
    onLeaveBack: () => setActiveDot(0),
  });
}

function setActiveDot(index) {
  logoDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('beforeunload', () => globe?.destroy());
