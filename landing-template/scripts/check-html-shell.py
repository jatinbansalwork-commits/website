#!/usr/bin/env python3
"""Fail build when product-page HTML has broken section shells (narrow lower sections)."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Product pages are hand-edited most often; keep the gate focused so legacy pages do not block builds.
HTML_GLOBS = ("product/*.html",)

TAG_RE = re.compile(r"<(/?)(div|section|main|aside)\b[^>]*>", re.I)


def strip_non_markup(html: str) -> str:
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S | re.I)
    html = re.sub(r"<style\b[^>]*>.*?</style>", "", html, flags=re.S | re.I)
    return html


def class_attr(tag: str) -> str:
    m = re.search(r'\bclass="([^"]*)"', tag, re.I)
    return m.group(1) if m else ""


def check_file(path: Path) -> list[str]:
    raw = path.read_text(encoding="utf-8")
    body_m = re.search(r"<body\b[^>]*>(.*)</body>", raw, flags=re.S | re.I)
    if not body_m:
        return [f"{path}: missing <body>"]

    body = strip_non_markup(body_m.group(1))
    errors: list[str] = []
    stack: list[tuple[str, str]] = []

    for m in TAG_RE.finditer(body):
        token = m.group(0)
        if token.rstrip().endswith("/>"):
            continue
        closing = m.group(1) == "/"
        tag = m.group(2).lower()
        if closing:
            if not stack:
                errors.append(f"{path}: unexpected </{tag}> (extra closing tag)")
            else:
                stack.pop()
            continue

        classes = class_attr(token)
        stack.append((tag, classes))

        if "section_results" in classes:
            trapped = [
                c
                for t, c in stack
                if t == "div"
                and (
                    "section_product-detailled" in c
                    or "section_before-after" in c
                    or ("padding-section-medium" in c and "section_product-detailled" in body[: m.start()])
                )
            ]
            if trapped:
                errors.append(
                    f"{path}: section_results is nested inside an unclosed shell "
                    f"({trapped[-1][:72]}). Close section_product-detailled before section_results."
                )

    if stack:
        tail = ", ".join(f"{t}[{c[:48]}]" for t, c in stack[-6:])
        errors.append(f"{path}: {len(stack)} unclosed container(s) at </body>: {tail}")

    return errors


def main() -> int:
    paths: list[Path] = []
    for pattern in HTML_GLOBS:
        paths.extend(sorted(ROOT.glob(pattern)))

    all_errors: list[str] = []
    for path in paths:
        all_errors.extend(check_file(path))

    if all_errors:
        print("HTML shell check failed:\n", file=sys.stderr)
        for err in all_errors:
            print(f"  • {err}", file=sys.stderr)
        return 1

    print(f"HTML shell OK ({len(paths)} product pages).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
