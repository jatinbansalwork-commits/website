#!/usr/bin/env python3
"""One-shot design QA fixes across marketing HTML pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HERO_PLACEHOLDER_GRID = (
    '<div class="hero_image-grid gestion-des-cessions-page">'
    '<div id="w-node-_7108d9ff-f65d-66c7-8a0d-20bb92882e57-0dfc17ac" class="hero_image-item is-1">'
    '<div class="hero-industries_image-placeholder hero_image-container gestion-des-cessions-page is-empty-hero" '
    'role="img" aria-label="Platform preview"></div></div>'
    '<div class="hero_image-item is-2 gestion-des-cessions-page">'
    '<div class="hero_image-layer gestion-des-cessions-page">'
    '<div class="hero-industries_image-placeholder hero_image-container is-2 gestion-des-cessions-page is-empty-hero" '
    'role="img" aria-label="Operations preview"></div></div></div></div>'
)

PRELOAD = """<!-- Preload image hero -->
<link rel="preload" 
      as="image" 
      href="/hero-earth-dots.webp"
      fetchpriority="high">
"""


def replace_hero_grids(text: str) -> str:
    """Swap Crealo CDN hero collages for KlearNow placeholders (keep grid geometry)."""
    pattern = re.compile(
        r'<div class="hero_image-grid gestion-des-cessions-page">.*?</div>\s*</div>\s*</div>\s*(?=</div>\s*</div>\s*</div>\s*</section>)',
        re.S,
    )
    return pattern.sub(HERO_PLACEHOLDER_GRID, text)


def fix_trade_compliance_en_testimonials(text: str) -> str:
    """EN testimonials block was duplicated/truncated; graft balanced block from freight-forwarders."""
    donor_path = ROOT / "operation-type" / "freight-forwarders.html"
    if not donor_path.is_file():
        return text

    def en_span(source: str) -> str | None:
        m = re.search(r'<main class="main-wrapper is_en-only">', source)
        m2 = re.search(r'<main class="main-wrapper is_fr-only">', source)
        if not m or not m2:
            return None
        return source[m.start() : m2.start()]

    donor = en_span(donor_path.read_text(encoding="utf-8"))
    if not donor:
        return text
    s_d = donor.find('<div data-wf--v2---section-testimonial')
    e_d = donor.find('<div class="section_cta">')
    if s_d == -1 or e_d == -1:
        return text
    good = donor[s_d:e_d]

    m = re.search(r'<main class="main-wrapper is_en-only">', text)
    m2 = re.search(r'<main class="main-wrapper is_fr-only">', text)
    if not m or not m2:
        return text
    block = text[m.start() : m2.start()]
    s = block.find('<div data-wf--v2---section-testimonial')
    e = block.find('<div class="section_cta">')
    if s == -1 or e == -1:
        return text
    new_block = block[:s] + good + block[e:]
    return text[: m.start()] + new_block + text[m2.start() :]


def fix_self_filers_main(text: str) -> str:
    if "self-filers" not in text and Path("self-filers.html").name:
        pass
    old = (
        '</div></div></div></div></div><main class="main-wrapper is_fr-only">'
    )
    new = (
        '</div></div></div></div></div></main><main class="main-wrapper is_fr-only">'
    )
    # Only fix EN handoff (first occurrence after footer CTA in EN block)
    idx = text.find('<div class="section_cta">')
    if idx == -1:
        return text
    sub = text[idx:]
    if old in sub:
        sub = sub.replace(old, new, 1)
        return text[:idx] + sub
    return text


def ensure_earth_preload(text: str) -> str:
    if "hero-earth-dots.webp" in text[:12000] and "Preload image hero" in text[:12000]:
        return text
    if 'href="/hero-earth-dots.webp"' in text and "preload" in text[:12000].lower():
        return text
    marker = '<link rel="preconnect" href="https://cdn.prod.website-files.com">'
    if marker in text and PRELOAD.strip() not in text:
        return text.replace(marker, marker + "\n" + PRELOAD, 1)
    return text


def apply_common(text: str) -> str:
    text = text.replace("Klearnow</text>", "KlearNow</text>")
    text = text.replace("They Recommend Klearnow", "What customers say")
    text = re.sub(
        r"<h2 class=\"heading-style-h2 text-align-center text-color-white text-weight-medium\">See what KlearData does with your documents</h2>",
        '<h2 class="heading-style-h2 text-align-center text-color-white text-weight-medium" data-i18n="footer.cta">Let&#x27;s talk about your shipment!</h2>',
        text,
    )
    # Remove inline testimonial padding that fights klearnow-spacing.css
    text = re.sub(
        r"\.section_testimonials \.padding-section-medium\.padding-top \{\s*padding-top: 3rem !important;\s*\}\s*",
        "",
        text,
    )
    return text


def main() -> None:
    for path in sorted(ROOT.glob("**/*.html")):
        rel = path.relative_to(ROOT)
        original = path.read_text(encoding="utf-8")
        updated = apply_common(original)

        if rel.parts[0] == "operation-type":
            if rel.name == "self-filers.html":
                updated = fix_self_filers_main(updated)
        if rel.name == "trade-compliance.html":
            updated = fix_trade_compliance_en_testimonials(updated)

        if rel.parts[0] == "product":
            updated = ensure_earth_preload(updated)

        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print("updated", rel)


if __name__ == "__main__":
    main()
