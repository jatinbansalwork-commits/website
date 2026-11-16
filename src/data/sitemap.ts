/** Public routes (originally sourced from archived sitemap). */
export type PageKind =
  | 'home'
  | 'about'
  | 'how-we-work'
  | 'service'
  | 'landing'
  | 'industry'
  | 'case-studies-index'
  | 'case-study'
  | 'blog-index'
  | 'blog-post'
  | 'resources-index'
  | 'resource'
  | 'contact'
  | 'legal'
  | 'utility';

export interface SiteRoute {
  path: string;
  kind: PageKind;
  title: string;
  /** When set, page HTML is loaded from this Legency path’s mirror JSON. */
  mirrorPath?: string;
}

import rawRoutes from './routes.json';

export const routes: SiteRoute[] = rawRoutes as SiteRoute[];

export function pathToSlug(path: string): string | undefined {
  if (path === '/') return undefined;
  return path.replace(/^\/|\/$/g, '');
}

export function slugToPath(slug: string): string {
  return `/${slug}/`;
}
