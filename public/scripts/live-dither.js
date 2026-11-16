/** Ordered dither on images — matches live-dither visuals in the dark band */
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

function mountLiveDither(wrap) {
  const src = wrap.getAttribute('data-live-dither');
  if (!src) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'live-dither__canvas';
  wrap.appendChild(canvas);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.decoding = 'async';

  img.onload = () => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paint = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      const off = document.createElement('canvas');
      off.width = canvas.width;
      off.height = canvas.height;
      const octx = off.getContext('2d');
      const ir = img.width / img.height;
      const cr = w / h;
      let dw, dh, dx, dy;
      if (ir > cr) {
        dh = off.height;
        dw = dh * ir;
        dx = (off.width - dw) / 2;
        dy = 0;
      } else {
        dw = off.width;
        dh = dw / ir;
        dx = 0;
        dy = (off.height - dh) / 2;
      }
      octx.drawImage(img, dx, dy, dw, dh);
      const { data, width, height } = octx.getImageData(0, 0, off.width, off.height);
      const out = ctx.createImageData(width, height);
      const cell = 3;
      const FG = [0, 93, 124];
      const BG = [0, 0, 0];

      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          let lum = 0;
          let n = 0;
          for (let py = 0; py < cell; py++) {
            for (let px = 0; px < cell; px++) {
              const sx = x + px;
              const sy = y + py;
              if (sx >= width || sy >= height) continue;
              const i = (sy * width + sx) * 4;
              lum += data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
              n++;
            }
          }
          lum = (lum / n) / 255;
          const thr = BAYER_8[(Math.floor(y / cell) % 8) * 8 + (Math.floor(x / cell) % 8)];
          const on = lum > thr;
          const rgb = on ? FG : BG;
          for (let py = 0; py < cell; py++) {
            for (let px = 0; px < cell; px++) {
              const sx = x + px;
              const sy = y + py;
              if (sx >= width || sy >= height) continue;
              const oi = (sy * width + sx) * 4;
              out.data[oi] = rgb[0];
              out.data[oi + 1] = rgb[1];
              out.data[oi + 2] = rgb[2];
              out.data[oi + 3] = 255;
            }
          }
        }
      }
      ctx.putImageData(out, 0, 0);
      canvas.classList.add('is-live');
    };

    paint();
    new ResizeObserver(paint).observe(wrap);
  };

  img.onerror = () => {
    wrap.style.background = 'linear-gradient(135deg, #005d7c 0%, #000 70%)';
  };
  img.src = src;
}

for (const el of document.querySelectorAll('[data-live-dither]')) {
  mountLiveDither(el);
}
