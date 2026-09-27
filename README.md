# Florentin guest guide

Digital guide for the Airbnb in Florentin, Tel Aviv. One fixed URL for the QR code; the content refreshes itself.

## What's in here

| Path | What |
|---|---|
| `index.html`, `assets/` | The guest page (EN / DE / FR). Static; nothing to build. |
| `content/house.json` | The fixed part: Wi-Fi, kitchen, AC, TV, hot water, emergency, Florentin tips. **Edit the `host` block** - it fills the `{{placeholders}}`. |
| `kitchen/` | The detailed kitchen guide (induction hob, Ninja Combi). Linked from the kitchen card. Put photos in `kitchen/img/`. |
| `data/weekly.json` | The weekly part, written by the agent. Don't edit by hand. |
| `data/stays.json` | Upcoming check-out dates only (from the Airbnb calendar). Written by the agent. |
| `agent/refresh.py` | The agent: reads the Airbnb calendar, researches the three sources with Claude, writes the two JSON files. |
| `.github/workflows/refresh.yml` | Runs the agent on GitHub's servers: Saturday evening (weekly), Sunday morning (retry), nightly (calendar only). |

## Setup (once)

1. Fill in `content/house.json` → `host` (name, phone, address, Wi-Fi, shelter, boiler switch).
2. GitHub repo → **Settings → Secrets and variables → Actions**, add:
   - `ANTHROPIC_API_KEY` - your Claude API key.
   - `AIRBNB_ICS_URL` - the listing's iCal export URL (Airbnb → Calendar → Availability → Connect calendars → Export). This is the same link already imported into Google Calendar; it is secret, keep it only in this GitHub secret.
3. **Settings → Pages** → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. **Actions** → *Refresh guest guide* → *Run workflow* (mode `full`) to produce the first `weekly.json`.
5. Make the QR code from the Pages URL (`https://<user>.github.io/<repo>/`). The kitchen page prints its own QR at `/kitchen/`.

Preview before the first run: open the page with `?demo` to see sample events.

## How the weekly refresh works

- Every Saturday ~19:00 Israel time the workflow runs `agent/refresh.py`.
- The script reads the Airbnb calendar and keeps only **check-out dates** of real bookings (no names, phones or reservation links are ever written to the repo).
- The research window is at least the next 8 days, extended to the check-out of any guest arriving before the next refresh (max 3 weeks).
- Claude (`claude-opus-5`) researches with web search + fetch **restricted to** `visit.tel-aviv.gov.il`, `secrettelaviv.com` and `chillz.co.il`, then structures the picks in EN/DE/FR. Items from any other domain or outside the window are dropped.
- If fewer than 5 valid items come back, last week's file is kept and the run fails loudly.
- The page filters events client-side: it shows only items between today and the guest's check-out (the next check-out date after today), and marks them *"during your stay"*.

Cost: one research call per week, roughly a dollar or two.

## Running the agent locally

```bash
python3 -m venv .venv && .venv/bin/pip install -r agent/requirements.txt
export ANTHROPIC_API_KEY=... AIRBNB_ICS_URL=...
.venv/bin/python agent/refresh.py            # full
.venv/bin/python agent/refresh.py --stays    # calendar only
python3 -m http.server 8420                  # then open http://localhost:8420/?demo
```

## Privacy note

If the GitHub repo is public (required for GitHub Pages on a free account), everything in it is public - including the Wi-Fi password and address in `house.json`. Anyone with the QR link sees the same page anyway, so the usual practice is fine, but don't commit anything you wouldn't hand a guest.
