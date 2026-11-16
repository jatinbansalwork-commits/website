// Stats count-up on scroll
(function () {
  const root = document.querySelector('[data-stats]');
  if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...root.querySelectorAll('[data-count]')];
  const fmt = (el, n) => `${el.dataset.prefix ?? ''}${n}${el.dataset.suffix ?? ''}`;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1200);
      const eased = 1 - (1 - p) ** 3;
      els.forEach((el) => {
        el.textContent = fmt(el, Math.round(Number(el.dataset.count) * eased));
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.15 });
  io.observe(root);
})();

// Testimonials slider
(function () {
  for (const wrap of document.querySelectorAll('[data-client-slider]')) {
    const track = wrap.querySelector('.testimonials__track');
    const slides = [...wrap.querySelectorAll('.testimonials__slide')];
    const pos = wrap.querySelector('.testimonials__position');
    const prev = wrap.querySelector('[data-slide-prev]');
    const next = wrap.querySelector('[data-slide-next]');
    let i = 0;
    const sync = () => {
      pos.textContent = `${i + 1} / ${slides.length}`;
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    };
    const go = (d) => {
      i = Math.max(0, Math.min(slides.length - 1, i + d));
      const left = track.getBoundingClientRect().left;
      const target = slides[i].getBoundingClientRect().left;
      track.scrollTo({ left: track.scrollLeft + target - left, behavior: 'smooth' });
      sync();
    };
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    sync();
  }
})();
