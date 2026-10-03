# Design polish brief – 3.10.2026 (autonomous pass)

Oren (host, not a developer) said the live site https://stayflorentin.com "still doesn't look good" on his phone (Samsung, Chrome, DARK mode, English and Hebrew) and asked for a maximal polish pass **without back-and-forth**, judged by the site-review expert's standards and the council's decisions, with a backup to revert to.

**Backup:** git tag `v-before-polish-3.10`. Revert = `git checkout v-before-polish-3.10 -- index.html assets content && commit && push`.

## Non-negotiables (decided, do not re-open)
- Rule of truth: anything a guest operates or must find = real photo inside the card. Generated images only on the first-hour tiles / decoration. Keep `assets/img/first-hour/*` and `assets/img/house/*` as they are.
- Keep: 4 languages (RTL Hebrew!), the automated "This week", the emergency card order, affiliate links on tours/places with disclosure, WhatsApp green, Emergency red outline, max 1 guest, no prices on tours, no "5 stars" wording.
- Places stay 2-column cards with visible text (council). Apartment cards stay a 2-up grid (Oren). Tours: 2 big + 3 compact rows. Floating pill tab bar.
- Fonts: Plus Jakarta Sans (Latin headings), Inter body, Heebo for Hebrew. Palette: parchment/terracotta (`--accent #a4502c`, `--accent-deco #c9704b`). Dark mode: warm, not blue.
- No new third-party scripts. Static site only. Images ≤ ~25 KB for tiles.

## What Oren sees as wrong (his screenshots, dark mode)
1. Hero (Start): too much vertical space and too many competing elements: logo plate, language pill, sky icon + "GOOD AFTERNOON · TEL AVIV", huge "Welcome home", name box + Save, two big buttons (WhatsApp wraps to 2 lines), emergency numbers line, "Siren?" link. It reads as a form, not a welcome. Make it one calm screen: greeting line, name field only when no name is known (collapse to a small "not you?" link once set), two equal-height buttons on one line (shorter label "WhatsApp Oren"), emergency numbers as a single quiet line.
2. Apartment 2-up cards: icons inconsistent (some tiny photos, some emoji). Decide one system: tinted terracotta squares with a simple glyph/emoji for ALL cards (photos stay inside the card body). Equal heights per row; chevron subtle; subtitle max 2 lines.
3. First-hour tiles: uniform crop, title readable in sunlight (stronger gradient), consistent size; peek of the next tile.
4. Tours compact rows: title must not clip in RTL; the "all tours" box should look secondary.
5. Places: the photo-credit line is long and ugly -> move into the "more" expansion (keep attribution, CC BY requires it) and show only "Photo ↗" when collapsed; map button as compact pill; equal card heights.
6. "This week": one line + small photo per row works; make the date/category chip consistent; no "ONGOING" for weekly events (data rule already fixed); "Worth a visit" label for undated food.
7. Dark mode everywhere: check every badge, pill, link and the wordmark; nothing white-on-white or blue.
8. Desktop (≥ 900px): Oren likes the wider layout; mirror its proportions on mobile where possible (section spacing, card rhythm). Check both: 400×860 and 1280×900, light and dark, EN and HE.

## Method
1. Read `.claude/skills/site-review/SKILL.md` and judge against `docs/competitor-guides-2026-10-03.md` and `docs/council-design-2026-10-03.md`.
2. Work in small commits. After EACH batch: `python3 agent/validate.py house` (syntax-checks app.js), bump `?v=` in index.html, `git pull --rebase`, push, wait for the "Deploy site" workflow, then verify on the LIVE site in Chrome (claude-in-chrome tools; resize to 400×860 for mobile, 1280×900 desktop; add `?r=<n>` to bust cache; test `?lang=he` and `?lang=en`; dark mode via `document.documentElement.setAttribute('data-theme','dark')`).
3. Do not touch content wording except labels needed for layout. Do not change data files. Do not change the routines.
4. Finish with: a before/after screenshot set saved under `docs/reports/polish-2026-10-03/` (mobile light/dark EN/HE, desktop), a short Hebrew summary for Oren (what changed, what was left and why), and STATUS.md updated (one paragraph).
