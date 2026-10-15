/** Legency-style nav book dither (procedural WebGL2). */

const BAYER = `
const float BAYER[64] = float[64](
   0.0,48.0,12.0,60.0, 3.0,51.0,15.0,63.0, 32.0,16.0,44.0,28.0,35.0,19.0,47.0,31.0,
   8.0,56.0, 4.0,52.0,11.0,59.0, 7.0,55.0, 40.0,24.0,36.0,20.0,43.0,27.0,39.0,23.0,
   2.0,50.0,14.0,62.0, 1.0,49.0,13.0,61.0, 34.0,18.0,46.0,30.0,33.0,17.0,45.0,29.0,
  10.0,58.0, 6.0,54.0, 9.0,57.0, 5.0,53.0, 42.0,26.0,38.0,22.0,41.0,25.0,37.0,21.0);
float bayer8(vec2 c){int x=int(mod(c.x,8.0));int y=int(mod(c.y,8.0));return BAYER[y*8+x]/64.0;}
`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_px;
uniform vec2 u_pointer;
uniform float u_ripple;
uniform vec3 u_ink;
uniform vec3 u_accent;
out vec4 fragColor;
${BAYER}
void main(){
  float px=max(u_px,1.0);
  vec2 cell=floor(gl_FragCoord.xy/px);
  vec2 p=(cell*px+0.5*px);
  vec2 uv=p/u_res;
  vec2 q=(p-0.5*u_res)/u_res.y;
  vec2 m=(u_pointer-0.5*u_res)/u_res.y;
  float d=length(q-m);
  float wave=u_ripple*0.65*sin(d*14.0-u_time*3.0)*exp(-d*2.0);
  vec2 dir=d>0.0001?(q-m)/d:vec2(0.0);
  uv+=dir*wave*0.09;
  float n=sin(uv.x*8.0+u_time*0.35)*sin(uv.y*6.0-u_time*0.28);
  float lum=0.42+0.38*n+0.12*sin(u_time*0.5+uv.x*12.0);
  lum=clamp(lum+wave*0.24,0.0,1.0);
  float b=bayer8(cell);
  vec3 col=mix(u_ink,u_accent,1.0-step(lum,b));
  fragColor=vec4(col,1.0);
}`;

const VERT = `#version 300 es
in vec2 a_pos;
void main(){gl_Position=vec4(a_pos,0.0,1.0);}`;

const mounted = new WeakSet();
const RIPPLE_REST = 0.32;

function parseHex(hex) {
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

export function mountNavDither(canvas) {
  if (mounted.has(canvas)) return;
  mounted.add(canvas);

  const book = canvas.closest(".tsnav__book, .tier--dark, .ctaband, .closer");
  if (!book) return;

  const ditherMode = canvas.dataset.ditherMode || "hover";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
  if (!gl) return;

  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vs, VERT);
  gl.shaderSource(fs, FRAG);
  gl.compileShader(vs);
  gl.compileShader(fs);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const bookStyle = getComputedStyle(book);
  const accentHex =
    bookStyle.getPropertyValue("--closer-dither-accent").trim() ||
    getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() ||
    "#003f5b";
  const accent = parseHex(accentHex);
  const inkHex = bookStyle.getPropertyValue("--closer-dither-ink").trim();
  const ink = inkHex.length ? parseHex(inkHex) : [6 / 255, 4 / 255, 21 / 255];
  gl.uniform3fv(gl.getUniformLocation(program, "u_ink"), ink);
  gl.uniform3fv(gl.getUniformLocation(program, "u_accent"), accent);
  const uRes = gl.getUniformLocation(program, "u_res");
  const uTime = gl.getUniformLocation(program, "u_time");
  const uPx = gl.getUniformLocation(program, "u_px");
  const uPointer = gl.getUniformLocation(program, "u_pointer");
  const uRipple = gl.getUniformLocation(program, "u_ripple");

  let dpr = 1;
  let frame = 0;
  let running = false;
  let dragging = false;
  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let ripple = reduced ? 0 : RIPPLE_REST;
  let rippleTarget = ripple;

  const syncPointerCenter = () => {
    pointer.x = canvas.width * 0.5;
    pointer.y = canvas.height * 0.5;
    target.x = pointer.x;
    target.y = pointer.y;
  };

  const onPointerMove = (event) => {
    if (reduced) return;
    dragging = true;
    const rect = book.getBoundingClientRect();
    target.x = (event.clientX - rect.left) * dpr;
    target.y = (rect.height - (event.clientY - rect.top)) * dpr;
    rippleTarget = 1;
  };

  const onPointerLeave = () => {
    dragging = false;
    rippleTarget = RIPPLE_REST;
  };

  if (!reduced) {
    book.addEventListener("pointermove", onPointerMove);
    book.addEventListener("pointerleave", onPointerLeave);
  }

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = book.clientWidth;
    const h = book.clientHeight;
    if (w < 2 || h < 2) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uPx, 4 * dpr);
    if (pointer.x === 0 && pointer.y === 0) syncPointerCenter();
  };

  resize();
  window.addEventListener("resize", resize);
  new ResizeObserver(resize).observe(book);

  const start = performance.now();
  const draw = (now) => {
    if (!running) return;
    const t = (now - start) * 0.001;
    if (!reduced && !dragging) {
      target.x = canvas.width * (0.5 + Math.sin(t * 0.23) * 0.16);
      target.y = canvas.height * (0.5 + Math.cos(t * 0.19) * 0.11);
    }
    pointer.x += (target.x - pointer.x) * 0.12;
    pointer.y += (target.y - pointer.y) * 0.12;
    ripple += (rippleTarget - ripple) * 0.06;

    gl.uniform1f(uTime, t);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.uniform1f(uRipple, ripple);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (!canvas.classList.contains("is-live")) canvas.classList.add("is-live");
    if (!reduced) frame = requestAnimationFrame(draw);
  };

  canvas._navDitherStart = () => {
    if (running) return;
    running = true;
    resize();
    syncPointerCenter();
    rippleTarget = reduced ? 0 : RIPPLE_REST;
    frame = requestAnimationFrame(draw);
  };

  canvas._navDitherStop = () => {
    running = false;
    cancelAnimationFrame(frame);
    canvas.classList.remove("is-live");
  };

  if (ditherMode === "visible") {
    canvas.classList.add("tier-dither--visible");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) canvas._navDitherStart?.();
        else canvas._navDitherStop?.();
      },
      { threshold: 0.15 },
    );
    io.observe(book);
  }
}

export function setNavDitherActive(active) {
  document.querySelectorAll(".tsnav__book [data-nav-dither]").forEach((canvas) => {
    if (!mounted.has(canvas)) mountNavDither(canvas);
    if (!active) canvas._navDitherStop?.();
  });
}

export function setBookDitherHover(canvas, hover) {
  if (!canvas) return;
  if (!mounted.has(canvas)) mountNavDither(canvas);
  if (hover) canvas._navDitherStart?.();
  else canvas._navDitherStop?.();
}
