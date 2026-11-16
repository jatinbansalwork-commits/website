/** @param {string} html */
export function stripPartnerBadges(html) {
  let out = html;
  out = out.replace(/<div class="footer__badge"[^>]*>[\s\S]*?<\/div>/gi, '');
  out = out.replace(/<a class="footer__prefsrc"[^>]*>[\s\S]*?<\/a>/gi, '');
  out = out.replace(/<div class="hero__badge"[^>]*>[\s\S]*?<\/div>/gi, '');
  out = out.replace(/<a class="badge-link"[^>]*>[\s\S]*?<\/a>/gi, '');
  out = out.replace(/<img[^>]*\bsrc="\/img\/badge-enterprise[^"]*"[^>]*>/gi, '');
  out = out.replace(/<img[^>]*\bsrc="\/img\/google-preferred-source-dark\.png"[^>]*>/gi, '');
  return out;
}
