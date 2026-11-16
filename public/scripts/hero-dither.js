/** Hero glass background — 2D Bayer dither glow (lighter stand-in for WebGL glass mark) */
const BAYER_8 = [
  0, 48, 12, 60, 3, 51, 15, 63,
  32, 16, 44, 28, 35, 19, 47, 31,
  8, 56, 4, 52, 11, 59, 7, 55,
  40, 24, 36, 20, 43, 27, 39, 23,
  2, 50, 14, 62, 1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29,
  10, 58, 6, 54, 9, 57, 5, 53,
  42, 26, 38, 22, 41, 25, 37, 21,
].map((v) => v / 64);

function initHeroDither(canvas, host) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const FG = [0, 93, 124];
  const BG = [2, 3, 5];
  const cell = 4;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let pointer = { x: 0.5, y: 0.5 };
  let ripple = 0;

  const resize = () => {
    const rect = host.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  };

  const intensityAt = (nx, ny, t) => {
    const wave =
      Math.sin(nx * 3 + t * 1.1) * 0.25 +
      Math.sin(ny * 4 - nx * 2 + t * 0.85) * 0.2 +
      Math.sin((nx + ny) * 2.2 + t * 0.45) * 0.15;
    const dx = nx - pointer.x;
    const dy = ny - pointer.y;
    const d = Math.hypot(dx, dy);
    const rippleAmt = ripple * 0.35 * Math.sin(d * 18 - t * 3) * Math.exp(-d * 2.5);
    const r = Math.hypot((nx - 0.55) * 0.9, ny - 0.45);
    const glow = Math.max(0, 1 - r / 0.55);
    return Math.min(1, Math.max(0, glow * 0.75 + wave + rippleAmt + 0.08));
  };

  const draw = (t) => {
    const img = ctx.createImageData(canvas.width, canvas.height);
    const data = img.data;
    const cols = Math.ceil(canvas.width / cell);
    const rows = Math.ceil(canvas.height / cell);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * cell + cell / 2;
        const cy = row * cell + cell / 2;
        const nx = cx / canvas.width;
        const ny = 1 - cy / canvas.height;
        const thr = BAYER_8[(row % 8) * 8 + (col % 8)];
        const on = intensityAt(nx, ny, t) > thr;
        const rgb = on ? FG : BG;
        for (let py = 0; py < cell; py++) {
          for (let px = 0; px < cell; px++) {
            const x = col * cell + px;
            const y = row * cell + py;
            if (x >= canvas.width || y >= canvas.height) continue;
            const i = (y * canvas.width + x) * 4;
            data[i] = rgb[0];
            data[i + 1] = rgb[1];
            data[i + 2] = rgb[2];
            data[i + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  };

  resize();
  new ResizeObserver(resize).observe(host);

  if (!reduced) {
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = 1 - (e.clientY - r.top) / r.height;
      ripple = 1;
    });
    host.addEventListener('pointerleave', () => {
      ripple = 0;
    });
  }

  let raf = 0;
  let visible = false;
  const t0 = performance.now();

  const loop = (now) => {
    if (!visible) return;
    const t = (now - t0) * 0.001;
    ripple *= 0.94;
    draw(reduced ? 1.2 : t);
    raf = requestAnimationFrame(loop);
  };

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
    else if (!visible) cancelAnimationFrame(raf), (raf = 0);
  }, { rootMargin: '100px' });
  io.observe(canvas);

  canvas.classList.add('is-ready');
}

for (const canvas of document.querySelectorAll('[data-hero-dither]')) {
  const host = canvas.closest('[data-hero-dither-host]') || canvas.parentElement;
  if (host) initHeroDither(canvas, host);
}
