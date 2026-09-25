#!/usr/bin/env python3
"""Remove Crealo / replica / Webflow export fingerprints from landing HTML (UI-safe)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_GLOB = list(ROOT.glob("**/*.html"))
HTML_FILES = [p for p in HTML_GLOB if "node_modules" not in p.parts]

CUSTOMER_STRIP = (
    "Global logistics and trade teams run document intake, customs clearance, "
    "and port-to-door visibility on KlearNow."
)

REPLACEMENTS = [
    (
        "<!-- Last Published: Tue Sep 15 2026 15:08:36 GMT+0000 (Coordinated Universal Time) -->",
        "",
    ),
    ('data-wf-domain="template.local"', 'data-wf-domain="www.klearnow.ai"'),
    ('<title>SaaS Landing Template</title>', "<title>KlearNow.AI | Your shipment partner. Evolved.</title>"),
    (
        'meta content="Simplify reporting with Platform. Automate royalty calculations for contracts.',
        'meta content="KlearNow.AI — AI-powered trade document processing, customs clearance, and logistics.',
    ),
    ('"name": "Platform"', '"name": "KlearNow"'),
    ('"name": "Platform",', '"name": "KlearNow",'),
    ("/why-crealo", "/why-klearnow.html"),
    ("/en/why-crealo", "/why-klearnow.html"),
    ("https://www.crealo.app", "#"),
    ("https://crealo.app", "#"),
    ("https://manage.crealo.app", "#"),
    ("Pourquoi Crealo", "Pourquoi KlearNow"),
    (
        "Transformez votre gestion des droits d&#x27;auteur et des contrats, simplifiez vos redditions avec Crealo",
        "Découvrez pourquoi les équipes trade et douane choisissent KlearNow",
    ),
    (
        "Transformez votre gestion des droits d'auteur et des contrats, simplifiez vos redditions avec Crealo",
        "Découvrez pourquoi les équipes trade et douane choisissent KlearNow",
    ),
    (
        "More than <span class=\"text-weight-bold text-color-blue\">200</span> publishers across all segments simplify their royalty management thanks to the advanced features of our royalty management software. ",
        CUSTOMER_STRIP + " ",
    ),
    (
        "alt=\"demo video image\"",
        'alt="KlearNow product tour preview"',
    ),
    ("Let's talk about your project!", "Let's talk about your shipment!"),
    (
        "/* Locale-specific page bodies (freight-forwarders Crealo replica) */",
        "/* Locale-specific page bodies (FR) */",
    ),
    (
        "/* Section heading stacks — match crealo.webflow spacing (2rem services, 0.75rem heading-description) */",
        "/* Section heading stacks — services / heading-description spacing */",
    ),
    (
        "/* Unified dropdown panel (Crealo pattern) — scrim is #kn-nav-scrim on body */",
        "/* Unified dropdown panel — scrim is #kn-nav-scrim on body */",
    ),
    ('data-modal-hash="publishing"', 'data-modal-hash="demo"'),
    ("alt=\"denise crealo\"", 'alt="KlearNow team member"'),
    ("alt=\"najlae crealo image\"", 'alt="KlearNow team member"'),
    ("alt=\"bastien crealo\"", 'alt="KlearNow team member"'),
]

# Case-sensitive word "Crealo" in visible text (class tokens use hero-why-kn / support-kn)
CREALO_WORD = re.compile(r"\bCrealo\b")

ROYALTY_META = (
    "Simplify reporting with Platform. Automate royalty calculations for contracts "
    "and rights transfers in one easy-to-use platform."
)

DESCRIPTION_OVERRIDES: dict[str, str] = {
    "index.html": (
        "KlearNow.AI — AI-powered trade document processing, customs clearance, "
        "and logistics from port to door."
    ),
    "product/kleardata.html": (
        "KlearData — AI document intake and validation for faster, cleaner customs filing."
    ),
}

META_DESC = re.compile(
    r'(<meta\s+content=")([^"]*)("\s+name="description"\s*/>)'
    r'|(<meta\s+name="description"\s+content=")([^"]*)("\s*/>)'
)
TITLE = re.compile(r"<title>([^<]+)</title>")
OG_TITLE = re.compile(
    r'(<meta\s+content=")([^"]*)("\s+property="og:title"\s*/>)'
    r'|(<meta\s+property="og:title"\s+content=")([^"]*)("\s*/>)'
)
OG_DESC = re.compile(
    r'(<meta\s+content=")([^"]*)("\s+property="og:description"\s*/>)'
    r'|(<meta\s+property="og:description"\s+content=")([^"]*)("\s*/>)'
)
TW_TITLE = re.compile(
    r'(<meta\s+content=")([^"]*)("\s+(?:name|property)="twitter:title"\s*/>)'
    r'|(<meta\s+(?:name|property)="twitter:title"\s+content=")([^"]*)("\s*/>)'
)
TW_DESC = re.compile(
    r'(<meta\s+content=")([^"]*)("\s+(?:name|property)="twitter:description"\s*/>)'
    r'|(<meta\s+(?:name|property)="twitter:description"\s+content=")([^"]*)("\s*/>)'
)


def _replace_meta(regex: re.Pattern[str], text: str, new_value: str) -> str:
    def repl(m: re.Match[str]) -> str:
        if m.group(1) is not None:
            return f'{m.group(1)}{new_value}{m.group(3)}'
        return f'{m.group(4)}{new_value}{m.group(6)}'

    return regex.sub(repl, text, count=1)


SITE_NAV_LD = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Main navigation",
  "url": "#",
  "about": [
    { "@type": "WebPage", "name": "KlearData", "url": "/product/kleardata.html" },
    { "@type": "WebPage", "name": "KlearHub", "url": "/product/klearhub.html" },
    { "@type": "WebPage", "name": "Managed Trade", "url": "/product/managed-trade.html" },
    { "@type": "WebPage", "name": "Why KlearNow", "url": "/why-klearnow.html" },
    { "@type": "WebPage", "name": "Talk to Klear", "url": "/talk-to-klear.html" }
  ]
}
</script>"""

