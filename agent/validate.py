"""Validate data/weekly.json before it is committed.

Usage: python agent/validate.py [path]   (default: data/weekly.json)
Exit code 0 = OK, 1 = problems (printed).
"""

from __future__ import annotations

import json
import sys
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ("visit.tel-aviv.gov.il", "secrettelaviv.com", "chillz.co.il")
CATEGORIES = ("food", "culture", "nightlife")
IMAGE_HOSTS = ("images.unsplash.com", "unsplash.com", "images.pexels.com", "upload.wikimedia.org", "commons.wikimedia.org")
BLOCKED_IMAGE_HOSTS = SOURCES + ("instagram.com", "cdninstagram.com", "facebook.com", "fbcdn.net", "tiktok.com", "x.com", "twitter.com")
LANGS = ("en", "de", "fr")
MIN_ITEMS = 5


def d(s):
    return date.fromisoformat(s) if s else None


def main() -> int:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "data" / "weekly.json"
    errors: list[str] = []
    try:
        w = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        print(f"cannot read {path}: {e}")
        return 1

    for key in ("generated_at", "window_start", "window_end", "items"):
        if key not in w:
            errors.append(f"missing top-level key: {key}")
    if errors:
        print("\n".join(errors))
        return 1

    start, end = d(w["window_start"]), d(w["window_end"])
    per_cat = {c: 0 for c in CATEGORIES}
    for i, it in enumerate(w["items"]):
        where = f"items[{i}]"
        if it.get("category") not in CATEGORIES:
            errors.append(f"{where}: bad category {it.get('category')!r}")
        else:
            per_cat[it["category"]] += 1
        for field in ("title", "blurb"):
            val = it.get(field)
            if not isinstance(val, dict) or any(not val.get(l, "").strip() for l in LANGS):
                errors.append(f"{where}: {field} must have non-empty en/de/fr")
        host = (urlparse(it.get("url", "")).hostname or "").lower()
        if urlparse(it.get("url", "")).scheme != "https" or not any(host == s or host.endswith("." + s) for s in SOURCES):
            errors.append(f"{where}: url not from an allowed source: {it.get('url')!r}")
        img = it.get("image")
        if img is not None:
            u = urlparse(str(img))
            ihost = (u.hostname or "").lower()
            if u.scheme != "https":
                errors.append(f"{where}: image must be https or null")
            elif any(ihost == b or ihost.endswith("." + b) for b in BLOCKED_IMAGE_HOSTS):
                errors.append(f"{where}: image from a forbidden host: {ihost}")
            elif not any(ihost == h or ihost.endswith("." + h) for h in IMAGE_HOSTS) and not it.get("image_credit"):
                errors.append(f"{where}: image from {ihost} needs an image_credit with the licence")
            if not str(it.get("image_credit") or "").strip():
                errors.append(f"{where}: image_credit required when image is set")
        try:
            ds, de = d(it.get("date_start")), d(it.get("date_end"))
        except ValueError:
            errors.append(f"{where}: dates must be YYYY-MM-DD")
            continue
        if ds and (ds > end or (de or ds) < start):
            errors.append(f"{where}: outside window {start}..{end}: {ds}..{de or ds}")
        if de and ds and de < ds:
            errors.append(f"{where}: date_end before date_start")
        if de and not ds:
            errors.append(f"{where}: date_end without date_start")

    if len(w["items"]) < MIN_ITEMS:
        errors.append(f"only {len(w['items'])} items (need at least {MIN_ITEMS})")
    empty = [c for c, n in per_cat.items() if n == 0]
    if empty:
        errors.append(f"no items in: {', '.join(empty)}")

    if errors:
        print("\n".join(errors))
        return 1
    print(f"OK: {len(w['items'])} items ({per_cat}), window {start}..{end}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
