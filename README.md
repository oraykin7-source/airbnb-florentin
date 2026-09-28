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
| `agent/ROUTINE.md` | The procedure the weekly **Claude Code Routine** follows (research → `weekly.json` → validate → push). |
| `agent/validate.py` | Schema / source / window check for `weekly.json`. |

Live at **https://oraykin7-source.github.io/airbnb-florentin/** (GitHub Pages, branch `main`, root).

## How it refreshes

Two **Claude Code Routines** (claude.ai → Code → Routines) run on the host's Claude account - no API key:

- **Weekly** - Saturday evening: follows `agent/ROUTINE.md` - updates check-out dates, researches the three sources, writes `data/weekly.json`, validates, pushes.
- **Nightly** - updates `data/stays.json` only (so a booking made mid-week is picked up).

The Airbnb iCal URL lives only in the routines' prompts, never in the repo (the repo is public).

## Setup left for the host

1. Fill in `content/house.json` → `host` (name, phone, address, Wi-Fi, shelter, boiler switch) and push.
2. Make the QR code from the Pages URL above. The kitchen page prints its own QR at `/kitchen/`.
3. Add photos to `kitchen/img/`.

Preview before the first run: open the page with `?demo` to see sample events.

## What the weekly refresh does

- The script reads the Airbnb calendar and keeps only **check-out dates** of real bookings (no names, phones or reservation links are ever written to the repo).
- The research window is at least the next 8 days, extended to the check-out of any guest arriving before the next refresh (max 3 weeks).
- Claude (`claude-opus-5`) researches with web search + fetch **restricted to** `visit.tel-aviv.gov.il`, `secrettelaviv.com` and `chillz.com`, then structures the picks in EN/DE/FR. Items from any other domain or outside the window are dropped.
- If fewer than 5 valid items come back, last week's file is kept and the run fails loudly.
- The page filters events client-side: it shows only items between today and the guest's check-out (the next check-out date after today), and marks them *"during your stay"*.


## Fallback without the Routine

`agent/refresh.py` can run the same research through the Anthropic API (`ANTHROPIC_API_KEY` + `AIRBNB_ICS_URL`), locally or from any scheduler. Cost roughly $1-3 per run. There is no GitHub Actions workflow any more - it needed an API key the host doesn't have.

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
