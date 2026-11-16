#!/usr/bin/env python3
"""Earth hero assets for live-dither — sync from KlearNow marketing-site or procedural fallback."""
from __future__ import annotations

import argparse
import shutil
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT_SRC = ROOT / "public/img/home-planet.webp"
OUT_POSTER = ROOT / "public/img/home-planet-poster.webp"
MARKETING_EARTH = ROOT / "scripts/assets/home-earth.webp"
MARKETING_POSTER = ROOT / "scripts/assets/home-earth-poster.webp"
DOTS_SOURCE = ROOT / "scripts/assets/hero-earth-dots.webp"

W, H = 1672, 941
CX, CY, R = 961, 430, 355
BG_LUM = 242.0

BAYER_8 = (
    np.array(
        [
            0, 48, 12, 60, 3, 51, 15, 63,
            32, 16, 44, 28, 35, 19, 47, 31,
            8, 56, 4, 52, 11, 59, 7, 55,
            40, 24, 36, 20, 43, 27, 39, 23,
            2, 50, 14, 62, 1, 49, 13, 61,
            34, 18, 46, 30, 33, 17, 45, 29,
            10, 58, 6, 54, 9, 57, 5, 53,
            42, 26, 38, 22, 41, 25, 37, 21,
        ],
        dtype=np.float32,
    ).reshape(8, 8)
    / 64.0
)

INK = np.array([242, 242, 242], dtype=np.float32)
BLUE = np.array([160, 210, 225], dtype=np.float32)
PALE = np.array([0, 93, 124], dtype=np.float32)


def copy_marketing_assets(earth: Path, poster: Path) -> None:
    if not earth.is_file() or not poster.is_file():
        raise SystemExit(
            f"Missing {earth} or {poster} — copy from "
            "~/Desktop/Untitled/marketing-site/assets/klearnow/"
        )
    OUT_SRC.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(earth, OUT_SRC)
    shutil.copy2(poster, OUT_POSTER)


def cover_crop_focal(
    im: Image.Image,
    out_w: int,
    out_h: int,
    src_fx: float,
    src_fy: float,
    dst_x: float,
    dst_y: float,
) -> Image.Image:
    sw, sh = im.size
    scale = max(out_w / sw, out_h / sh)
    rw, rh = int(round(sw * scale)), int(round(sh * scale))
    scaled = im.resize((rw, rh), Image.Resampling.LANCZOS)
    left = int(round(src_fx * scale - dst_x))
    top = int(round(src_fy * scale - dst_y))
    left = max(0, min(left, rw - out_w))
    top = max(0, min(top, rh - out_h))
    return scaled.crop((left, top, left + out_w, top + out_h))


def rgba_to_luminance(arr: np.ndarray) -> np.ndarray:
    rgb = arr[..., :3].astype(np.float32)
    a = arr[..., 3].astype(np.float32) / 255.0
    gray = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]
    return BG_LUM * (1.0 - a) + gray * a


def build_luminance_from_dots(source: Path) -> np.ndarray:
    im = Image.open(source).convert("RGBA")
    fw, fh = im.size
    cropped = cover_crop_focal(im, W, H, fw * 0.5, fh * 0.498, CX, CY)
    lum = rgba_to_luminance(np.array(cropped))
    smooth = Image.fromarray(np.clip(lum, 0, 255).astype(np.uint8))
    smooth = smooth.filter(ImageFilter.GaussianBlur(radius=1.2))
    return np.array(smooth, dtype=np.uint8)


def build_luminance_procedural() -> np.ndarray:
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    dx = (x - CX) / R
    dy = (y - CY) / R
    dist2 = dx * dx + dy * dy
    sphere = dist2 <= 1.0

    z = np.sqrt(np.clip(1.0 - dist2, 0.0, 1.0))
    light = np.array([-0.45, -0.25, 0.85], dtype=np.float32)
    light /= np.linalg.norm(light)
    diffuse = np.clip(dx * light[0] + dy * light[1] + z * light[2], 0.0, 1.0)

    lon = np.arctan2(dx, z + 1e-6)
    lat = np.arcsin(np.clip(dy, -1.0, 1.0))

    land_field = (
        0.55 * np.sin(lon * 2.4 + 0.6) * np.cos(lat * 1.8)
        + 0.35 * np.sin(lon * 1.1 - 0.9) * np.sin(lat * 2.9)
        + 0.25 * np.cos(lon * 3.3 + lat * 1.4)
        + 0.18 * np.sin(lon * 5.2) * np.cos(lat * 0.7)
    )
    land = sphere & (land_field > 0.08)
    clouds = sphere & (np.sin(lon * 4.5 + 1.2) * np.cos(lat * 3.1 + 0.4) > 0.62) & ~land

    img = np.zeros((H, W), dtype=np.float32)
    ocean = sphere & ~land
    img[ocean] = 0.22 + 0.58 * diffuse[ocean]
    img[land] = 0.12 + 0.52 * diffuse[land]
    img[clouds] = np.minimum(1.0, img[clouds] + 0.28)

    rim = sphere & (dist2 > 0.86) & (dist2 <= 1.0)
    img[rim] = np.maximum(img[rim], 0.78 + 0.18 * diffuse[rim])

    night = sphere & (diffuse < 0.22)
    img[night] *= 0.55 + diffuse[night] * 1.2

    return np.clip(img * 255.0, 0, 255).astype(np.uint8)


def dither_poster(lum: np.ndarray) -> np.ndarray:
    out = np.zeros((H, W, 3), dtype=np.uint8)
    cell = 3
    for y in range(0, H, cell):
        for x in range(0, W, cell):
            block = lum[y : y + cell, x : x + cell]
            if block.size == 0:
                continue
            level = float(block.mean()) / 255.0
            thr = BAYER_8[(y // cell) % 8, (x // cell) % 8]
            if level <= 0.02:
                rgb = INK
            elif level <= 0.55:
                rgb = BLUE if level > thr else INK
            else:
                base = BLUE if level * 0.55 > thr else INK
                rgb = PALE if level > thr else base
            out[y : y + cell, x : x + cell] = rgb.astype(np.uint8)
    return out


def write_generated(lum: np.ndarray) -> None:
    rgb = np.stack([lum, lum, lum], axis=-1)
    OUT_SRC.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgb).save(OUT_SRC, format="WEBP", quality=92, method=6)
    poster = dither_poster(lum)
    Image.fromarray(poster).save(OUT_POSTER, format="WEBP", quality=88, method=6)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        choices=("marketing", "procedural", "dots"),
        default="marketing",
        help="marketing = Legency Saturn luminance (default); dots/procedural = Earth experiments",
    )
    args = parser.parse_args()

    if args.source == "marketing":
        copy_marketing_assets(MARKETING_EARTH, MARKETING_POSTER)
    elif args.source == "dots":
        if not DOTS_SOURCE.is_file():
            raise SystemExit(f"Missing {DOTS_SOURCE}")
        write_generated(build_luminance_from_dots(DOTS_SOURCE))
    else:
        write_generated(build_luminance_procedural())

    print(f"source={args.source} Wrote {OUT_SRC.relative_to(ROOT)}")
    print(f"Wrote {OUT_POSTER.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
