#!/usr/bin/env python3
"""Page-by-page section polish: backgrounds, dedupe, KlearNow copy fixes."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSET_VER = "20260934"

FREIGHT_IDEAL_RICHTEXT = (
    '<div class="w-richtext"><p>This platform is ideal for freight forwarders and NVOCC teams '
    "that coordinate customs, documents, and client updates across many shipments. "
    "It works especially well if you:</p><ul role=\"list\"><li>Move high volumes of entries "
    "and need faster, cleaner handoffs to brokers and clients.</li><li>Want one place to track "
    "documents, holds, and clearance status across lanes and brokers.</li><li>Need to scale "
    "throughput without adding coordinators for every new account or region.</li></ul></div>"
)

COPY_REPLACEMENTS = [
    ("When to use KlearHub Clearance Software", "When to use KlearNow clearance software"),
    ("When to use KlearHub software", "When to use KlearNow"),
    ("When to use KlearHub", "When to use KlearNow"),
    ("Quand utiliser le logiciel de dédouanement KlearHub", "Quand utiliser le logiciel de dédouanement KlearNow"),
    ("Quand utiliser le logiciel KlearHub", "Quand utiliser KlearNow"),
    ("Quand utiliser KlearHub", "Quand utiliser KlearNow"),
]

HERO_DUP_CSS = re.compile(
    r"/\*[^\n]*hero[^\n]*\*/\s*"
    r"\.section_hero\.background-color-white\s*\{[^}]+\}\s*"
    r"\.section_hero\.background-color-white::after\s*\{[^}]+\}\s*"
    r"\.section_hero \.hero_background-image\.is-earth-dots\s*\{[^}]+\}\s*"
    r"\.section_hero \.hero_padding,\s*"
    r"\.section_hero \.hero_text,\s*"
    r"\.section_hero \.container-large\s*\{[^}]+\}\s*",
    re.S,
)


def remove_top_level_div(html: str, class_substr: str) -> str:
    while True:
        m = re.search(
            rf'<div[^>]*class="[^"]*{re.escape(class_substr)}[^"]*"[^>]*>',
            html,
        )
        if not m:
            return html
        start = m.start()
        depth = 0
        i = start
        n = len(html)
        removed = False
        while i < n:
            if html.startswith("<div", i):
                depth += 1
                gt = html.find(">", i)
                if gt == -1:
                    return html
                i = gt + 1
            elif html.startswith("</div>", i):
                depth -= 1
                i += 6
                if depth == 0:
                    html = html[:start] + html[i:]
                    removed = True
                    break
            else:
                i += 1
        if not removed:
            return html


def add_class_once(class_attr: str, token: str) -> str:
    if token in class_attr.split():
        return class_attr
    return f"{class_attr.strip()} {token}"


def nth_replace_class(html: str, class_prefix: str, token: str, n: int) -> str:
    count = 0

    def repl(m: re.Match[str]) -> str:
        nonlocal count
        count += 1
        cls = m.group(1)
        if count == n and token not in cls.split():
            cls = add_class_once(cls, token)
        return f'class="{cls}"'

    pat = re.compile(rf'class="({re.escape(class_prefix)}[^"]*)"')
    return pat.sub(repl, html)


def ensure_beige_on_class(html: str, class_prefix: str) -> str:
    def repl(m: re.Match[str]) -> str:
        cls = m.group(1)
        if "background-color-beige" not in cls.split():
            cls = add_class_once(cls, "background-color-beige")
        return f'class="{cls}"'

    pat = re.compile(rf'class="({re.escape(class_prefix)}[^"]*)"')
    return pat.sub(repl, html)


def dedupe_licensed_broker(chunk: str) -> str:
    marker = "section_support-you is-licensed-broker"
    while chunk.count(marker) > 1:
        first = chunk.find(marker)
        second = chunk.find(marker, first + 1)
        if second == -1:
            break
        start = chunk.rfind("<div", 0, second)
        sub = chunk[start:]
        new_sub = remove_top_level_div(sub, marker)
        if new_sub == sub:
            break
        chunk = chunk[:start] + new_sub
    return chunk


def polish_operation_main(
    chunk: str,
    *,
    skip_self_filers_band_beige: bool = False,
    skip_product_overview_beige: bool = False,
    skip_second_support_you_beige: bool = False,
    skip_klearhub_heading_copy: bool = False,
) -> str:
    chunk = remove_top_level_div(chunk, "is-klearhub-duplicate")
    chunk = dedupe_licensed_broker(chunk)
    # Second top-level support-you band → beige (challenge / depth section)
    if not skip_self_filers_band_beige and not skip_second_support_you_beige:
        chunk = nth_replace_class(chunk, "section_support-you", "background-color-beige", 2)
    if not skip_self_filers_band_beige and not skip_product_overview_beige:
        chunk = ensure_beige_on_class(chunk, "section_product-overview")
    chunk = ensure_beige_on_class(chunk, "section_how-switch")
    if not skip_klearhub_heading_copy:
        for old, new in COPY_REPLACEMENTS:
            chunk = chunk.replace(old, new)
    if "inland transport companies" in chunk:
        chunk = re.sub(
            r'<div class="w-richtext"><p>This platform is ideal for inland transport companies.*?</div>',
            FREIGHT_IDEAL_RICHTEXT,
            chunk,
            count=0,
            flags=re.S,
        )
    return chunk


def polish_operation_page(html: str, *, page_rel: str = "") -> str:
    skip_self_filers = "self-filers" in page_rel
    skip_product_overview_beige = (
        skip_self_filers
        or "trade-compliance" in page_rel
        or "freight-forwarders" in page_rel
        or "customs-brokers" in page_rel
    )
    skip_second_support_you_beige = (
        skip_self_filers
        or "freight-forwarders" in page_rel
        or "customs-brokers" in page_rel
        or "trade-compliance" in page_rel
    )
    for label, start, end in (
        ("en", r'<main class="main-wrapper is_en-only">', r'<main class="main-wrapper is_fr-only">'),
        ("fr", r'<main class="main-wrapper is_fr-only">', r"</main>"),
    ):
        m = re.search(start, html)
        if not m:
            continue
        m2 = re.search(end, html[m.end() :])
        if not m2:
            continue
        block = html[m.start() : m.end() + m2.start()]
        polished = polish_operation_main(
            block,
            skip_self_filers_band_beige=skip_self_filers,
            skip_product_overview_beige=skip_product_overview_beige,
            skip_second_support_you_beige=skip_second_support_you_beige,
            skip_klearhub_heading_copy="freight-forwarders" in page_rel
            or "trade-compliance" in page_rel
            or "self-filers" in page_rel,
        )
        html = html[: m.start()] + polished + html[m.end() + m2.start() :]
    return html


def polish_index(html: str) -> str:
    # Homepage trade-stack band stays white; card tints handle contrast (not full beige section).
    html = html.replace(
        'class="section_support-platform background-color-beige"',
        'class="section_support-platform"',
    )
    html = html.replace(
        'class="section_nomenclature background-color-beige"',
        'class="section_nomenclature"',
    )
    return html


def remove_kleardata_stray_testimonial_band(html: str) -> str:
    """Remove beige product-detailled band that incorrectly duplicates testimonials."""
    while True:
        m = re.search(
            r'<div[^>]*class="section_product-detailled background-color-beige[^"]*"[^>]*>',
            html,
        )
        if not m:
            break
        start = m.start()
        depth = 0
        i = start
        end = None
        while i < len(html):
            if html.startswith("<div", i):
                depth += 1
                i = html.find(">", i) + 1
            elif html.startswith("</div>", i):
                depth -= 1
                i += 6
                if depth == 0:
                    end = i
                    break
            else:
                i += 1
        if end is None:
            break
        segment = html[start:end]
        if "What customers say" not in segment:
            break
        html = html[:start] + html[end:]
    return html


def bump_asset_version(html: str) -> str:
    html = re.sub(
        r"klearnow-spacing\.css\?v=\d+",
        f"klearnow-spacing.css?v={ASSET_VER}",
        html,
    )
    html = re.sub(
        r"klearnow-boot\.js\?v=\d+",
        f"klearnow-boot.js?v={ASSET_VER}",
        html,
    )
    return html


def strip_duplicate_hero_css(html: str) -> str:
    return HERO_DUP_CSS.sub("", html)


def main() -> None:
    changed = []
    for path in sorted(ROOT.glob("**/*.html")):
        original = path.read_text(encoding="utf-8")
        updated = original
        rel = path.relative_to(ROOT)

        updated = strip_duplicate_hero_css(updated)
        updated = bump_asset_version(updated)

        if rel.parts[0] == "operation-type":
            updated = polish_operation_page(updated, page_rel=str(rel))
        elif rel.name == "index.html":
            updated = polish_index(updated)
        elif rel.name == "kleardata.html":
            updated = remove_kleardata_stray_testimonial_band(updated)

        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed.append(rel)

    print("Updated", len(changed), "files")
    for c in changed:
        print(" ", c)


if __name__ == "__main__":
    main()
