# ChatGPT council review – 2026-09-29

Second-opinion review by ChatGPT (GPT-6 Astra, 5 sub-agents + anonymous peer review + chairman), asked to critique the product and to check what Claude's council (`council-review-2026-09-28.md`) missed. It read the repo at commit `42adf30`, the four docs, and fetched the live page/JS/JSON to confirm they match. It did not test on a phone or see the Routine settings.

## Overall
Good base, simple and appropriate architecture (static, no backend, DOM/createTextNode rendering, language persists across pages, privacy decision consistent). Main gap: events/attractions are more developed than the instructions for living in the flat. Not yet a guide you could leave a guest with and no follow-up from the host.

## New findings (beyond Claude's council)

| Verified finding | Consequence | Recommended fix |
|---|---|---|
| `currentStay()` picks the nearest future check-out without identifying the guest or knowing arrival | "your stay" promises a match the system can't make | Optional date picker in the browser for the events section, instead of guessing from the calendar |
| `host.shelter` and `host.boiler_switch` are single English strings injected into DE/FR text | Replacing the TODO in English leaves English inside German/French safety instructions | Per-language values for those fields |
| `Promise.allSettled` waits for all four JSON files before rendering the house cards | A stuck events request can delay the emergency card | Load house content independently; basic emergency info already in the HTML |
| `checkout_time: 11:00` exists in data but is never displayed | Guest never learns the check-out time | Check-out card: time, key, AC, belongings |
| `validate.py` accepted `time: 99:99`, a `generated_at` from 2001, and an image from a non-approved domain with a throwaway credit | Validation doesn't enforce the reliability promises | Strict checks for time format, freshness, and image source |
| Date ranges are used for performance series too | A run of shows doesn't mean a show every day | Distinguish continuous exhibitions from separate performance dates |
| Claude's council recommended a WhatsApp button – a `wa.me` link exposes the phone number in the public page | Contradicts the privacy decision | Route contact through Airbnb messaging / the printed card |
| Research Routine holds the iCal secret, reads the web, and can push to main | Prompt-injection / mistake exposure (a risk, not an incident); "change only two files" is an instruction, not a permission boundary | Keep the calendar secret out of the research routine; publish checks that don't rely on the agent obeying |
| GitHub Pages terms restrict commercial/transactional sites | Not a problem for an info guide; matters if bookings/payments are ever added | Keep in mind before expanding |
| "all close by" / "tous à deux pas" is too broad for places at bike distance | Minor wording | Adjust lead text |
| Docs say the research window extends by check-in dates, but `--stays` stores only check-outs | Routine lacks the data for that decision | Align ROUTINE.md with what stays.json contains |
| CC BY 4.0 wants title/author/licence link/changes noted; places.json has `license_url` but the UI shows only a credit line | Attribution could be more complete | Link the licence and note the crop in the credit |

Also: `stays.json` is currently empty, so no guest dates are exposed today; the critique is about the mechanism. Calling a list of check-outs a "full occupancy log" overstates it, but no-address doesn't make booking data anonymous either.

## Where it agrees with Claude's council
Emergency first, "First hour" strip, fewer stock photos, notifications on, printed backup.

## Where it refines Claude's council
- "Freeze the emergency text" should mean: no automatic changes, human approval required – not "never update".
- Hiding the feed after 10 days is a safety net, not proof of freshness; `generated_at` is not `verified_at`.
- No evidence that 8 is the right feed size – agree on quality and focus, not a specific number.

## Recommendation
Keep the static architecture. Finish a house guide a guest can rely on first; events are an optional extra; base date filtering on the guest's own choice rather than a calendar guess (a proposal to change an existing decision – Oren to decide).

## First thing to do
Stand in the flat with a phone, complete the shelter location and access instructions in all three languages, and make sure that content shows even when the events load fails. Then: boiler, shared spaces, key hand-over at check-out.

## Design pass (29.9, afternoon)
Oren found the look dated and heavy. ChatGPT (same chat, "Airbnb Page Redesign Direction") diagnosed the cause: border + shadow + tinted icon square on every card, plus beige/terracotta/serif. Direction implemented in `assets/style.css` in one pass:
- Palette: background #F4F8FB, white cards, text #172433, primary ocean blue #0A6FD6, happy yellow #FFD966 (brand dot, stay badge, walk-time pill), emergency red #C62828, WhatsApp green kept. Dark mode variant kept.
- Type: Manrope 800 headings, Inter body 17px/1.6.
- Cards: no border, no shadow, 18px radius, 20px padding; Emergency card gets a red left bar.
- Emoji icons: plain, no tinted squares. Header opaque. Emergency button = white with red outline; WhatsApp = filled green.
- Removed gradients from event placeholders (flat tints).

## Second design pass (29.9, afternoon) - the "dry" top half
ChatGPT's ranked ideas, implemented in this order: (1) appliance photos as 56px card thumbnails (`thumb` in house.json, emoji fallback); (2) "Your first hour" swipeable strip of photo tiles (`first_hour` order in house.json) that opens the matching card; (3) hero: soft yellow sun blob + time-of-day greeting in Tel Aviv time ("Good afternoon · Tel Aviv"); (4) the 12 cards grouped under "Get comfortable / Stay safe & happy / Go local" (`group` + `groups` in house.json, coloured dots); (6) tactile feedback on tap and a 180 ms rise of opened card bodies, off under prefers-reduced-motion. Skipped staggered scroll reveals on its advice.
