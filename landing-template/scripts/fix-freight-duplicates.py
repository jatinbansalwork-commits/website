#!/usr/bin/env python3
"""Remove duplicated KlearHub blocks on freight-forwarders and match customs-brokers section order."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "operation-type" / "freight-forwarders.html"


def remove_balanced_div(html: str, start: int) -> str:
    """Remove outer <div>...</div> starting at `start` (must point at '<div')."""
    if not html.startswith("<div", start):
        raise ValueError("start must be opening div")
    pos = start
    depth = 0
    while pos < len(html):
        if html.startswith("<div", pos):
            depth += 1
            gt = html.find(">", pos)
            if gt == -1:
                break
            pos = gt + 1
            continue
        if html.startswith("</div>", pos):
            depth -= 1
            pos += len("</div>")
            if depth == 0:
                return html[:start] + html[pos:]
            continue
        pos += 1
    raise ValueError("unbalanced div")


def strip_klearhub_duplicates(chunk: str) -> str:
    marker = '<div class="section_results version-features is-freight-audience is-klearhub-duplicate">'
    while marker in chunk:
        start = chunk.find(marker)
        chunk = remove_balanced_div(chunk, start)
    return chunk


def extract_section(chunk: str, class_prefix: str) -> tuple[str, str, str] | None:
    """Return (before, section_html, after) for first matching top-level section div."""
    m = re.search(
        rf'<div class="{re.escape(class_prefix)}[^"]*">',
        chunk,
    )
    if not m:
        return None
    start = m.start()
    section = remove_balanced_div.__doc__  # silence linter
    before = chunk[:start]
    rest = chunk[start:]
    # peel one div
    pos = 0
    depth = 0
    while pos < len(rest):
        if rest.startswith("<div", pos):
            depth += 1
            gt = rest.find(">", pos)
            if gt == -1:
                return None
            pos = gt + 1
        elif rest.startswith("</div>", pos):
            depth -= 1
            pos += 6
            if depth == 0:
                section_html = rest[:pos]
                after = rest[pos:]
                return before, section_html, after
        else:
            pos += 1
    return None


def reorder_when_to_use(chunk: str) -> str:
    """Licensed-broker block before When-to-use results (matches customs-brokers)."""
    licensed_marker = '<div class="section_support-you is-licensed-broker">'
    results_marker = '<div class="section_results version-features is-freight-audience">'
    li = chunk.find(licensed_marker)
    ri = chunk.find(results_marker)
    if li == -1 or ri == -1 or ri > li:
        return chunk

    before_results = chunk[:ri]
    rest = chunk[ri:]
    got = extract_section(rest, "section_results version-features is-freight-audience")
    if not got:
        return chunk
    _, results_html, after_results = got

    got2 = extract_section(after_results, "section_support-you is-licensed-broker")
    if not got2:
        return chunk
    _, licensed_html, tail = got2

    return before_results + licensed_html + results_html + tail


def main_bounds(html: str, which: str) -> tuple[int, int] | None:
    if which == "en":
        start = html.find('<main class="main-wrapper is_en-only">')
        end = html.find('<main class="main-wrapper is_fr-only">')
    else:
        start = html.find('<main class="main-wrapper is_fr-only">')
        footer = html.find('<div class="section_footer">', start)
        if start == -1 or footer == -1:
            return None
        end = html.rfind("</main>", start, footer)
        if end == -1:
            return None
        end += len("</main>")
    if start == -1 or end == -1 or end <= start:
        return None
    return start, end


def fix_main_block(html: str, which: str) -> str:
    bounds = main_bounds(html, which)
    if not bounds:
        return html
    m, m_end = bounds
    chunk = html[m:m_end]
    updated = strip_klearhub_duplicates(chunk)
    updated = reorder_when_to_use(updated)
    if updated == chunk:
        return html
    return html[:m] + updated + html[m_end:]


def main() -> None:
    html = PATH.read_text(encoding="utf-8")
    updated = fix_main_block(html, "en")
    updated = fix_main_block(updated, "fr")
    if updated != html:
        PATH.write_text(updated, encoding="utf-8")
        print("updated", PATH.relative_to(ROOT))
    else:
        print("no changes")


if __name__ == "__main__":
    main()
