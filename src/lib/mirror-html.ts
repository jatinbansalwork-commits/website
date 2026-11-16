/** Normalize mirrored page HTML and collect scripts Astro will not run via set:html. */

export interface PreparedMainHtml {
  mainHtml: string;
  /** Third-party or classic scripts stripped from main (Calendly, etc.) */
  deferredScripts: string[];
  /** Module scripts with src found only inside main (e.g. GlassMark on live home) */
  mainModuleScripts: string[];
}

export function extractInlineModuleScripts(html: string): string[] {
  const blocks: string[] = [];
  for (const m of html.matchAll(/<script\s+type\s*=\s*["']module["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[0].slice(0, m[0].indexOf('>') + 1);
    if (/src\s*=/i.test(attrs)) continue;
    const code = m[1].trim();
    if (code) blocks.push(code);
  }
  return blocks;
}

export function extractModuleScriptSrcs(html: string): string[] {
  return [
    ...html.matchAll(/<script\s+type\s*=\s*["']module["'][^>]*\ssrc\s*=\s*["']([^"']+)["']/gi),
  ].map((m) => m[1]);
}

export function prepareMainHtml(html: string): PreparedMainHtml {
  const deferredScripts: string[] = [];
  const mainModuleScripts: string[] = [];
  let main = html;

  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const full = m[0];
    const attrs = m[1];
    const isModule = /type\s*=\s*["']module["']/i.test(attrs);
    const srcMatch = attrs.match(/\ssrc\s*=\s*["']([^"']+)["']/i);

    if (isModule) {
      if (srcMatch && srcMatch[1].startsWith('/_astro/')) {
        mainModuleScripts.push(srcMatch[1]);
      }
      main = main.replace(full, '');
      continue;
    }

    if (srcMatch) {
      const src = srcMatch[1];
      if (!src.startsWith('http') || src.includes('calendly.com') || src.includes('legencymedia.com')) {
        deferredScripts.push(src);
      }
    } else if (m[2].trim() && !/application\/ld\+json/i.test(attrs)) {
      // Inline classic scripts are dropped; behaviors belong in inlineModules at page level.
    }
    main = main.replace(full, '');
  }

  return {
    mainHtml: main,
    deferredScripts: [...new Set(deferredScripts)],
    mainModuleScripts: [...new Set(mainModuleScripts)],
  };
}
