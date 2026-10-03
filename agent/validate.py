"""Validate the guide's data files before they are committed.

Usage:
    python agent/validate.py [path]      validate a weekly file (default: data/weekly.json)
    python agent/validate.py house       check content/house.json for leftover placeholders / secrets
Exit code 0 = OK, 1 = problems (printed).

The checks are deliberately strict: the weekly file is written by an automated agent
that reads untrusted web pages, so nothing here relies on the agent having followed its
instructions.
"""

from __future__ import annotations

import json
import re
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ("visit.tel-aviv.gov.il", "secrettelaviv.com", "chillz.com")
CATEGORIES = ("food", "culture", "nightlife")
IMAGE_HOSTS = ("images.unsplash.com", "unsplash.com", "images.pexels.com", "upload.wikimedia.org", "commons.wikimedia.org")
BLOCKED_IMAGE_HOSTS = SOURCES + ("instagram.com", "cdninstagram.com", "facebook.com", "fbcdn.net", "tiktok.com", "x.com", "twitter.com")
LANGS = ("en", "de", "fr")
MIN_ITEMS = 5
MAX_AGE_DAYS = 3          # generated_at must be recent: the file is produced right before commit
MAX_TITLE = 90
MAX_BLURB = 400
TIME_RE = re.compile(r"^([01]\d|2[0-3]):[0-5]\d$")
SUSPICIOUS = re.compile(r"<[a-z/!]|javascript:|https?://|\bignore (all|previous|the above)\b|\byou are\b", re.I)


def text_ok(where, field, val, limit, errors):
    """Titles/blurbs must be plain prose: no markup, no links, no instruction-like text."""
    if len(val) > limit:
        errors.append(f"{where}: {field} too long ({len(val)} > {limit})")
    if SUSPICIOUS.search(val):
        errors.append(f"{where}: {field} contains markup, a link or instruction-like text")


def check_house(path: Path) -> int:
    """Fail if the apartment content still has placeholders or looks like it leaked a secret."""
    raw = path.read_text(encoding="utf-8")
    problems = []
    for pat, msg in ((r"TODO", "placeholder text 'TODO'"), (r"000-0000", "dummy phone number"),
                     (r"airbnb\.com/calendar/ical", "Airbnb iCal URL"), (r"\?s=[0-9a-f]{20,}", "calendar secret")):
        for m in re.finditer(pat, raw):
            line = raw.count("\n", 0, m.start()) + 1
            problems.append(f"{path}:{line}: {msg}")
    # Rule (Oren, 3.10): every place we send a guest to (restaurant, bar, gym, market, shop) has a Google Maps link.
    import json as _json
    def _walk(o, trail=""):
        if isinstance(o, dict):
            if "name" in o and "where" in o:
                u = o.get("url")
                if not (isinstance(u, str) and ("google.com/maps" in u or "maps.app.goo.gl" in u)):
                    problems.append(f"{path}: '{o['name']}' ({trail}) has no Google Maps url")
            for k, v in o.items():
                _walk(v, trail + "/" + k)
        elif isinstance(o, list):
            for i, v in enumerate(o):
                _walk(v, trail + f"[{i}]")
    try:
        _walk(_json.loads(raw))
    except ValueError:
        pass
    # The page is rendered by one JS file: a syntax error blanks the whole guide. Check it too.
    import subprocess, shutil
    js = ROOT / "assets" / "app.js"
    if shutil.which("node"):
        r = subprocess.run(["node", "--check", str(js)], capture_output=True, text=True)
        if r.returncode != 0:
            problems.append(f"{js}: JavaScript syntax error\n{r.stderr.strip()[:400]}")
    print("\n".join(problems) if problems else f"OK: {path} has no placeholders or secrets; app.js parses")
    return 1 if problems else 0


def d(s):
    return date.fromisoformat(s) if s else None


HH_BARS = ("Berlin", "Mezcal", "Alpaca Bar", "La Tigra")
HH_HOURS = re.compile(r"^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$")


