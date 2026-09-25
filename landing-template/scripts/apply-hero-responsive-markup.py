#!/usr/bin/env python3
"""Replace shared hero img with per-page responsive <picture> markup."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BOOT = ROOT / "public" / "klearnow-boot.js"


def asset_version() -> str:
    m = re.search(r"ASSET_VERSION = '(\d+)'", BOOT.read_text(encoding="utf-8"))
    if not m:
        raise SystemExit("ASSET_VERSION missing in klearnow-boot.js")
    return m.group(1)

SIZES = (
    "(max-width: 767px) 100vw, "
    "(max-width: 991px) min(100vw - 2.5rem, 837px), "
    "837px"
)

# Stat card baked into JPEG — anchor crop (see klearnow-spacing.css is-hero-focal-*)
HERO_FOCAL_CLASS: dict[str, str] = {
    "freight-forwarders": "is-hero-focal-bl",
    "self-filers": "is-hero-focal-br",
    "trade-compliance": "is-hero-focal-br",
    "customs-brokers": "is-hero-focal-br",
    "kleardata": "is-hero-focal-br",
    "klearhub": "is-hero-focal-br",
    "managed-trade": "is-hero-focal-br",
    "home": "is-hero-focal-br",
}


def hero_visual_classes(slug: str) -> str:
    focal = HERO_FOCAL_CLASS.get(slug, "")
    return f"optype-hero-visual {focal}".strip()


FILE_SLUG: dict[str, str] = {
    "index.html": "home",
    "product/kleardata.html": "kleardata",
    "product/klearhub.html": "klearhub",
    "product/managed-trade.html": "managed-trade",
    "operation-type/customs-brokers.html": "customs-brokers",
    "operation-type/freight-forwarders.html": "freight-forwarders",
    "operation-type/self-filers.html": "self-filers",
    "operation-type/trade-compliance.html": "trade-compliance",
}

OLD_IMG = re.compile(
    r'<img class="optype-hero-photo" src="/hero/operations-preview\.jpg" alt="" loading="(?:eager|lazy)" decoding="async"/>'
)


def empty_hero_shell() -> str:
    return (
        '<div class="hero-industries_image-placeholder hero_image-container gestion-des-cessions-page is-empty-hero" '
        'role="img" aria-label="Operations preview"></div>'
    )


def picture_markup(slug: str, ver: str | None = None) -> str:
    ver = ver or asset_version()
    q = f"?v={ver}"
    base = f"/hero/pages/{slug}"
    webp = ", ".join(f"{base}/hero-{w}.webp{q} {w}w" for w in (480, 768, 960, 1280))
    jpeg = ", ".join(f"{base}/hero-{w}.jpg{q} {w}w" for w in (480, 768, 960, 1280))
    return (
        f'<picture class="optype-hero-picture">'
        f'<source type="image/webp" srcset="{webp}" sizes="{SIZES}"/>'
        f'<img class="optype-hero-photo" src="{base}/hero-960.jpg{q}" srcset="{jpeg}" sizes="{SIZES}" '
        f'alt="" width="1280" height="704" loading="eager" fetchpriority="high" decoding="async"/>'
        f"</picture>"
    )


def main() -> None:
    for rel, slug in FILE_SLUG.items():
        path = ROOT / rel
        if not path.is_file():
            print(f"skip missing {rel}")
            continue
        text = path.read_text(encoding="utf-8")
        block = picture_markup(slug)
        new_text, n = OLD_IMG.subn(block, text)
        if n == 0 and "optype-hero-picture" not in text:
            print(f"warn: no replacements in {rel}")
            continue
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            print(f"{rel}: {n} hero picture(s) → {slug}")


if __name__ == "__main__":
    main()