SITE_NAV_LD_PATTERN = re.compile(
    r'<script type="application/ld\+json">\s*\{\s*"@context": "https://schema\.org",\s*'
    r'"@type": "SiteNavigationElement",[\s\S]*?\}\s*</script>',
    re.MULTILINE,
)


def replace_site_navigation_ld(text: str) -> str:
    return SITE_NAV_LD_PATTERN.sub(SITE_NAV_LD, text, count=1)


def sync_social_and_meta(text: str, rel_path: str) -> str:
    override = DESCRIPTION_OVERRIDES.get(rel_path.replace("\\", "/"))
    if override:
        text = text.replace(f'content="{ROYALTY_META}" name="description"', f'content="{override}" name="description"')
        text = text.replace(f'name="description" content="{ROYALTY_META}"', f'name="description" content="{override}"')
        # Partially corrupted descriptions from earlier prefix replace
        if ROYALTY_META in text:
            text = text.replace(ROYALTY_META, override)

    title_m = TITLE.search(text)
    desc_m = META_DESC.search(text)
    if not title_m or not desc_m:
        return text
    title = title_m.group(1).strip()
    desc = (desc_m.group(2) or desc_m.group(5) or "").strip()
    if override:
        desc = override
        text = _replace_meta(META_DESC, text, desc)

    text = _replace_meta(OG_TITLE, text, title)
    text = _replace_meta(OG_DESC, text, desc)
    if TW_TITLE.search(text):
        text = _replace_meta(TW_TITLE, text, title)
    if TW_DESC.search(text):
        text = _replace_meta(TW_DESC, text, desc)
    return text


def sanitize_html(text: str, rel_path: str = "") -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    text = CREALO_WORD.sub("KlearNow", text)
    text = text.replace("© Platform", "© KlearNow")
    text = text.replace("https://calendly.com/denise-crealo/demo-crealo", "/talk-to-klear.html")
    text = text.replace("Platform - operations Software for teams", "KlearNow.AI")
    text = text.replace(
        "https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/678d9ca53786862948002180_graphCrealo.png",
        "/klearnow-logo.svg",
    )
    text = text.replace(
        "https://cdn.prod.website-files.com/5f96c1e75e94f64c995cffee/css/crealo.webflow.shared.35ca025f1.min.css",
        "/klearnow-site.min.css?v=20260920",
    )
    text = re.sub(
        r'<link href="/klearnow-site\.min\.css\?v=20260920" rel="stylesheet" type="text/css" integrity="[^"]*" crossorigin="anonymous"/>',
        '<link href="/klearnow-site.min.css?v=20260920" rel="stylesheet" type="text/css"/>',
        text,
    )
    text = text.replace("https://www.instagram.com/platform.app", "#")
    text = text.replace(
        "https://ma-declaration-urssaf.platform.app/?utm_source=landing&amp;utm_medium=platform&amp;utm_campaign=urssaftool",
        "#",
    )
    text = replace_site_navigation_ld(text)
    text = sync_social_and_meta(text, rel_path)
    # Remove accidental duplicate consecutive description metas (why-klearnow)
    text = re.sub(
        r'(<meta content="Discover why teams choose KlearNow\." name="description"/>){2,}',
        r'\1',
        text,
    )
    text = text.replace("/* Webflow defaults:", "/* Template defaults:")
    text = text.replace("(Webflow default", "(default template")
    return text


def main() -> None:
    changed = 0
    for path in HTML_FILES:
        original = path.read_text(encoding="utf-8")
        rel = str(path.relative_to(ROOT))
        updated = sanitize_html(original, rel)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print("updated", path.relative_to(ROOT))
    print(f"done — {changed} files changed")


if __name__ == "__main__":
    main()