def check_checks(path: Path, errors: list) -> None:
    """data/checks.json: the weekly happy-hour comparison. Fixed vocabulary only - a later
    session reads this file, so nothing free-form from a web page may land in it."""
    if not path.exists():
        return
    try:
        c = json.loads(path.read_text(encoding="utf-8"))
        hh = c["happy_hour"]
        date.fromisoformat(hh["checked"])
    except (OSError, ValueError, KeyError, TypeError) as e:
        errors.append(f"checks.json: unreadable or missing happy_hour.checked: {e}")
        return
    if set(c) != {"happy_hour"} or set(hh) - {"checked", "status", "changes"}:
        errors.append("checks.json: unexpected keys")
    if hh.get("status") not in ("unchanged", "changed", "not_checked"):
        errors.append("checks.json: status must be unchanged / changed / not_checked")
    changes = hh.get("changes") or []
    if hh.get("status") == "changed" and not changes:
        errors.append("checks.json: status 'changed' needs at least one change")
    if hh.get("status") != "changed" and changes:
        errors.append("checks.json: changes only allowed with status 'changed'")
    for i, ch in enumerate(changes):
        if not isinstance(ch, dict) or set(ch) - {"bar", "hours", "drinks_percent", "food_percent", "missing"}:
            errors.append(f"checks.json: changes[{i}] has unexpected keys")
            continue
        if ch.get("bar") not in HH_BARS:
            errors.append(f"checks.json: changes[{i}].bar must be one of {HH_BARS}")
        if ch.get("hours") is not None and not HH_HOURS.match(str(ch["hours"])):
            errors.append(f"checks.json: changes[{i}].hours must be HH:MM-HH:MM or null")
        for k in ("drinks_percent", "food_percent"):
            if ch.get(k) is not None and not (isinstance(ch[k], int) and 0 <= ch[k] <= 100):
                errors.append(f"checks.json: changes[{i}].{k} must be 0-100 or null")
        if ch.get("missing") not in (None, True, False):
            errors.append(f"checks.json: changes[{i}].missing must be true/false")


def main() -> int:
    if len(sys.argv) > 1 and sys.argv[1] == "house":
        return check_house(ROOT / "content" / "house.json")
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

    try:
        start, end = d(w["window_start"]), d(w["window_end"])
        gen = datetime.fromisoformat(w["generated_at"])
    except (ValueError, TypeError) as e:
        print(f"bad window/generated_at: {e}")
        return 1
    if gen.tzinfo is None:
        errors.append("generated_at must carry a timezone offset")
    else:
        age = datetime.now(timezone.utc) - gen.astimezone(timezone.utc)
        if age > timedelta(days=MAX_AGE_DAYS) or age < timedelta(days=-1):
            errors.append(f"generated_at is {age.days} days old (max {MAX_AGE_DAYS}) - stale or wrong clock")
    if not (start <= end <= start + timedelta(days=28)):
        errors.append(f"window {start}..{end} is not a sane 0-28 day range")
    per_cat = {c: 0 for c in CATEGORIES}
    for i, it in enumerate(w["items"]):
        where = f"items[{i}]"
        if it.get("category") not in CATEGORIES:
            errors.append(f"{where}: bad category {it.get('category')!r}")
        else:
            per_cat[it["category"]] += 1
        for field, limit in (("title", MAX_TITLE), ("blurb", MAX_BLURB)):
            val = it.get(field)
            if not isinstance(val, dict) or any(not str(val.get(l, "")).strip() for l in LANGS):
                errors.append(f"{where}: {field} must have non-empty en/de/fr")
            else:
                for l in LANGS:
                    text_ok(where, f"{field}.{l}", str(val[l]), limit, errors)
        for field in ("venue", "area", "price", "image_credit"):
            if it.get(field) is not None:
                text_ok(where, field, str(it[field]), 120, errors)
        if it.get("time") is not None and not TIME_RE.match(str(it["time"])):
            errors.append(f"{where}: time must be HH:MM (24h) or null, got {it['time']!r}")
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
            elif not any(ihost == h or ihost.endswith("." + h) for h in IMAGE_HOSTS):
                # A venue's own "free to use" photo needs an explicit licence URL, not just a credit line.
                lic = str(it.get("image_license_url") or "")
                if not lic.startswith("https://"):
                    errors.append(f"{where}: image from {ihost} is not an approved host; needs image_license_url (https) proving it is free to use")
            credit = str(it.get("image_credit") or "").strip()
            if len(credit) < 6 or credit.lower() in ("photo", "image", "stock", "n/a", "none"):
                errors.append(f"{where}: image_credit must name the photographer/source (got {credit!r})")
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

    for i, h in enumerate(w.get("headsup") or []):
        where = f"headsup[{i}]"
        txt = h.get("text")
        if not isinstance(txt, dict) or any(not str(txt.get(l, "")).strip() for l in LANGS):
            errors.append(f"{where}: text must have non-empty en/de/fr")
        else:
            for l in LANGS:
                text_ok(where, f"text.{l}", str(txt[l]), 300, errors)
        if len(str(h.get("icon", ""))) > 4:
            errors.append(f"{where}: icon must be a single emoji")
    if len(w.get("headsup") or []) > 4:
        errors.append("headsup: at most 4 notes")

    if len(w["items"]) < MIN_ITEMS:
        errors.append(f"only {len(w['items'])} items (need at least {MIN_ITEMS})")
    empty = [c for c, n in per_cat.items() if n == 0]
    if empty:
        errors.append(f"no items in: {', '.join(empty)}")

    check_checks(ROOT / "data" / "checks.json", errors)

    if errors:
        print("\n".join(errors))
        return 1
    print(f"OK: {len(w['items'])} items ({per_cat}), window {start}..{end}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
