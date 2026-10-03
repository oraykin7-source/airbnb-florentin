# Audit checklist – what we publish vs Airbnb's rules

Run each line against the current texts. Mark OK / problem / grey zone. Rule references point to `rules.md`.

## A. Guest-guide site (stayflorentin.com, `content/*.json`, `data/weekly.json`)
- A1. Affiliate links (tours, spa): disclosed as such near the links; no claim that Airbnb endorses them; no payment collected by Oren. [ToS 11.1 third-party rule – grey zone, see rules.md]
- A2. Airalo referral code: disclosure that Oren gets a credit; not in Airbnb messages. [ToS 11.1 – grey zone]
- A3. Review card: no incentive, no condition, no "only review if 5 stars", no pressure; asks for honest feedback; problems may be raised privately but the guest is free to review as they wish. [Review policy]
- A4. House rules on the site match the house rules in the listing (shared home, quiet hours, no smoking, no parties, 1 guest, no pets, robot, check-out time). [Ground rules for guests / house rules]
- A5. No request for money outside Airbnb (late check-out fee, extra guest fee, damage) – only "charged on Airbnb". [ToS 5.4, Offline Fee Policy]
- A6. Safety: emergency card, shelter instructions, first-aid kit, host contact – present and accurate. No medical advice beyond "ask me / read the leaflet". [Ground rules for hosts: safety]
- A7. No cameras or recording devices claimed or hidden; robot vacuum (no camera) disclosed; smart lock disclosed in listing. [Security devices policy]
- A8. No guest personal data on the site (names only in the guest's own browser via URL parameter, never stored). [Privacy]
- A9. Third-party recommendations (restaurants, shops, gyms, bars) are plain recommendations, no commissions unless disclosed. [Content policy: advertising]
- A10. Nothing discriminatory in rules or wording (nationality, religion, disability, family status). [Nondiscrimination]

## B. Listing on Airbnb (title, description, photos, amenities, house rules, settings)
- B1. "Host lives here", shared bathroom, 1 guest max, private room: all stated. [Listing accuracy]
- B2. Smart lock / code lock disclosed; no cameras to disclose. [Security devices]
- B3. House rules = the ones in airbnb-texts.md §1; nothing beyond Airbnb's allowed categories; no fees in free text that are not set in pricing. [House rules]
- B4. Additional fees (extra guest) set in pricing, not only in text. [ToS 5.4]
- B5. Photos show the actual room/shared spaces; no people. [Content policy]
- B6. Check-in/out times and cancellation policy match what messages say (14:00 / 12:00, Moderate).

## C. Scheduled messages and quick replies (airbnb-texts.md §3 + live templates)
- C1. External link (stayflorentin.com) only in messages sent after booking confirmation. [Off-platform policy]
- C2. WhatsApp number only after booking confirmation; never in listing text or pre-booking inquiries. [Off-platform policy]
- C3. Door code only in the day-before / check-in message, never in the listing or arrival guide; Oren changes it after the technician visit. [Safety]
- C4. No request to pay, tip, or book anything outside Airbnb; tours line points to the guide, not to a partner link directly. [ToS 11.1, 5.4]
- C5. Review request after check-out: neutral wording, no incentive, no condition. [Review policy]
- C6. Arrival-time request is a question, not a condition of check-in. [Ground rules]

## Last audit

### 2026-10-03 (first full audit, after building the rulebook)
Checked: `content/house.json`, `content/places.json`, `airbnb-texts.md` (house rules, arrival guide, scheduled messages), the live Welcome/day-before templates as edited on 2.10, and the public listing page.

**Fixed on the site the same day**
- A3 review card: title "Five stars?" + "five stars means everything was fine… my goal is a genuine five-star experience" read as steering the rating (Reviews policy: no pressure/conditioning). Reworded to "Something not right? Tell me now" + "write it honestly". No "five stars" anywhere now.
- A4/A5 rules card: "extra guests carry an extra fee on Airbnb" implied a fee that is not in the pricing fields (max guests = 1). Now: "Only the guest on the booking may stay overnight - the room is booked for one person."

**OK**
- A1/A2: tours lead and places lead disclose the commission; Airalo line discloses the credit; none of it is in Airbnb messages. Grey zone by ToS 11.1 wording, but optional, labelled, informational.
- A6, A8, A9, A10, B1, B5, B6, C1, C2 (WhatsApp phrased as optional), C3, C5 (after-check-out message asks for an honest review, no incentive), C6.
- Listing description has no external link; "After booking you'll get a digital guide" is fine.

**For Oren to confirm or decide**
- B2/safety: the listing says "Smoke alarm" and "Carbon monoxide alarm" exist. Must be true (Listing accuracy, 2904). Also "Window AC unit" is ticked while the units are split ACs - minor accuracy fix.
- A7: the robot vacuum - does the model have a camera? Indoor cameras/recording devices are banned even when off (3061). If it has one, ask Airbnb support or replace; if not, nothing to do.
- C3/8: Airbnb expects the entry code to change between reservations (2904). Current code changes rarely; after the lock technician (12.10) set per-guest codes.
- C4 grey: the Welcome message line "My picks, bookable online: stayflorentin.com/#card-tours" points an Airbnb message at the affiliate section. Safer: delete that line and keep only the general guide link. Oren's call.
- B4: no extra-guest fee exists in pricing; fine as long as no text promises one (site fixed; check listing "Additional rules" text does not say it either - airbnb-texts.md §1 still says "extra guests are charged an additional fee" → update in Airbnb to "Only the guest on the booking may stay overnight").
