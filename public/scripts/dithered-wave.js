/** Bayer 8×8 dithered wave — adapted from legencymedia.com footer closer */
function hexToRgb01(hex) {
  let t = hex.trim().replace(/^#/, '');
  if (t.length === 3) t = t.replace(/./g, (c) => c + c);
  const n = parseInt(t, 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

function initDitheredWave(section, canvas) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
  if (!gl) return null;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compile = (type, src) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };

  const vs = compile(gl.VERTEX_SHADER, `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`);

  const fs = compile(gl.FRAGMENT_SHADER, `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_ripple;
uniform float u_pxSize;
uniform vec3 u_bg;
uniform vec3 u_fg;
out vec4 fragColor;
const float BAYER[64] = float[64](
   0.0,48.0,12.0,60.0, 3.0,51.0,15.0,63.0,
  32.0,16.0,44.0,28.0,35.0,19.0,47.0,31.0,
   8.0,56.0, 4.0,52.0,11.0,59.0, 7.0,55.0,
  40.0,24.0,36.0,20.0,43.0,27.0,39.0,23.0,
   2.0,50.0,14.0,62.0, 1.0,49.0,13.0,61.0,
  34.0,18.0,46.0,30.0,33.0,17.0,45.0,29.0,
  10.0,58.0, 6.0,54.0, 9.0,57.0, 5.0,53.0,
  42.0,26.0,38.0,22.0,41.0,25.0,37.0,21.0
);
float bayer8(vec2 cell) {
  int x = int(mod(cell.x, 8.0));
  int y = int(mod(cell.y, 8.0));
  return BAYER[y * 8 + x] / 64.0;
}
float waveField(vec2 p, float t) {
  float w = sin(p.x * 3.0 + t * 1.15);
  w += sin(p.x * 1.7 - p.y * 2.3 + t * 0.9);
  w += 0.75 * sin(p.y * 4.0 + p.x * 1.1 - t * 1.7);
  w += 0.55 * sin((p.x + p.y) * 2.4 + t * 0.5);
  return w * 0.28;
}
void main() {
  vec2 res = u_resolution;
  float px = max(u_pxSize, 1.0);
  vec2 cell = floor(gl_FragCoord.xy / px);
  vec2 cellPx = cell * px + 0.5 * px;
  vec2 uv = (cellPx - 0.5 * res) / res.y;
  float w = waveField(uv, u_time);
  vec2 m = (u_pointer - 0.5 * res) / res.y;
  float d = length(uv - m);
  w += u_ripple * 0.6 * sin(d * 16.0 - u_time * 3.2) * exp(-d * 2.2);
  float r = length(uv * vec2(0.85, 1.0));
  float glow = smoothstep(0.66, 0.0, r + 0.12 * w);
  float intensity = clamp(mix(glow, 0.5 + 0.5 * w, 0.3) * 0.85 - 0.12, 0.0, 1.0);
  float bit = step(bayer8(cell), intensity);
  fragColor = vec4(mix(u_bg, u_fg, bit), 1.0);
}`);

  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (name) => gl.getUniformLocation(prog, name);
  const uRes = u('u_resolution');
  const uTime = u('u_time');
  const uPtr = u('u_pointer');
  const uRip = u('u_ripple');
  const uPx = u('u_pxSize');
  gl.uniform3fv(u('u_bg'), hexToRgb01('#000000'));
  gl.uniform3fv(u('u_fg'), hexToRgb01('#005d7c'));

  let dpr = 1;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uPx, 4 * dpr);
    }
  };
  window.addEventListener('resize', resize);
  resize();

  const pointer = { x: canvas.width / 2, y: canvas.height / 2 };
  const target = { ...pointer };
  let ripple = 0;
  const onMove = (e) => {
    const rect = section.getBoundingClientRect();
    target.x = (e.clientX - rect.left) * dpr;
    target.y = (rect.height - (e.clientY - rect.top)) * dpr;
    ripple = 1;
  };
  const onLeave = () => { ripple = 0; };
  if (!reduced) {
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
  }

  let raf = 0;
  let visible = true;
  const t0 = performance.now();

  const frame = (now) => {
    if (!visible) return;
    const t = (now - t0) * 0.001;
    pointer.x += (target.x - pointer.x) * 0.12;
    pointer.y += (target.y - pointer.y) * 0.12;
    ripple += (0 - ripple) * 0.06;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uPtr, pointer.x, pointer.y);
    gl.uniform1f(uRip, ripple);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (!reduced || ripple > 0.01) raf = requestAnimationFrame(frame);
  };

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
    else if (!visible) cancelAnimationFrame(raf), (raf = 0);
  });
  io.observe(section);

  if (reduced) {
    gl.uniform1f(uTime, 2);
    gl.uniform2f(uPtr, canvas.width / 2, canvas.height / 2);
    gl.uniform1f(uRip, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  } else {
    raf = requestAnimationFrame(frame);
  }

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener('resize', resize);
    if (!reduced) {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    }
  };
}

const canvas = document.querySelector('[data-dithered-wave]');
const section = canvas?.closest('.closer');
if (canvas && section) {
  initDitheredWave(section, canvas);
  canvas.classList.add('is-live');
}
