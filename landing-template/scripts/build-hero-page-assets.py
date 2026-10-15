#!/usr/bin/env python3
"""Build per-page hero JPEG/WebP variants (480–1280w) from page-specific masters."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HERO_ROOT = ROOT / "public" / "hero" / "pages"
SRC = ROOT / "public" / "hero"

# Unique master source + focal crop (x,y as 0–1 center) per marketing page slug.
PAGE_MASTERS: dict[str, tuple[str, tuple[float, float]]] = {
    "kleardata": ("kleardata-hero-source.jpg", (0.5, 0.5)),
    "klearhub": ("hero-trade-photo.jpg", (0.55, 0.45)),
    "managed-trade": ("hero-trade-photo.jpg", (0.35, 0.5)),
    "customs-brokers": ("customs-brokers-hero-source.jpg", (0.5, 0.5)),
    "freight-forwarders": ("freight-forwarders-hero-source.jpg", (0.5, 0.5)),
    "self-filers": ("self-filers-hero-source.jpg", (0.5, 0.5)),
    "trade-compliance": ("trade-compliance-hero-source.jpg", (0.5, 0.5)),
}

TARGET_W = 1280
TARGET_H = 704  # ~837×460 display aspect
WIDTHS = (480, 768, 960, 1280)


def crop_to_aspect(src: Path, dst: Path, cx: float, cy: float) -> None:
    try:
        from PIL import Image
    except ImportError:
        subprocess.run(["sips", "-z", str(TARGET_H), str(TARGET_W), str(src), "--out", str(dst)], check=True)
        return

    im = Image.open(src)
    w, h = im.size
    target_ratio = TARGET_W / TARGET_H
    src_ratio = w / h
    if src_ratio > target_ratio:
        crop_h = h
        crop_w = int(h * target_ratio)
    else:
        crop_w = w
        crop_h = int(w / target_ratio)
    left = int((w - crop_w) * cx)
    top = int((h - crop_h) * cy)
    left = max(0, min(left, w - crop_w))
    top = max(0, min(top, h - crop_h))
    box = (left, top, left + crop_w, top + crop_h)
    cropped = im.crop(box).resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(dst, "JPEG", quality=86, optimize=True)


def resize_width(src: Path, dst: Path, width: int) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["sips", "-Z", str(width), str(src), "--out", str(dst)], check=True, capture_output=True)


def to_webp(jpg: Path, webp: Path) -> None:
    subprocess.run(
        ["cwebp", "-q", "82", str(jpg), "-o", str(webp)],
        check=True,
        capture_output=True,
    )


def build_slug(slug: str, master_name: str, focal: tuple[float, float]) -> None:
    master_src = SRC / master_name
    if not master_src.is_file():
        raise SystemExit(f"Missing source: {master_src}")
    out_dir = HERO_ROOT / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    master_out = out_dir / "hero-1280.jpg"
    crop_to_aspect(master_src, master_out, focal[0], focal[1])
    for w in WIDTHS:
        jpg = out_dir / f"hero-{w}.jpg"
        if w == 1280:
            if jpg != master_out:
                jpg.write_bytes(master_out.read_bytes())
        else:
            resize_width(master_out, jpg, w)
        to_webp(jpg, out_dir / f"hero-{w}.webp")
    print(f"  {slug}: {out_dir.relative_to(ROOT)}")


def main() -> None:
    import sys

    slugs = sys.argv[1:] or list(PAGE_MASTERS.keys())
    print("Building hero page assets…")
    for slug in slugs:
        if slug not in PAGE_MASTERS:
            raise SystemExit(f"Unknown slug: {slug}")
        name, focal = PAGE_MASTERS[slug]
        build_slug(slug, name, focal)
    print("Done.")


if __name__ == "__main__":
    main()
