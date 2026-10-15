#!/usr/bin/env python3
"""Embed ASSET_VERSION on /hero/pages/* URLs in HTML (first paint, before boot.js)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BOOT = ROOT / "public" / "klearnow-boot.js"
HERO_PATH = re.compile(r"(/hero/pages/[^\s\"'?]+(?:\.(?:jpg|webp)))(?:\?v=[^,\s\"']+)?")


def read_asset_version() -> str:
    text = BOOT.read_text(encoding="utf-8")
    m = re.search(r"ASSET_VERSION = '(\d+)'", text)
    if not m:
        raise SystemExit("ASSET_VERSION not found in klearnow-boot.js")
    return m.group(1)


def version_hero_urls(text: str, ver: str) -> str:
    return HERO_PATH.sub(rf"\1?v={ver}", text)


def main() -> None:
    ver = read_asset_version()
    n_files = 0
    for path in ROOT.rglob("*.html"):
        if "node_modules" in path.parts or "dist" in path.parts:
            continue
        raw = path.read_text(encoding="utf-8")
        if "/hero/pages/" not in raw:
            continue
        updated = version_hero_urls(raw, ver)
        if updated != raw:
            path.write_text(updated, encoding="utf-8")
            n_files += 1
    print(f"Synced hero ?v={ver} in {n_files} HTML file(s)")


if __name__ == "__main__":
    main()
