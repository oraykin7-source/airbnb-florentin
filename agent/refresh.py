"""Weekly refresh agent for the Florentin guest guide.

1. Reads the Airbnb calendar (the same iCal feed that is imported into Google Calendar)
   and keeps only check-out dates of real bookings ("Reserved") - no names, no phones,
   no reservation links ever leave this script.
2. Computes the event window so it covers every guest whose stay starts before the
   next weekly refresh.
3. Asks Claude to research visit.tel-aviv.gov.il, secrettelaviv.com and chillz.co.il
   (web search + fetch restricted to those domains), then to structure the findings
   as JSON in English, German and French.

Usage:
    python agent/refresh.py            # full weekly refresh (stays + events)
    python agent/refresh.py --stays    # only update data/stays.json (daily, no API cost)

Env:
    AIRBNB_ICS_URL      secret iCal export URL of the listing (required)
    ANTHROPIC_API_KEY   Claude API key (required for the full refresh)
    FORCE=1             ignore the "already refreshed this weekend" guard
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.request
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Literal, Optional
from urllib.parse import urlparse
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
TZ = ZoneInfo("Asia/Jerusalem")

MODEL = "claude-opus-5"
SOURCES = {
    "visit.tel-aviv.gov.il": "https://visit.tel-aviv.gov.il/",
    "secrettelaviv.com": "https://www.secrettelaviv.com/",
    "chillz.co.il": "https://www.chillz.co.il/",
}
MIN_WINDOW_DAYS = 8     # always cover at least the coming week
MAX_WINDOW_DAYS = 21    # but never research more than 3 weeks ahead
PUBLISH_CHECKOUTS_DAYS = 21


# ---------------------------------------------------------------- calendar

def fetch_ics(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "florentin-guide/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")


def parse_reserved_stays(ics: str) -> list[tuple[date, date]]:
    """Return (check-in, check-out) for 'Reserved' events. Blocked dates are ignored."""
    lines: list[str] = []
    for raw in ics.splitlines():  # unfold RFC 5545 continuation lines
        if raw.startswith((" ", "\t")) and lines:
            lines[-1] += raw[1:]
        else:
            lines.append(raw)

    stays, ev = [], None
    for line in lines:
        if line == "BEGIN:VEVENT":
            ev = {}
        elif line == "END:VEVENT" and ev is not None:
            if ev.get("SUMMARY", "").strip().lower() == "reserved" and "DTSTART" in ev and "DTEND" in ev:
                stays.append((ev["DTSTART"], ev["DTEND"]))
            ev = None
        elif ev is not None and ":" in line:
            key, val = line.split(":", 1)
            name = key.split(";", 1)[0]
            if name in ("DTSTART", "DTEND"):
                ev[name] = datetime.strptime(val[:8], "%Y%m%d").date()
            elif name == "SUMMARY":
                ev[name] = val
    return sorted(stays)


def compute_window(today: date, stays: list[tuple[date, date]]) -> date:
    next_refresh = today + timedelta(days=7)
    end = today + timedelta(days=MIN_WINDOW_DAYS)
    for checkin, checkout in stays:
        if checkin <= next_refresh and checkout > today:
            end = max(end, checkout)
    return min(end, today + timedelta(days=MAX_WINDOW_DAYS))


def write_stays(today: date, stays: list[tuple[date, date]]) -> None:
    horizon = today + timedelta(days=PUBLISH_CHECKOUTS_DAYS)
    checkouts = sorted({co.isoformat() for _, co in stays if today <= co <= horizon})
    write_json(DATA / "stays.json", {"updated_at": now_iso(), "checkouts": checkouts})
    print(f"stays.json: {len(checkouts)} upcoming check-out date(s)")


# ---------------------------------------------------------------- Claude

def build_models():
    from pydantic import BaseModel, Field

    class Localized(BaseModel):
        en: str
        de: str
        fr: str

    class Item(BaseModel):
        category: Literal["food", "culture", "nightlife"]
        title: Localized
        blurb: Localized = Field(description="1-2 friendly sentences for a tourist")
        date_start: Optional[str] = Field(description="YYYY-MM-DD, null for a new restaurant with no specific date")
        date_end: Optional[str] = Field(description="YYYY-MM-DD for multi-day events/exhibitions, else null")
        time: Optional[str] = Field(description="HH:MM local start time if known, else null")
        venue: Optional[str]
        area: Optional[str] = Field(description="Neighbourhood, e.g. Florentin, Jaffa, Neve Tzedek")
        price: Optional[str] = Field(description="Short price note if known, e.g. 'Free' or '₪80'")
        url: str = Field(description="The exact source page URL the item came from")
        source: str = Field(description="Domain of the source site")

    class Weekly(BaseModel):
        items: list[Item]

    return Weekly


RESEARCH_PROMPT = """You are preparing the weekly "what's on" section of a digital guest guide for an Airbnb apartment in Florentin, Tel Aviv. Guests are tourists who speak English, German or French.

