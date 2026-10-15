import { colorTokens, type ColorScheme, type ColorTokens } from './colors';

export { colorTokens, darkColorTokens, lightColorTokens } from './colors';
export type { ColorScheme, ColorTokens } from './colors';

export type ColorTokenLeaf = {
  path: string;
  variable: string;
  light: string;
  dark: string;
};

const walk = (node: ColorTokens | string, prefix: string, out: Map<string, string>) => {
  if (typeof node === 'string') {
    out.set(prefix, node);
    return;
  }

  for (const [key, value] of Object.entries(node)) {
    walk(value as ColorTokens | string, prefix ? `${prefix}.${key}` : key, out);
  }
};

const flatten = (tokens: ColorTokens) => {
  const out = new Map<string, string>();
  walk(tokens, '', out);
  return out;
};

const lightLeaves = flatten(colorTokens.light);
const darkLeaves = flatten(colorTokens.dark);

export const colorTokenLeaves: ColorTokenLeaf[] = [...lightLeaves.entries()].map(([path, light]) => ({
  path,
  variable: `--${path.replaceAll('.', '-')}`,
  light,
  dark: darkLeaves.get(path) ?? light,
}));

export const colorTokenGroups = [
  'surface',
  'feedback',
  'interactive',
  'overlay',
  'popup',
  'data',
  'transparent',
] as const;

export const applyColorScheme = (scheme: ColorScheme) => {
  document.documentElement.setAttribute('data-klear360-color-scheme', scheme);
};
