#!/usr/bin/env python3
"""Remove hero <picture> / photos; keep gestion-des-cessions placeholder shells."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PICTURE = re.compile(r"<picture class=\"optype-hero-picture\">.*?</picture>", re.S)
STANDALONE_IMG = re.compile(
    r'<img class="optype-hero-photo"[^>]*/>',
    re.S,
)
VISUAL_CLASS = re.compile(
    r"(<div class=\"hero-industries_image-placeholder hero_image-container gestion-des-cessions-page) optype-hero-visual"
)


def strip_hero_photos(text: str) -> tuple[str, int]:
    n = 0
    new, c = PICTURE.subn("", text)
    n += c
    new, c2 = STANDALONE_IMG.subn("", new)
    n += c2
    new = VISUAL_CLASS.sub(r"\1 is-empty-hero", new)
    return new, n


def main() -> None:
    total = 0
    for path in sorted(ROOT.rglob("*.html")):
        if "node_modules" in path.parts or "dist" in path.parts:
            continue
        raw = path.read_text(encoding="utf-8")
        if "optype-hero-picture" not in raw and "optype-hero-photo" not in raw:
            continue
        updated, n = strip_hero_photos(raw)
        if n and updated != raw:
            path.write_text(updated, encoding="utf-8")
            print(f"{path.relative_to(ROOT)}: removed {n} hero photo(s)")
            total += n
    print(f"Done ({total} blocks).")


if __name__ == "__main__":
    main()
