export interface MirrorManifest {
  path: string;
  slug: string;
  kind: string;
  title: string;
  description: string;
  source?: 'wayback' | 'live';
  stylesheets: string[];
  /** Scoped Astro component CSS from inline style blocks in the source HTML */
  inlineStyles?: string[];
  /** Inline <script type="module"> bodies from the source page */
  inlineModules?: string[];
  /** Classic/defer scripts stripped from main (widgets, etc.) */
  deferredScripts?: string[];
  scripts: string[];
  mainHtml: string;
}
