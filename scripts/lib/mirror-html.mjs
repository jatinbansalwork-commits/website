export function extractInlineModuleScripts(html) {
  const blocks = [];
  for (const m of html.matchAll(/<script\s+type\s*=\s*["']module["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const open = m[0].slice(0, m[0].indexOf('>') + 1);
    if (/src\s*=/i.test(open)) continue;
    const code = m[1].trim();
    if (code) blocks.push(code);
  }
  return blocks;
}

export function extractModuleScriptSrcs(html) {
  return [...html.matchAll(/<script\s+type\s*=\s*["']module["'][^>]*\ssrc\s*=\s*["']([^"']+)["']/gi)].map(
    (m) => m[1],
  );
}

export function prepareMainHtml(html) {
  const deferredScripts = [];
  const mainModuleScripts = [];
  let main = html;

  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const full = m[0];
    const attrs = m[1];
    const isModule = /type\s*=\s*["']module["']/i.test(attrs);
    const srcMatch = attrs.match(/\ssrc\s*=\s*["']([^"']+)["']/i);

    if (isModule) {
      if (srcMatch?.[1]?.startsWith('/_astro/')) mainModuleScripts.push(srcMatch[1]);
      main = main.replace(full, '');
      continue;
    }

    if (srcMatch) {
      const src = srcMatch[1];
      if (
        src.startsWith('/') ||
        src.startsWith('https://legencymedia.com') ||
        src.includes('calendly.com')
      ) {
        deferredScripts.push(src.replace(/^https?:\/\/legencymedia\.com/, ''));
      }
    }
    main = main.replace(full, '');
  }

  return {
    mainHtml: main,
    deferredScripts: [...new Set(deferredScripts)],
    mainModuleScripts: [...new Set(mainModuleScripts)],
  };
}
