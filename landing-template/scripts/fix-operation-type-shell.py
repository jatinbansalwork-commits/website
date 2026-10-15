#!/usr/bin/env python3
"""Single <main> shell for operation-type pages: locale panes + shared CTA/footer inside main."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "customs-brokers",
    "freight-forwarders",
    "self-filers",
    "trade-compliance",
]

EN_MAIN = '<main class="main-wrapper is_en-only">'
FR_MAIN = '<main class="main-wrapper is_fr-only">'
SHELL_OPEN = '<main class="main-wrapper">'
EN_PANE = '<div class="kn-locale-pane is_en-only">'
FR_PANE = '<div class="kn-locale-pane is_fr-only">'

CTA_RE = re.compile(
    r'<div class="section_cta"><div class="padding-global padding-0">'
    r'<div class="container-medium is_footer-cta">.*?</div></div></div></div></div>',
    re.DOTALL,
)

MAIN_QUERY_OLD = (
    "main.main-wrapper.is_fr-only' : 'main.main-wrapper.is_en-only"
)
MAIN_QUERY_NEW = (
    "main.main-wrapper > .kn-locale-pane.is_fr-only' : 'main.main-wrapper > .kn-locale-pane.is_en-only"
)


def refactor(html: str) -> str:
    if SHELL_OPEN in html and EN_PANE in html and "kn-locale-pane" in html:
        return html

    if EN_MAIN not in html or FR_MAIN not in html:
        raise ValueError("Expected dual main-wrapper blocks")

    cta_matches = CTA_RE.findall(html)
    if len(cta_matches) != 2 or cta_matches[0] != cta_matches[1]:
        raise ValueError(f"Expected 2 identical section_cta blocks, got {len(cta_matches)}")
    shared_cta = cta_matches[0]

    en_start = html.index(EN_MAIN)
    fr_start = html.index(FR_MAIN)
    en_end_main = html.index("</main>", en_start)
    fr_end_main = html.index("</main>", fr_start)

    en_body = html[en_start + len(EN_MAIN) : en_end_main]
    fr_body = html[fr_start + len(FR_MAIN) : fr_end_main]

    en_body = CTA_RE.sub("", en_body, count=1)
    fr_body = CTA_RE.sub("", fr_body, count=1)

    footer_start = html.index('<div class="section_footer">', fr_end_main)
    script_start = html.index("<script", footer_start)
    footer_html = html[footer_start:script_start]

    new_middle = (
        SHELL_OPEN
        + EN_PANE
        + en_body
        + "</div>"
        + FR_PANE
        + fr_body
        + "</div>"
        + shared_cta
        + footer_html
        + "</main>"
    )

    out = html[:en_start] + new_middle + html[script_start:]
    out = out.replace(MAIN_QUERY_OLD, MAIN_QUERY_NEW)
    return out


def main() -> int:
    for slug in PAGES:
        path = ROOT / "operation-type" / f"{slug}.html"
        original = path.read_text(encoding="utf-8")
        updated = refactor(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"updated {path.relative_to(ROOT)}")
        else:
            print(f"unchanged {path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
