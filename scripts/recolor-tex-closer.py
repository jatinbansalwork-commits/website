#!/usr/bin/env python3
"""Map electric-blue dither in tex-closer.png to KlearNow teal (#005d7c)."""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/img/tex-closer.png"


def recolor(path: Path) -> None:
    arr = np.array(Image.open(path).convert("RGBA"))
    b = arr[..., 2].astype(np.float32)
    mask = b > 8
    arr[..., 0] = 0
    arr[..., 1] = np.where(mask, np.round(b * 93 / 255), 0).astype(np.uint8)
    arr[..., 2] = np.where(mask, np.round(b * 124 / 255), 0).astype(np.uint8)
    Image.fromarray(arr).save(path)


def main() -> None:
    if not OUT.is_file():
        raise SystemExit(f"missing {OUT}")
    recolor(OUT)
    print(f"Recolored {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
