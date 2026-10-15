#!/usr/bin/env python3
"""Phase 1: internal legacy fingerprints → KlearNow names (no copy/layout changes)."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKIP_PARTS = {"node_modules", "kleardata-extraction-widget"}

# Order matters: longer / specific tokens first.
REPLACEMENTS: list[tuple[str, str]] = [
    ("gestion-des-cessions-page", "kn-hero-fullbleed"),
    ("hero-why-legacy-export", "hero-why-kn"),
    ("section_support-legacy-export", "section_support-kn"),
    ("support-legacy-export", "support-kn"),
    ("--legacy-export-fonts--", "--kn-fonts--"),
    ("--legacy-export-bg--", "--kn-bg--"),
    ("--legacy-export--", "--kn--"),
    ("v2-5-legacy-export", "v2-5-kn"),
    ("isFreightsiteHowSwitchSlider", "isFreightHowSwitchSlider"),
    ("normalizesiteHowSwitchSlider", "normalizeFreightHowSwitchSlider"),
    ("product-accountability-footer", "product-kleardata-footer"),
    ("kn-hero-workflow-styles", "kn-hero-motion-styles"),
    ("home-hero-workflow.css", "home-hero-motion.css"),
    ("kh-workflow-agent-minis.css", "kn-agent-minis.css"),
    ("kh-agent-minis.css", "kn-agent-minis.css"),
    ("kh-ds-", "kn-"),
    ("fix_customer_logo_legacy", "fix_customer_logo_kn"),
    ("section_legacy-export", "section_kn"),
    ("why-legacy-export_page", "why-klearnow_page"),
    ("is_legacy-export", "is_kn"),
    ("legacy-export_text-container", "kn_text-container"),
    ("legacy-export_text-flex", "kn_text-flex"),
    ("legacy-export_grid", "kn_grid"),
    ("legacy-export_icon", "kn_icon"),
    ("legacy-export_image", "kn_image"),
    ("legacy-export_item", "kn_item"),
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
    del path  # reserved for path-specific rules
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
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
