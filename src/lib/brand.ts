export const SITE_NAME = 'KlearNow';

export const SITE_ORIGIN = 'https://klearnow.ai';

/** Mirror manifests still carry Legency titles from the source site. */
export function brandDocumentTitle(title: string): string {
  let next = title.replace(/\bLegency Media\b/gi, SITE_NAME);
  next = next.replace(/\bLegency\b/gi, SITE_NAME);
  next = next.replace(/\s{2,}/g, ' ').replace(/\s+\|/g, ' |').trim();
  return next;
}

/** Meta descriptions mirrored from Legency — scrub domain and agency name. */
export function brandMetaDescription(description: string): string {
  return scrubLegencyDomainAndName(description);
}

function scrubLegencyDomainAndName(text: string): string {
  let next = text;
  next = next.replace(/https?:\/\/(?:www\.)?legencymedia\.com\/?/gi, `${SITE_ORIGIN}/`);
  next = next.replace(/\bwww\.legencymedia\.com\b/gi, 'klearnow.ai');
  next = next.replace(/\blegencymedia\.com\b/gi, 'klearnow.ai');
  next = next.replace(/\bLegency Media\b/gi, SITE_NAME);
  next = next.replace(/\bLegency\b/gi, SITE_NAME);
  return next.replace(/\s{2,}/g, ' ').trim();
}

const KLEARNOW_LINKEDIN = 'https://www.linkedin.com/company/klearnow/';

/** Remove legencymedia URLs and Legency naming from mirrored HTML (nav, consent, body). */
export function stripLegencyReferences(html: string): string {
  let out = scrubLegencyDomainAndName(html);
  out = out.replace(/https:\/\/www\.linkedin\.com\/company\/legencymedia\/?/gi, KLEARNOW_LINKEDIN);
  out = out.replace(/aria-label="Legency Media on LinkedIn"/gi, `aria-label="${SITE_NAME} on LinkedIn"`);
  out = out.replace(/mailto:[^"'\s]*@legencymedia\.com/gi, `mailto:hello@klearnow.ai`);
  return out;
}
