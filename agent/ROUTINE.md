# Weekly refresh - instructions for the cloud routine

You are refreshing the "This week in Tel Aviv" section of a digital guest guide for an Airbnb apartment in **Florentin, Tel Aviv**. Guests are tourists who speak English, German or French. The page reads `data/weekly.json`; you write it. Work only inside this repository.

## 1. Update the check-out dates

`AIRBNB_ICS_URL` is provided in your instructions. Run:

```bash
AIRBNB_ICS_URL="<the url>" python3 agent/refresh.py --stays
```

It writes `data/stays.json` (check-out dates only) and prints the reserved stays. Never write names, phone digits, reservation URLs or the iCal URL itself into any file in the repo.

## 2. Decide the research window

- `window_start` = today (Israel time).
- `window_end` = today + 8 days, extended to the check-out date of any guest whose stay starts within the next 7 days, capped at today + 21 days.

## 3. Research - only these three sources

- https://visit.tel-aviv.gov.il/ - official tourism site: events, exhibitions, festivals, tours, markets.
- https://www.secrettelaviv.com/ - new restaurant openings, food events, things to do this week.
- https://www.chillz.co.il/ - parties, club nights, concerts, nightlife tickets (Hebrew; translate what you read).

Open each homepage, then follow their event/listing pages for the window. You may use web search **restricted to those domains** (`site:visit.tel-aviv.gov.il` etc.) to find pages; do not take items from any other site.

Collect, per category, the 6-10 best picks for a visitor staying in Florentin:

| category | what |
|---|---|
| `food` | new or notable restaurants, bars with food, food markets and food events. New openings may have no date. |
| `culture` | exhibitions, festivals, concerts, tours, markets and city events. |
| `nightlife` | parties, club nights, live music and bar events. |

Rules: every item comes from a page on one of the three sites and carries that page's exact URL; dated items fall inside the window; skip anything already ended or undated-and-unconfirmable; prefer places within easy reach of Florentin (Florentin, Jaffa, Neve Tzedek, Rothschild, the ports) and things that don't require Hebrew; never invent times, venues or prices - leave them `null` if not on the page.

## 4. Write `data/weekly.json`

```json
{
  "generated_at": "2026-10-03T19:05:00+03:00",
  "window_start": "2026-10-03",
  "window_end": "2026-10-11",
  "items": [
    {
      "category": "food",
      "title":  { "en": "...", "de": "...", "fr": "..." },
      "blurb":  { "en": "1-2 warm, useful sentences", "de": "...", "fr": "..." },
      "date_start": "2026-10-04",
      "date_end": null,
      "time": "20:00",
      "venue": "Name of the place",
      "area": "Florentin",
      "price": "₪80",
      "url": "https://www.secrettelaviv.com/....",
      "source": "secrettelaviv.com"
    }
  ]
}
```

Titles and blurbs in natural EN/DE/FR; keep proper names as they are. `date_start`/`date_end` are `YYYY-MM-DD` or `null`; `time` is `HH:MM` or `null`. Then run:

```bash
python3 agent/validate.py
```

Fix anything it reports. If you cannot reach at least 5 valid items across the categories, **do not overwrite** `data/weekly.json` - leave last week's file and say so in your final message.

## 5. Commit and push

```bash
git add data/weekly.json data/stays.json
git -c user.name="guide-bot" -c user.email="guide-bot@users.noreply.github.com" commit -m "Refresh guest guide data (<today>)"
git push
```

Commit only those two files. End with a short summary: window, item counts per category, and anything you skipped.
