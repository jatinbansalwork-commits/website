import type { MirrorManifest } from './mirror-types';

export async function loadMirror(slug: string): Promise<MirrorManifest | null> {
  const modules = import.meta.glob<{ default: MirrorManifest }>('../data/mirror/*.json', {
    eager: true,
  });
  const key = `../data/mirror/${slug}.json`;
  const mod = modules[key] as { default: MirrorManifest } | undefined;
  return mod?.default ?? null;
}

export function slugFromPath(sitePath: string): string {
  if (sitePath === '/') return 'home';
  return sitePath.replace(/^\/|\/$/g, '').replace(/\//g, '__');
}
