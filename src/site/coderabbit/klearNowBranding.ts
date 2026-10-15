const TEXT_REPLACEMENTS: [string, string][] = [
  ['CodeRabbit', 'KlearNow'],
  ['coderabbitai', 'KlearNow AI'],
  ['Coderabbit', 'KlearNow'],
];

const KLEARNOW_ICON = '/brand/klearnow-icon.png';

const replaceTextInTree = (root: ParentNode, replacements: [string, string][]) => {
  const ordered = [...replacements].sort((a, b) => b[0].length - a[0].length);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    let value = node.nodeValue ?? '';
    let changed = false;
    for (const [from, to] of ordered) {
      if (value.includes(from)) {
        value = value.split(from).join(to);
        changed = true;
      }
    }
    if (changed) node.nodeValue = value;
  }
};

/** Swap CodeRabbit marks in cloned preview HTML for KlearNow assets. */
export const applyKlearNowMediaBranding = (root: ParentNode) => {
  root.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    const src = img.getAttribute('src') ?? '';
    const srcset = img.getAttribute('srcset') ?? '';
    if (!/coderabbit/i.test(src) && !/coderabbit/i.test(srcset)) return;

    img.src = KLEARNOW_ICON;
    img.removeAttribute('srcset');
    if (!img.alt || /coderabbit/i.test(img.alt)) {
      img.alt = 'KlearNow';
    }
  });
};

/** Replace leftover CodeRabbit strings in visible text (snapshots before mount hooks run). */
export const applyKlearNowTextBranding = (root: ParentNode) => {
  replaceTextInTree(root, TEXT_REPLACEMENTS);
};

export const applyKlearNowBranding = (root: ParentNode) => {
  applyKlearNowTextBranding(root);
  applyKlearNowMediaBranding(root);
};
