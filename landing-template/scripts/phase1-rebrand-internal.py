#!/usr/bin/env python3
"""Phase 1: internal Crealo/Docsumo fingerprints → KlearNow names (no copy/layout changes)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKIP_PARTS = {"node_modules", "kleardata-extraction-widget"}

# Order matters: longer / specific tokens first.
REPLACEMENTS: list[tuple[str, str]] = [
    ("section_crealo", "section_kn"),
    ("why-crealo_page", "why-klearnow_page"),
    ("is_crealo", "is_kn"),
    ("crealo_text-container", "kn_text-container"),
    ("crealo_text-flex", "kn_text-flex"),
    ("crealo_grid", "kn_grid"),
    ("crealo_icon", "kn_icon"),
    ("crealo_image", "kn_image"),
    ("crealo_item", "kn_item"),
    ("gestion-des-cessions-page", "kn-hero-fullbleed"),
    ("hero-why-crealo", "hero-why-kn"),
    ("section_support-crealo", "section_support-kn"),
    ("support-crealo", "support-kn"),
    ("--crealo-fonts--", "--kn-fonts--"),
    ("--crealo-bg--", "--kn-bg--"),
    ("--crealo--", "--kn--"),
    ("v2-5-crealo", "v2-5-kn"),
    ("isFreightCrealoHowSwitchSlider", "isFreightHowSwitchSlider"),
    ("normalizeCrealoHowSwitchSlider", "normalizeFreightHowSwitchSlider"),
    ("product-accountability-footer", "product-kleardata-footer"),
    ("kn-hero-docsumo-styles", "kn-hero-motion-styles"),
    ("home-hero-docsumo.css", "home-hero-motion.css"),
    ("kh-docsumo-agent-minis.css", "kn-agent-minis.css"),
    ("kh-agent-minis.css", "kn-agent-minis.css"),
    ("kh-ds-", "kn-"),
    ("fix_customer_logo_crealo", "fix_customer_logo_legacy"),
]

COMMENT_FIXES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\bCrealo\b"), "legacy template"),
    (re.compile(r"\bcrealo\b"), "legacy template"),
    (re.compile(r"\bDocsumo\b"), "stage-scene"),
    (re.compile(r"\bdocsumo\b"), "stage-scene"),
    (re.compile(r"docsumo\.com"), "reference UI"),
]

TEXT_EXTENSIONS = {".html", ".css", ".js", ".py"}


def should_process(path: Path) -> bool:
    if path.suffix not in TEXT_EXTENSIONS:
        return False
    if any(part in SKIP_PARTS for part in path.parts):
        return False
    if path.name in ("phase1-rebrand-internal.py", "sanitize-brand-evidence.py"):
        return False
    return True


def transform(text: str, path: Path) -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)

    # Sanitizer keeps URL literals containing "crealo" — do not rewrite those strings.
    if path.name != "sanitize-brand-evidence.py":
        for pat, repl in COMMENT_FIXES:
            text = pat.sub(repl, text)

    return text


def main() -> None:
    changed: list[str] = []
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or not should_process(path):
            continue
        original = path.read_text(encoding="utf-8")
        updated = transform(original, path)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed.append(str(path.relative_to(ROOT)))

    print(f"phase1-rebrand-internal: {len(changed)} files updated")
    for rel in changed:
        print(" ", rel)


if __name__ == "__main__":
    main()
