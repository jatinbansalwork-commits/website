#!/usr/bin/env node
/** Fetch legencymedia.com sitemap and print SiteRoute[] entries for src/data/sitemap.ts */
const xml = await fetch('https://legencymedia.com/sitemap-0.xml').then((r) => r.text());
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const path = new URL(locs[0]).pathname;
const kind = (p) => {
  if (p === '/') return 'home';
  if (p.startsWith('/blog/') && p !== '/blog/') return 'blog-post';
  if (p === '/blog/') return 'blog-index';
  if (p.startsWith('/case-studies/') && p !== '/case-studies/') return 'case-study';
  if (p === '/case-studies/') return 'case-studies-index';
  if (p.startsWith('/resources/') && p !== '/resources/') return 'resource';
  if (p === '/resources/') return 'resources-index';
  if (p.startsWith('/services/')) return 'service';
  if (p.startsWith('/industries/')) return 'industry';
  if (p === '/get-in-touch/') return 'contact';
  if (p === '/about/') return 'about';
  if (p === '/how-we-work/') return 'how-we-work';
  if (['/privacy/', '/cookies/'].includes(p)) return 'legal';
  return 'landing';
};
for (const url of locs) {
  const p = new URL(url).pathname;
  const title = p === '/' ? 'Home' : p.split('/').filter(Boolean).pop().replace(/-/g, ' ');
  console.log(`  { path: '${p}', kind: '${kind(p)}', title: '${title}' },`);
}
console.error(`// ${locs.length} routes`);
