(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  for (const root of document.querySelectorAll('[data-animated-logo]')) {
    if (root.dataset.motionReady) continue;
    root.dataset.motionReady = 'true';
    const link = root.closest('a');
    if (!link) continue;
    const pixels = [...root.querySelectorAll('[data-logo-pixel]')];
    const hat = root.querySelector('[data-logo-hat]');
    const cx = 28.3774, cy = 28.52005;
    let angle = 0, radius = 1, frame = 0, phase = 'idle', started = 0, last = 0;
    let startRadius = 1, startAngle = 0, endAngle = 0, hovering = false, focused = false;
    const ease = t => 1 - (1 - t) ** 3;
    const transform = (x, y) => `translate(${cx} ${cy}) rotate(${angle}) translate(${-cx} ${-cy}) translate(${(x-cx)*(radius-1)} ${(y-cy)*(radius-1)})`;
    const draw = () => {
      for (const pixel of pixels) pixel.setAttribute('transform', transform(+pixel.dataset.cx, +pixel.dataset.cy));
      // Keep the seasonal hat anchored above the mark, clear of the wordmark.
    };
    const reset = () => {
      cancelAnimationFrame(frame); frame = 0; phase = 'idle'; angle = 0; radius = 1;
      for (const pixel of pixels) pixel.removeAttribute('transform');
      hat?.removeAttribute('transform'); root.dataset.motionPhase = 'idle';
    };
    const tick = now => {
      const dt = Math.min((now-last)/1000, .05); last = now;
      const elapsed = now-started;
      if (phase === 'enter') {
        radius = startRadius + (1.12-startRadius)*ease(Math.min(elapsed/300,1));
        // Quick initial orbit decelerates continuously to 24 degrees per second.
        angle += (24 + 696*Math.exp(-elapsed/230))*dt;
        root.dataset.motionPhase = elapsed < 1000 ? 'accelerated' : 'slow';
      } else {
        const t = Math.min(elapsed/650,1);
        radius = elapsed < 150
          ? startRadius + .10*ease(elapsed/150)
          : startRadius + .10 + (1-startRadius-.10)*ease(Math.min((elapsed-150)/500,1));
        angle = startAngle + (endAngle-startAngle)*ease(t);
        if (t === 1) { reset(); return; }
      }
      draw(); frame = requestAnimationFrame(tick);
    };
    const update = () => {
      if (reduced.matches || document.hidden) { reset(); return; }
      const active = (hovering && fine.matches) || focused;
      if (active && phase !== 'enter') {
        cancelAnimationFrame(frame); phase='enter'; started=last=performance.now(); startRadius=radius;
        root.dataset.motionPhase='accelerated'; frame=requestAnimationFrame(tick);
      } else if (!active && phase === 'enter') {
        cancelAnimationFrame(frame); phase='exit'; started=last=performance.now(); startRadius=radius;
        startAngle=angle; endAngle=Math.ceil(angle/360)*360;
        root.dataset.motionPhase='exit'; frame=requestAnimationFrame(tick);
      }
    };
    link.addEventListener('pointerenter', e => { if(e.pointerType === 'mouse' || e.pointerType === 'pen') { hovering=true;update(); } });
    link.addEventListener('pointerleave', () => { hovering=false;update(); });
    link.addEventListener('focus', () => { focused=link.matches(':focus-visible');update(); });
    link.addEventListener('blur', () => { focused=false;update(); });
    reduced.addEventListener('change', update); fine.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    root.dataset.motionPhase='idle';
  }
})();