Research window: {start} to {end} (inclusive). Today is {today}.

Use ONLY these three sources:
- {visit} - the official Tel Aviv tourism site: city events, exhibitions, festivals, tours, markets.
- {secret} - Secret Tel Aviv: new restaurant openings, food events, things to do this week.
- {chillz} - Chillz: parties, club nights, concerts and nightlife tickets (the site is in Hebrew; translate what you read).

Start from those homepages, then search within those domains and open the listing/event pages you need.

Collect, for each of three categories, the 6-10 best picks for a visitor staying in Florentin:
- food: new or notable restaurants, bars with food, food markets and food events. New openings may have no date.
- culture: exhibitions, festivals, concerts, tours, markets and city events.
- nightlife: parties, club nights, live music and bar events.

Rules:
- Every item must come from a page on one of the three sites. Record the exact URL of that page.
- Dated items must fall inside the window. Skip anything that already ended or whose date you can't confirm.
- Prefer things within easy reach of Florentin (Florentin, Jaffa, Neve Tzedek, Rothschild, the port areas) and things that don't require Hebrew.
- Don't invent details. If the time, venue or price isn't on the page, leave it out.

Finish with a plain list of your picks: category, name, date(s), time, venue, area, price, URL, and one or two sentences on why a tourist would enjoy it."""

STRUCTURE_PROMPT = """Convert these research notes into the guest-guide JSON.

Window: {start} to {end}. Dates must be YYYY-MM-DD. Write each title and blurb in natural English, German and French - warm, concise and useful to a tourist. Keep proper names (venues, artists, dishes) as they are. Use only facts that appear in the notes, and copy every URL exactly.

