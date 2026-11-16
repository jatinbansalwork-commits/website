/** Brand teal on live-dither bundle — no legacy blue intro on light hero. */
export function applyLiveDitherBrandPatches(text) {
  let s = text
    .replace(/Hs=\[0,4\/255,246\/255\]/, 'Hs=[0,93/255,124/255]')
    .replace(/Us=\[205\/255,204\/255,1\]/, 'Us=[160/255,210/255,225/255]');

  const initSteady =
    'o.uniform3fv(f(`u_ink`),i?Ws:Vs),o.uniform3fv(f(`u_blue`),Hs),o.uniform3fv(f(`u_pale`),Us),o.uniform1f(f(`u_light`),+!!i);';

  const initVariants = [
    'o.uniform3fv(f(`u_ink`),i?Ws:Vs),o.uniform3fv(f(`u_blue`),i?Us:Hs),o.uniform3fv(f(`u_pale`),i?Hs:Us),o.uniform1f(f(`u_light`),+!!i);',
    'o.uniform3fv(f(`u_ink`),i?Ws:Vs),o.uniform3fv(f(`u_blue`),i?Os:Hs),o.uniform3fv(f(`u_pale`),i?Fs:Us),o.uniform1f(f(`u_light`),+!!i);',
    initSteady,
  ];
  for (const init of initVariants) {
    if (s.includes(init) && init !== initSteady) {
      s = s.replace(init, initSteady);
    }
  }

  const drawSteady =
    'T+=(E-T)*.06,o.uniform1f(h,(e-N)*.001),o.uniform2f(g,C.x,C.y),o.uniform1f(_,T),o.drawArrays';
  const drawIntroTeal =
    'T+=(E-T)*.06;let $b=i&&!n?Math.min(1,(e-N)/1400):1;i&&(o.uniform3fv(f(`u_blue`),[Os[0]+(Hs[0]-Os[0])*$b,Os[1]+(Hs[1]-Os[1])*$b,Os[2]+(Hs[2]-Os[2])*$b]),o.uniform3fv(f(`u_pale`),[Fs[0]+(Us[0]-Fs[0])*$b,Fs[1]+(Us[1]-Fs[1])*$b,Fs[2]+(Us[2]-Fs[2])*$b])),o.uniform1f(h,(e-N)*.001),o.uniform2f(g,C.x,C.y),o.uniform1f(_,T),o.drawArrays';
  const drawIntroWrong =
    'T+=(E-T)*.06;let $b=i&&!n?Math.min(1,(e-N)/1400):1;$b<1&&(o.uniform3fv(f(`u_blue`),[Os[0]+(Us[0]-Os[0])*$b,Os[1]+(Us[1]-Os[1])*$b,Os[2]+(Us[2]-Os[2])*$b]),o.uniform3fv(f(`u_pale`),[Fs[0]+(Hs[0]-Fs[0])*$b,Fs[1]+(Hs[1]-Fs[1])*$b,Fs[2]+(Hs[2]-Fs[2])*$b])),o.uniform1f(h,(e-N)*.001),o.uniform2f(g,C.x,C.y),o.uniform1f(_,T),o.drawArrays';
  for (const intro of [drawIntroTeal, drawIntroWrong]) {
    if (s.includes(intro)) s = s.replace(intro, drawSteady);
  }

  // Drop unused intro palette if present
  s = s.replace(
    'Us=[160/255,210/255,225/255],Os=[0,4/255,246/255],Fs=[205/255,204/255,1],Ws=[242/255,242/255,242/255]',
    'Us=[160/255,210/255,225/255],Ws=[242/255,242/255,242/255]',
  );

  const pxSteady =
    'o.uniform1f(v,((()=>{let m=+e.dataset.liveDitherPx;return m>0?m:i?8:zs})()*b))';
  for (const pxOld of [
    'o.uniform1f(v,((()=>{let m=+e.dataset.liveDitherPx;return m>0?m:i?5:zs})()*b))',
    'o.uniform1f(v,(i?8:zs)*b)',
    'o.uniform1f(v,zs*b)',
  ]) {
    if (s.includes(pxOld)) s = s.replace(pxOld, pxSteady);
  }

  s = s.replace(
    'Math.min(window.devicePixelRatio||1,2)',
    'Math.min(window.devicePixelRatio||1,2.5)',
  );

  const lightLumLegency =
    'float lum = dot(texture(u_tex, clamp(tuv, 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114));\n  // per-cell grain, matches the static generator\'s ~7% noise\n  float grain = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453) * 0.07;\n  // Keep empty space clear on a light page. Existing dark artwork retains\n  // its grain and brightness response.\n  if (u_light > 0.5) {\n    lum = clamp(lum + wave * 0.18 * smoothstep(0.03, 0.12, lum), 0.0, 1.0);\n  } else {';
  const lightLumMarketing =
    'vec2 texel = 1.0 / u_texRes;\n  float lum = dot(texture(u_tex, clamp(tuv, 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114));\n  // per-cell grain, matches the static generator\'s ~7% noise\n  float grain = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453) * 0.07;\n  // Keep empty space clear on a light page. Existing dark artwork retains\n  // its grain and brightness response.\n  if (u_light > 0.5) {\n    lum = (\n      lum\n      + dot(texture(u_tex, clamp(tuv + vec2(texel.x, 0.0), 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114))\n      + dot(texture(u_tex, clamp(tuv - vec2(texel.x, 0.0), 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114))\n      + dot(texture(u_tex, clamp(tuv + vec2(0.0, texel.y), 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114))\n      + dot(texture(u_tex, clamp(tuv - vec2(0.0, texel.y), 0.0, 1.0)).rgb, vec3(0.299, 0.587, 0.114))\n    ) * 0.2;\n    lum = clamp(pow(lum, 0.9) * 1.28 + 0.035, 0.0, 1.0);\n    lum = clamp(lum + wave * 0.18 * smoothstep(0.03, 0.12, lum), 0.0, 1.0);\n  } else {';
  if (s.includes(lightLumMarketing)) {
    s = s.replace(lightLumMarketing, lightLumLegency);
  }

  return s;
}
