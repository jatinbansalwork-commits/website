#!/usr/bin/env python3
"""Audit locale / i18n wiring across marketing HTML pages."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCALE_JS = ROOT / "public/klearnow-locale.js"
NAV_KEYS = [
    "nav.products",
    "nav.operations",
    "nav.tracking",
    "nav.login",
    "hero.cta.demo",
    "footer.cta",
    "hero.cta.talk",
]


def translation_keys(js: str) -> set[str]:
    return set(re.findall(r"'([^']+)':", js))


def main() -> int:
    js = LOCALE_JS.read_text(encoding="utf-8")
    keys = translation_keys(js)
    pages = sorted(p for p in ROOT.rglob("*.html") if "dist" not in p.parts and "node_modules" not in p.parts)
    errors = 0

    print(f"Pages: {len(pages)} | Keys in klearnow-locale.js: {len(keys)}\n")

    for p in pages:
        t = p.read_text(encoding="utf-8")
        rel = p.relative_to(ROOT)
        issues: list[str] = []

        if "klearnow-locale.js" not in t:
            issues.append("missing klearnow-locale.js")
        if "locale-market-list" not in t:
            issues.append("missing locale-market-list")
        if "locale-nav-dropdown" not in t:
            issues.append("missing locale-nav-dropdown")

        used = set(re.findall(r'data-i18n(?:-placeholder|-aria-label|-title)?="([^"]+)"', t))
        missing = sorted(k for k in used if k not in keys)
        if missing:
            issues.append(f"unknown i18n keys: {', '.join(missing[:5])}")

        panes = len(re.findall(r'class="kn-locale-pane is_(?:en|fr)-only"', t))
        if "operation-type/" in str(rel) and panes != 2:
            issues.append(f"expected 2 locale panes, found {panes}")

        title_key = re.search(r'data-i18n-title="([^"]+)"', t)
        if "operation-type/" in str(rel) and not title_key:
            issues.append("operation page missing data-i18n-title on <body>")

        nav_missing = [k for k in NAV_KEYS if f'data-i18n="{k}"' not in t]
        if nav_missing and "talk-to-klear" not in str(rel):
            # blog pages may omit footer CTA in markup
            if not (str(rel).startswith("blog") and set(nav_missing) <= {"footer.cta", "hero.cta.talk"}):
                if set(nav_missing) != {"footer.cta", "hero.cta.talk"} or "why-klearnow" not in str(rel):
                    if nav_missing:
                        issues.append(f"nav i18n gaps: {', '.join(nav_missing)}")

        model = "dual-pane" if panes else "i18n-only"
        i18n_n = len(re.findall(r"\bdata-i18n=", t))
        status = "OK" if not issues else "FAIL"
        print(f"[{status}] {rel} ({model}, data-i18n={i18n_n})")
        for i in issues:
            print(f"       - {i}")
            errors += 1

    print(f"\nTotal issues: {errors}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