<notes>
{notes}
</notes>"""


def research(client, today: date, end: date) -> str:
    domains = list(SOURCES)
    tools = [
        {"type": "web_search_20260209", "name": "web_search", "max_uses": 20, "allowed_domains": domains},
        {"type": "web_fetch_20260209", "name": "web_fetch", "max_uses": 30, "allowed_domains": domains},
    ]
    prompt = RESEARCH_PROMPT.format(
        start=today.isoformat(), end=end.isoformat(), today=today.strftime("%A %Y-%m-%d"),
        visit=SOURCES["visit.tel-aviv.gov.il"], secret=SOURCES["secrettelaviv.com"], chillz=SOURCES["chillz.co.il"],
    )
    messages = [{"role": "user", "content": prompt}]

    for _ in range(8):  # cap pause_turn continuations
        with client.beta.messages.stream(
            model=MODEL,
            max_tokens=64000,
            thinking={"type": "adaptive"},
            output_config={"effort": "high"},
            tools=tools,
            messages=messages,
            betas=["server-side-fallback-2026-07-01"],
            extra_body={"fallbacks": "default"},  # re-run on a fallback model if a classifier declines
        ) as stream:
            resp = stream.get_final_message()

        if resp.stop_reason == "refusal":
            raise RuntimeError(f"Research request was declined: {resp.stop_details}")
        if resp.stop_reason == "pause_turn":
            messages = [messages[0], {"role": "assistant", "content": resp.content}]
            continue
        notes = "\n".join(b.text for b in resp.content if b.type == "text").strip()
        if not notes:
            raise RuntimeError(f"Research produced no text (stop_reason={resp.stop_reason})")
        return notes
    raise RuntimeError("Research still paused after max continuations")


def structure(client, notes: str, today: date, end: date):
    Weekly = build_models()
    resp = client.messages.parse(
        model=MODEL,
        max_tokens=32000,
        thinking={"type": "adaptive"},
        output_config={"effort": "medium"},
        messages=[{"role": "user", "content": STRUCTURE_PROMPT.format(start=today, end=end, notes=notes)}],
        output_format=Weekly,
    )
    if resp.stop_reason == "refusal" or resp.parsed_output is None:
        raise RuntimeError(f"Structuring failed (stop_reason={resp.stop_reason})")
    return resp.parsed_output


def validate(items, today: date, end: date) -> list[dict]:
    """Keep only items from the allowed sources and inside the window."""
    def allowed(url: str) -> bool:
        host = (urlparse(url).hostname or "").lower()
        return urlparse(url).scheme == "https" and any(host == d or host.endswith("." + d) for d in SOURCES)

    def d(s):
        try:
            return date.fromisoformat(s) if s else None
        except ValueError:
            return False

    kept, dropped = [], 0
    for it in items:
        start, stop = d(it.date_start), d(it.date_end)
        if not allowed(it.url) or start is False or stop is False:
            dropped += 1
            continue
        if start and ((stop or start) < today or start > end):
            dropped += 1
            continue
        kept.append(it.model_dump())
    print(f"items: kept {len(kept)}, dropped {dropped}")
    return kept


# ---------------------------------------------------------------- main

def now_iso() -> str:
    return datetime.now(TZ).isoformat(timespec="seconds")


def write_json(path: Path, obj) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def recently_refreshed(hours: int = 30) -> bool:
    try:
        prev = json.loads((DATA / "weekly.json").read_text(encoding="utf-8"))
        age = datetime.now(TZ) - datetime.fromisoformat(prev["generated_at"])
        return age < timedelta(hours=hours)
    except (OSError, KeyError, ValueError):
        return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--stays", action="store_true", help="only refresh data/stays.json")
    args = ap.parse_args()

    ics_url = os.environ.get("AIRBNB_ICS_URL")
    if not ics_url:
        print("AIRBNB_ICS_URL is not set", file=sys.stderr)
        return 1

    today = datetime.now(TZ).date()
    stays = parse_reserved_stays(fetch_ics(ics_url))
    write_stays(today, stays)
    if args.stays:
        return 0

    # Saturday run is primary; the Sunday run only fills in if Saturday failed.
    if recently_refreshed() and os.environ.get("FORCE") != "1":
        print("weekly.json already refreshed this weekend - skipping")
        return 0

    import anthropic
    client = anthropic.Anthropic()
    end = compute_window(today, stays)
    print(f"window: {today} -> {end}")

    notes = research(client, today, end)
    weekly = structure(client, notes, today, end)
    items = validate(weekly.items, today, end)
    if len(items) < 5:
        # Keep last week's file rather than publishing an almost-empty page.
        print("too few valid items - keeping the previous weekly.json", file=sys.stderr)
        return 1

    write_json(DATA / "weekly.json", {
        "generated_at": now_iso(),
        "window_start": today.isoformat(),
        "window_end": end.isoformat(),
        "items": items,
    })
    print("weekly.json written")
    return 0


if __name__ == "__main__":
    sys.exit(main())
