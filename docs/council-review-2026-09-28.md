# LLM Council review – 2026-09-28

Five advisors (Contrarian, First Principles, Expansionist, Outsider, Executor) reviewed the repo and the live page independently, peer-reviewed each other anonymously, and a chairman synthesized the verdict. Summary of the verdict (full text was delivered in chat):

## Agreed
- The base is good, but not ready for a real guest: Wi-Fi/phone/shelter are still placeholders and the page looks broken.
- The shelter/siren line is the one item where a mistake could cost a life. Write it manually, verify in all three languages, add a photo.
- The weekly feed fills slots instead of helping: 22/29 from one source, 8 undated, all Pexels stock photos that read as photos of the venue. Use the category icon unless the photo is the actual place.
- Kitchen sub-page still carries print/QR leftovers.

## Disputed
- Size of the feed: cut to ~5–8 dated picks now; keep the Expansionist's "heads-up this week" strip (Shabbat/holiday closures) – cheap and exactly what DE/FR guests miss.
- stays.json: Executor keeps it, Contrarian removes it (public occupancy log). Chairman sides with removal unless the badge proves its worth.
- Chairman disagrees with "fill the five host fields": Wi-Fi password, exact address and phone must not go into the public repo at all.

## Blind spots caught in peer review
- Git history keeps anything ever committed – rotate, don't just delete.
- Anyone with the URL sees the current guest's dates.
- Silent failure: hide the weekly section when generated_at > 10 days; turn routine notifications on.
- Safety text auto-translated with no human review – freeze the emergency card.
- No non-digital fallback – one printed page in the flat.
- Maintenance burden on a non-developer; the Actions fallback is dead without an API key.

## Recommended order
1. Secrets off the web (printed card by the router + Airbnb check-in message); stop committing stays.json.
2. Real emergency card in 3 languages with a photo of the shelter.
3. "First hour" strip at the top: Wi-Fi (card), boiler switch, WhatsApp button, check-out time.
4. House content driven by the last 20 real guest questions.
5. Smaller feed: ≤8 dated items, icons not stock photos, hide expired, drop chillz, rename "Picked for your stay".
6. Launch gate: validate.py fails on TODO/000-0000; real dry-run on cellular in German.

## First thing
Change TODO.md so it no longer tells the host to put wifi_ssid/wifi_password/address/host_phone into house.json.
