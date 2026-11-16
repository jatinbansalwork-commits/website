// Testimonials carousel (from Legency home.js)
(function () {
  for (const wrap of document.querySelectorAll('[data-client-slider]')) {
    const track = wrap.querySelector('.testimonials__track');
    const slides = [...wrap.querySelectorAll('.testimonials__slide')];
    const pos = wrap.querySelector('.testimonials__position');
    const prev = wrap.querySelector('[data-slide-prev]');
    const next = wrap.querySelector('[data-slide-next]');
  if (!track || slides.length === 0 || !pos || !prev || !next) continue;

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
