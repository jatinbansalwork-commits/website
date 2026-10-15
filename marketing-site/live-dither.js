/** KlearNow live Bayer dither (WebGL2), adapted for this site. */

const BAYER_GLSL = `
const float BAYER[64] = float[64](
   0.0,48.0,12.0,60.0, 3.0,51.0,15.0,63.0, 32.0,16.0,44.0,28.0,35.0,19.0,47.0,31.0,
   8.0,56.0, 4.0,52.0,11.0,59.0, 7.0,55.0, 40.0,24.0,36.0,20.0,43.0,27.0,39.0,23.0,
   2.0,50.0,14.0,62.0, 1.0,49.0,13.0,61.0, 34.0,18.0,46.0,30.0,33.0,17.0,45.0,29.0,
  10.0,58.0, 6.0,54.0, 9.0,57.0, 5.0,53.0, 42.0,26.0,38.0,22.0,41.0,25.0,37.0,21.0);
float bayer8(vec2 c) { int x = int(mod(c.x, 8.0)); int y = int(mod(c.y, 8.0)); return BAYER[y * 8 + x] / 64.0; }
`;

const VERTEX_SHADER = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform vec2 u_texRes;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_ripple;
uniform float u_px;
uniform vec3 u_ink;
uniform vec3 u_blue;
uniform vec3 u_pale;
uniform float u_light;
out vec4 fragColor;
${BAYER_GLSL}
void main() {
  float px = max(u_px, 1.0);
  vec2 cell = floor(gl_FragCoord.xy / px);
  vec2 p = (cell * px + 0.5 * px);
  vec2 uv = p / u_res;
  float ra = u_res.x / u_res.y, ta = u_texRes.x / u_texRes.y;
  vec2 tuv = uv;
  if (ra > ta) { tuv.y = (uv.y - 0.5) * (ta / ra) + 0.5; }
  else { tuv.x = (uv.x - 0.5) * (ra / ta) + 0.5; }
  vec2 q = (p - 0.5 * u_res) / u_res.y;
  vec2 m = (u_pointer - 0.5 * u_res) / u_res.y;
  float d = length(q - m);
  float wave = u_ripple * 0.6 * sin(d * 16.0 - u_time * 3.2) * exp(-d * 2.2);
  vec2 dir = d > 0.0001 ? (q - m) / d : vec2(0.0);
  tuv += dir * wave * 0.012;
  tuv.y = 1.0 - tuv.y;
  float lum = dot(texture(u_tex, clamp(tuv, 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114));
  float grain = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453) * 0.07;
  if (u_light > 0.5) {
    lum = clamp(pow(lum, 0.9) * 1.28 + 0.035, 0.0, 1.0);
    lum = clamp(lum + wave * 0.18 * smoothstep(0.03, 0.12, lum), 0.0, 1.0);
  } else {
    lum = clamp(lum + wave * 0.18 + grain, 0.0, 1.0);
  }
  float b = bayer8(cell);
  vec3 col = mix(u_ink, u_blue, 1.0 - step(clamp(lum * 2.0, 0.0, 1.0), b));
  col = mix(col, u_pale, 1.0 - step(clamp(lum * 2.0 - 1.0, 0.0, 1.0), b));
  fragColor = vec4(col, 1.0);
}`;

const RIPPLE_REST = 0.28;
const CELL_PX = 4;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[live-dither]", gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

function parseHexColor(hex) {
  const value = hex.trim().replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => c / 255);
}

function mixRgb(a, b, t) {
  return a.map((c, i) => c + (b[i] - c) * t);
}

function readThemeColors() {
  const root = getComputedStyle(document.documentElement);
  const primary = parseHexColor(root.getPropertyValue("--primary").trim() || "#003f5b");
  const bg = parseHexColor(root.getPropertyValue("--bg").trim() || "#fafaf7");
  const brandSoft = parseHexColor(
    root.getPropertyValue("--brand-soft").trim() || "#e6f3f7",
  );
  const brandMid = parseHexColor(
    root.getPropertyValue("--brand-2").trim() || "#007499",
  );
  return { primary, bg, brandSoft, brandMid };
}

function mountLiveDither(el) {
  const src = el.getAttribute("data-live-dither");
  if (!src) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const theme = el.dataset.liveDitherTheme || "";
  const isLight = theme === "light";
  const isIdxBand = theme === "idx-band";
  const { primary, bg, brandSoft, brandMid } = readThemeColors();

  const canvas = document.createElement("canvas");
  canvas.className = "live-dither__canvas";
  canvas.setAttribute("aria-hidden", "true");
  el.appendChild(canvas);

  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
  if (!gl) {
    canvas.remove();
    return;
  }

  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) {
    canvas.remove();
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    canvas.remove();
    return;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uni = (name) => gl.getUniformLocation(program, name);
  gl.uniform3fv(
    uni("u_ink"),
    isLight ? bg : isIdxBand ? [6 / 255, 4 / 255, 21 / 255] : [6 / 255, 6 / 255, 12 / 255],
  );
  gl.uniform3fv(
    uni("u_blue"),
    isLight ? mixRgb(brandSoft, brandMid, 0.42) : primary,
  );
  gl.uniform3fv(uni("u_pale"), isLight ? primary : isIdxBand ? mixRgb(primary, brandSoft, 0.35) : brandSoft);
  gl.uniform1f(uni("u_light"), isLight ? 1 : 0);

  const uRes = uni("u_res");
  const uTexRes = uni("u_texRes");
  const uTime = uni("u_time");
  const uPointer = uni("u_pointer");
  const uRipple = uni("u_ripple");
  const uPx = uni("u_px");

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  let dpr = 1;
  let ready = false;
  let sizeReady = false;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w < 2 || h < 2) {
      sizeReady = false;
      return;
    }
    const cw = Math.round(w * dpr);
    const ch = Math.round(h * dpr);
    sizeReady = true;
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
      gl.viewport(0, 0, cw, ch);
      gl.uniform2f(uRes, cw, ch);
      gl.uniform1f(uPx, (isIdxBand ? 3 : CELL_PX) * dpr);
    }
  };

  window.addEventListener("resize", resize);
  new ResizeObserver(resize).observe(el);
  resize();

  const pointer = { x: canvas.width / 2, y: canvas.height / 2 };
  const target = { ...pointer };
  let ripple = reducedMotion ? 0 : RIPPLE_REST;
  let rippleTarget = ripple;
  let dragging = false;

  const onPointerMove = (event) => {
    dragging = true;
    const rect = el.getBoundingClientRect();
    target.x = (event.clientX - rect.left) * dpr;
    target.y = (rect.height - (event.clientY - rect.top)) * dpr;
    rippleTarget = 1;
  };

  const onPointerLeave = () => {
    dragging = false;
    rippleTarget = RIPPLE_REST;
  };

  const host = el.closest("[data-live-dither-host]") || el;
  if (!reducedMotion) {
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
  }

  const image = new Image();
  image.decoding = "async";
  image.src = src;
  image.addEventListener("load", () => {
    ready = true;
    gl.uniform2f(uTexRes, image.naturalWidth, image.naturalHeight);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  });

  const startTime = performance.now();
  let frame = 0;
  let visible = false;
  let painted = false;

  const draw = (now) => {
    frame = requestAnimationFrame(draw);
    if (!ready) return;
    if (!sizeReady) {
      resize();
      if (!sizeReady) return;
    }

    const t = (now - startTime) * 0.001;
    if (!reducedMotion && !dragging) {
      target.x = canvas.width * (0.5 + Math.sin(t * 0.23) * 0.18);
      target.y = canvas.height * (0.5 + Math.cos(t * 0.19) * 0.12);
    }
    pointer.x += (target.x - pointer.x) * 0.12;
    pointer.y += (target.y - pointer.y) * 0.12;
    ripple += (rippleTarget - ripple) * 0.06;

    gl.uniform1f(uTime, t);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.uniform1f(uRipple, ripple);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    if (!painted) {
      painted = true;
      canvas.classList.add("is-live");
      el.classList.add("is-live");
    }

    if (reducedMotion) cancelAnimationFrame(frame);
  };

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting === visible) return;
    visible = entry.isIntersecting;
    if (visible) frame = requestAnimationFrame(draw);
    else cancelAnimationFrame(frame);
  }).observe(el);
}

export function initLiveDither() {
  document.querySelectorAll("[data-live-dither]").forEach(mountLiveDither);
}

export { mountLiveDither };

initLiveDither();
