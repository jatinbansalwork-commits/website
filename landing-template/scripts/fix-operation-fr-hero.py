#!/usr/bin/env python3
"""Fix unbalanced FR hero markup on operation-type pages (orphaned testimonial/footer)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "freight-forwarders",
    "trade-compliance",
    "self-filers",
]

HERO_RE = re.compile(
    r"(<section class=\"section_hero.*?</section>)",
    re.DOTALL,
)


def extract_hero(html: str, locale: str) -> str | None:
    start = html.find(f'<div class="kn-locale-pane is_{locale}-only">')
    if start < 0:
        return None
    chunk = html[start : start + 25_000]
    m = HERO_RE.search(chunk)
    return m.group(1) if m else None


def hero_copy(html: str, locale: str) -> dict[str, str]:
    hero = extract_hero(html, locale)
    if not hero:
        return {}
    out: dict[str, str] = {}
    tab = re.search(
        r"<div class=\"tab-pane_logo-container\">.*?<div>([^<]+)</div>",
        hero,
        re.DOTALL,
    )
    h1 = re.search(r"<h1 class=\"titre[^\"]*\">([^<]+)</h1>", hero)
    sub = re.search(
        r"<h1 class=\"titre[^\"]*\">[^<]+</h1><div class=\"text-size-regular\">([^<]*)</div>",
        hero,
    )
    if tab:
        out["tab"] = tab.group(1)
    if h1:
        out["h1"] = h1.group(1)
    if sub:
        out["sub"] = sub.group(1)
    demo = re.search(
        r"class=\"button-v2 w-button\">([^<]+)</a>",
        hero,
    )
    if demo:
        out["demo_label"] = demo.group(1)
    contact = re.search(
        r"class=\"button-v2 is-icon is-large is-tertiary w-inline-block\"><div>([^<]+)</div>",
        hero,
    )
    if contact:
        out["contact_label"] = contact.group(1)
    return out


def div_balance(fragment: str) -> int:
    return len(re.findall(r"<div[\s>]", fragment)) - fragment.count("</div>")


def fix_page(name: str) -> bool:
    path = ROOT / "operation-type" / f"{name}.html"
    html = path.read_text(encoding="utf-8")
    en_hero = extract_hero(html, "en")
    fr_hero = extract_hero(html, "fr")
    if not en_hero or not fr_hero:
        print(f"{name}: missing EN or FR hero", file=sys.stderr)
        return False
    if div_balance(en_hero) != 0:
        print(f"{name}: EN hero not balanced ({div_balance(en_hero)})", file=sys.stderr)
        return False
    if div_balance(fr_hero) == 0:
        print(f"{name}: FR hero already balanced")
        return False

    en_copy = hero_copy(html, "en")
    fr_copy = hero_copy(html, "fr")
    new_fr = en_hero
    for key in ("tab", "h1", "sub"):
        if key in en_copy and key in fr_copy and en_copy[key] != fr_copy[key]:
            new_fr = new_fr.replace(en_copy[key], fr_copy[key], 1)
    if "demo_label" in en_copy and "demo_label" in fr_copy:
        new_fr = new_fr.replace(en_copy["demo_label"], fr_copy["demo_label"], 1)
    if "contact_label" in en_copy and "contact_label" in fr_copy:
        new_fr = new_fr.replace(en_copy["contact_label"], fr_copy["contact_label"], 1)

    if div_balance(new_fr) != 0:
        print(f"{name}: rebuilt FR hero still unbalanced ({div_balance(new_fr)})", file=sys.stderr)
        return False

    updated = html.replace(fr_hero, new_fr, 1)
    if updated == html:
        print(f"{name}: replace failed", file=sys.stderr)
        return False
    path.write_text(updated, encoding="utf-8")
    print(f"{name}: fixed FR hero (div balance {div_balance(fr_hero)} -> 0)")
    return True


def main() -> int:
    ok = all(fix_page(p) for p in PAGES)
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
