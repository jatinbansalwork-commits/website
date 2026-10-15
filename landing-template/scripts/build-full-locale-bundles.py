#!/usr/bin/env python3
"""Build static full-page translation bundles (en source text -> target language).

Run after copy changes:
  python3 scripts/build-full-locale-bundles.py
  python3 scripts/build-full-locale-bundles.py --pages index talk-to-klear
  python3 scripts/build-full-locale-bundles.py --langs fr nl es

Output: public/locale/bundles/{page-id}.{lang}.json
"""
from __future__ import annotations

import argparse
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "locale" / "bundles"
SKIP_RE = re.compile(r"^[\d\s.,+$%\-–—/|:;()]+$")


def page_id_from_path(path: Path) -> str:
    rel = path.relative_to(ROOT)
    if rel.name == "index.html":
        return "index"
    return str(rel.with_suffix("")).replace("/", "-")


def extract_strings(html: str) -> list[str]:
    """Extract text-node sized strings from <main> (aligned with runtime walker)."""
    from html.parser import HTMLParser

    m = re.search(r'<main class="main-wrapper">(.*)</main>', html, re.DOTALL)
    chunk = m.group(1) if m else html

    class Parser(HTMLParser):
        skip = 0
        out: list[str]

        def __init__(self) -> None:
            super().__init__()
            self.out = []

        def handle_starttag(self, tag: str, attrs) -> None:
            if tag in {"script", "style", "noscript", "svg"}:
                self.skip += 1

        def handle_endtag(self, tag: str) -> None:
            if tag in {"script", "style", "noscript", "svg"} and self.skip:
                self.skip -= 1

        def handle_data(self, data: str) -> None:
            if self.skip:
                return
            t = re.sub(r"\s+", " ", data).strip()
            if len(t) < 2 or len(t) > 480:
                return
            if SKIP_RE.match(t):
                return
            self.out.append(t)

    p = Parser()
    p.feed(chunk)
    seen: set[str] = set()
    uniq: list[str] = []
    for t in p.out:
        if t not in seen:
            seen.add(t)
            uniq.append(t)
    return uniq[:500]


def translate(text: str, lang: str) -> str:
    q = urllib.parse.urlencode({"q": text[:480], "langpair": f"en|{lang}"})
    url = f"https://api.mymemory.translated.net/get?{q}"
    with urllib.request.urlopen(url, timeout=30) as resp:
        data = json.loads(resp.read().decode())
    out = (data.get("responseData") or {}).get("translatedText") or text
    if "MYMEMORY WARNING" in out.upper():
        raise RuntimeError("MyMemory quota exceeded")
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pages", nargs="*", help="page ids (default: all html)")
    ap.add_argument("--langs", nargs="*", default=["fr", "nl", "es"])
    ap.add_argument("--delay", type=float, default=0.35)
    args = ap.parse_args()

    pages = sorted(p for p in ROOT.rglob("*.html") if "dist" not in p.parts and "node_modules" not in p.parts)
    OUT.mkdir(parents=True, exist_ok=True)

    for p in pages:
        pid = page_id_from_path(p)
        if args.pages and pid not in args.pages and p.stem not in args.pages:
            continue
        strings = extract_strings(p.read_text(encoding="utf-8"))
        print(f"{pid}: {len(strings)} strings")
        for lang in args.langs:
            bundle_path = OUT / f"{pid}.{lang}.json"
            bundle: dict[str, str] = {}
            if bundle_path.exists():
                bundle = json.loads(bundle_path.read_text(encoding="utf-8"))
            for i, s in enumerate(strings, 1):
                if s in bundle:
                    continue
                try:
                    bundle[s] = translate(s, lang)
                except Exception as exc:
                    print(f"  stop {lang} at {i}/{len(strings)}: {exc}")
                    break
                if i % 25 == 0:
                    bundle_path.write_text(
                        json.dumps(bundle, ensure_ascii=False, indent=2), encoding="utf-8"
                    )
                    print(f"  checkpoint {bundle_path.name} ({len(bundle)} entries)")
                time.sleep(args.delay)
            bundle_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"  wrote {bundle_path.name} ({len(bundle)} entries)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
