#!/usr/bin/env python3
"""Link klearnow-spacing.css and apply small markup spacing fixes on all landing HTML."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(p for p in ROOT.glob("**/*.html") if "node_modules" not in p.parts)
LINK = '<link href="/klearnow-spacing.css?v=20260922" rel="stylesheet" type="text/css"/>'
SITE_CSS = "/klearnow-site.min.css?v=20260922"

KLEARDATA_RESULTS_OLD = (
    '<div class="section_results"><div class="padding-global"><div class="container-large">'
    '<div class="padding-section-medium">'
)
KLEARDATA_RESULTS_NEW = (
    '<div class="section_results"><div class="padding-global"><div class="container-large">'
    '<div class="padding-section-large">'
)


def ensure_spacing_link(text: str) -> str:
    if "klearnow-spacing.css" in text:
        return text
    if SITE_CSS in text:
        return text.replace(
            f'<link href="{SITE_CSS}" rel="stylesheet" type="text/css"/>',
            f'<link href="{SITE_CSS}" rel="stylesheet" type="text/css"/>{LINK}',
            1,
        )
    return text.replace("</head>", f"{LINK}</head>", 1)


def fix_kleardata_results(text: str, rel: str) -> str:
    if rel != "product/kleardata.html":
        return text
    # First section_results after product-detailled only
    idx = text.find(KLEARDATA_RESULTS_OLD)
    if idx >= 0:
        text = text[:idx] + KLEARDATA_RESULTS_NEW + text[idx + len(KLEARDATA_RESULTS_OLD) :]
    return text


def add_managed_trade_footer(text: str, rel: str) -> str:
    if rel != "product/managed-trade.html" or "section_footer" in text:
        return text
    # Reuse footer from kleardata (EN tail)
    kd = (ROOT / "product/kleardata.html").read_text(encoding="utf-8")
    m = re.search(r'(<div class="section_footer">.*?</div></div></div></div></div></div>)', kd, re.S)
    if not m:
        return text
    footer = m.group(1)
    needle = "</main></div><script src=\"https://d3e54v103j8qbb.cloudfront.net/js/jquery"
    if needle in text:
        return text.replace("</main></div><script", footer + "</main></div><script", 1)
    return text


def main() -> None:
    changed = 0
    for path in HTML_FILES:
        rel = str(path.relative_to(ROOT))
        original = path.read_text(encoding="utf-8")
        updated = original
        updated = ensure_spacing_link(updated)
        updated = fix_kleardata_results(updated, rel)
        updated = add_managed_trade_footer(updated, rel)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print("updated", rel)
    print(f"done — {changed} files")


if __name__ == "__main__":
    main()
