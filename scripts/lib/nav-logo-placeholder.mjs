/** Rebrand nav logo to KlearNow (marketing-site primary horizontal). */
export function applyNavLogoPlaceholder(html) {
  if (!html) return html;
  return html
    .replaceAll('src="/img/logo.svg"', 'src="/img/klearnow-logo-horizontal-primary.svg"')
    .replaceAll("src='/img/logo.svg'", "src='/img/klearnow-logo-horizontal-primary.svg'")
    .replaceAll('src="/img/logo-placeholder.svg"', 'src="/img/klearnow-logo-horizontal-primary.svg"')
    .replaceAll('alt="Legency"', 'alt="KlearNow"')
    .replaceAll('alt="Logo placeholder"', 'alt="KlearNow"')
    .replaceAll('aria-label="Legency Media home"', 'aria-label="KlearNow home"')
    .replaceAll('aria-label="Home"', 'aria-label="KlearNow home"');
}
