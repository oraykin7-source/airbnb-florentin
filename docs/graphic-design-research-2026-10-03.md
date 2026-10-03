# מחקר עיצוב גרפי – בסיס הידע של "המעצב הגרפי" (3.10.2026)

## סיכום לאורן

1. עיצוב טוב הוא בעיקר **מעט כללים שנשמרים בעקביות**, ולא כישרון. מעצבים מקצועיים בודקים מספרים: כמה גדלי טקסט יש בעמוד, כמה רווחים שונים, כמה צבעים, מה הניגודיות.
2. הכלל החשוב ביותר בטלפון: **4–6 גדלי טקסט בעמוד, לא יותר**. טקסט רץ בגודל 16 ומעלה. שום דבר שאורח צריך לקרוא לא קטן מ-12.
3. רווחים לפי "סרגל" קבוע (4, 8, 12, 16, 24, 32, 48), ופינות מעוגלות ב-2–3 גדלים בלבד. כשכל כרטיס מעוגל קצת אחרת, העין מרגישה "עבודת בית" גם בלי לדעת להסביר למה.
4. צבע: צבע מבטא אחד לפעולות, ניגודיות לפחות 4.5:1 לטקסט (באור שמש עדיף 7:1). במצב כהה – משטחים בהירים יותר במקום צללים, וצבעים פחות רוויים.
5. תמונות: אותו יחס צלע לכל רכיב, חיתוך מתון, ואותו "אור" לכל הסדרה. לא פסים ריקים בצדדים.
6. עברית: אין אותיות גדולות ואין נטוי אמיתי. מדגישים במשקל, לא במרווח בין אותיות. משפחת גופן אחת שתומכת בעברית ובלטינית (Heebo אצלנו) היא הבחירה הנכונה.
7. בתי הספר (בצלאל, שנקר, ויצו, HIT, RISD) מלמדים בשנה א' אותו בסיס: אות עברית ולטינית ביד, קומפוזיציה, צבע, היררכיה, גריד – וביקורת עבודות קבועה מול הקיר.
8. סטודיו מוביל מבקר כך: מתחיל מהמטרה, מצביע על אלמנט מסוים, אומר איזה כלל הוא שובר ולמה, ובודק את **המערכת כולה** ולא מסך אחד.
9. "המקצוע נעלם"? חלקית. עבודת ייצור פשוטה (באנרים, פוסטים) עוברת ל-AI, ובארה"ב צופים ירידה של 2% במשרות מעצבים גרפיים עד 2035. עיצוב ממשקים דיגיטליים דווקא צומח.
10. מה שנשאר לבני אדם: שיקול דעת וטעם, אחידות של מערכת שלמה, אמת (תמונה שמראה את הדבר האמיתי), ניואנסים של שפה ותרבות (עברית!) ואחריות. בדיוק מה ש-Base44 לא נתן לנו.
11. מהמחקר נבנו 40 בדיקות מדידות (סעיף 5) ו-10 בדיקות לעברית (סעיף 7). "המעצב הגרפי" משתמש בהן בכל סקירה.

---

## How to read this file

- Tags: **[V]** = fetched and checked on the page; **[S]** = search snippet or secondary notes only; **[I]** = practitioner inference, no single source.
- Short source keys (e.g. `NNG-Hierarchy`) resolve in §8.
- The **critique checklist** (§5), the **non-designer mistakes** (§6) and the **Hebrew checks** (§7) are what the `graphic-designer` skill applies to stayflorentin.com. Check ids (T1, C4, H3…) are stable, so reviews can cite them.

---

## 1. Foundations

### 1.1 Gestalt grouping
- **Proximity is the strongest grouping cue.** It "can override other visual cues like color or shape" [NNG-Proximity, V].
  - Inner padding < gap between cards < gap between sections. Example ladder: 12 / 16 / 32.
  - A heading sits closer to its own content than to the block above it [NNG-Proximity, V; RUI-notes, S].
  - Re-check grouping at 375–400 px. Groups that sit together on desktop drift apart when columns stack [NNG-Proximity, V].
- **Common region** (a box or a tint) overrides proximity, but too many boxes create clutter and "false floors". First ask: can whitespace alone do it? [NNG-CommonRegion, V; LawsUX-CommonRegion, V]
- **Similarity:** things that behave the same look the same [NNG-Similarity, V].
  - One link colour, only on clickable things.
  - The primary action gets its own colour.
- **Von Restorff:** the one different item is remembered. Spend it on **one** thing per view; competing emphases cancel out [LawsUX-VonRestorff, V].
- **Apple:** group with negative space, containers or separators. Indented items read as subordinate [HIG-Layout, V].

### 1.2 Visual hierarchy
- About **3 size levels per view** and at most about 2 large elements. Typical web ranges: body 14–16, subhead 18–22, header up to 32 [NNG-Hierarchy, V; NNG-5Principles, V].
- **Squint test:** blur the view by 5–10 px; the order of importance must still be obvious [NNG-Hierarchy, V].
- **De-emphasise instead of emphasise** [RUI-7tips, V]:
  - Use tone and weight, not only size: dark / grey / light grey; weights 400–500 for text, 600–700 for emphasis.
  - Treat labels as a last resort.
- **Button hierarchy:** primary = solid, secondary = outline or low contrast, tertiary = link style [RUI-7tips, V].
- **Reading order:** top-to-bottom, then from the leading edge (the right edge in Hebrew) [HIG-Layout, V].

### 1.3 Typography
- **Modular scale ratios:**
  - Major Second 1.125, Minor Third 1.2, Major Third 1.25, Perfect Fourth 1.333.
  - On phones use 1.2–1.25 so headings don't take over [TypeScale, V].
  - Refactoring UI prefers a hand-picked scale: small steps at the bottom, big jumps at the top, no fractional sizes [RUI-notes, S].
- **How many sizes:**
  - NNG: 2–3 levels.
  - iOS defines 11 text styles for a whole OS.
  - A one-page guide needs **5–6** [NNG-5Principles, V; HIG-Typography, V].
- **Body size:**
  - 16 px on mobile [Smashing-MobileType, V].
  - 15–25 px on the web [Butterick-PointSize, V].
  - iOS default 17 pt; 11 pt is the absolute minimum [HIG-Accessibility, V].
- **Line-height:**
  - 120–145% for most text [Butterick-LineSpacing, V].
  - M3 defaults: body 16/24 = 1.5, headline 24/32 = 1.33, display 57/64 ≈ 1.12 [Android-M3, V].
  - Layouts must survive 1.5× line-height (WCAG 1.4.12) [WCAG-1.4.12, V].
- **Line length:**
  - 45–75 characters [RUI-notes, S]; 45–90 [Butterick-LineLength, V]; 50–75, never more than 80 [Baymard, V].
  - About 30–40 on mobile [Smashing-MobileType, V].
  - `max-width: 60–65ch` is the CSS tool [Smashing-Legibility, V].
- **Letter-spacing:**
  - Caps and small caps +5–12% (.05–.12em) [Butterick-Letterspacing, V].
  - Lowercase: none. Big headlines can tighten slightly [RUI-notes2, S].
  - All caps only for less than one line [Butterick-Summary, V].
- **Families:**
  - "Never use more than two typefaces on mobile" [Smashing-MobileType, V].
  - Apple: minimise typefaces and avoid Thin/Light weights [HIG-Typography, V].
  - Don't combine bold and italic [Butterick-Summary, V].
- **Centring:** don't centre anything longer than 2–3 lines [RUI-notes2, S].
- **Punctuation is part of typography:**
  - Curly quotes, not straight ones.
  - En dash (–) for ranges and asides, not a hyphen.
  - A real ellipsis (…) [Butterick-Summary, V].

### 1.4 Grids and spacing
- **8-pt grid:** "Use multiples of 8 to define dimensions, padding, and margin," with a 4-pt half-step for type and small elements. It removes 7 of every 8 options [Spec-8pt, V].
- **Refactoring UI scale:**
  - Start at 16 px; no two adjacent values closer than about 25% [RUI-notes, S].
  - The usual set is 4, 8, 12, 16, 24, 32, 48, 64.
  - Start with too much whitespace, then remove it [RUI-notes, S].
- **Mobile margins:**
  - M3: 16 dp on compact screens, 24 dp on medium ones [M3-search, S].
  - Cards in feeds are often separated by 24 dp [Android-Codelab, V].
- **Margins set the line length.** Text should not run edge to edge [Butterick-Margins, V].
- **Grids are an aid, not a guarantee** (Müller-Brockmann). The baseline (size + leading) generates the module [Mueller-Brockmann, S].

### 1.5 Colour
- **60-30-10:** about 60% neutral background, 30% surfaces, 10% accent. It is a guideline, not law [LogRocket, V].
- **Palette (Refactoring UI):**
  - 8–10 greys starting from a dark grey, not black.
  - One primary colour (maybe two) with 5–10 shades.
  - Separate status colours.
  - Define all shades up front [RUI-Palette, V].
- **Warm or cool neutrals:** tint the greys toward the brand hue [RUI-notes, S].
- **Text on colour:** never grey on a coloured fill. Use a tint of the fill's hue [RUI-7tips, V].
- **WCAG 2.2 contrast:**
  - Text: 4.5:1. Large text (≥ 24 px, or ≥ 18.66 px bold): 3:1. 4.499 fails [WCAG-1.4.3, V].
  - UI component edges, focus rings and meaningful icons: 3:1 [WCAG-1.4.11, V].
  - Apple suggests aiming for 7:1 for small text [HIG-DarkMode, V].
- **APCA (WCAG 3 candidate)** [APCA, V]. Use it as a second opinion, not a replacement.

  | Lc | Use |
  |---|---|
  | 90 | Preferred for body text |
  | 75 | Minimum for body text |
  | 60 | Other text |
  | 45 | Large headlines |
  | 30 | Icons and placeholders |
- **Never colour alone.** Pair colour with text or an icon [WCAG-1.4.1, V].
- **Sunlight:** test outdoors "on a sunny day", and use the same colour for the same meaning everywhere [HIG-Color, V]. Directly relevant to guests on Tel Aviv streets.
- **Albers, *Interaction of Color*:** a colour is judged by its neighbours. Check the accent against **each** surface it sits on, not against white [Albers, S].

### 1.6 Whitespace, alignment, consistency
- **Fewer borders.** Separate with spacing, a background tint or a soft shadow [RUI-7tips, V].
- **A single accent stripe** on one card adds colour without illustration. One is a signal; two are decoration [RUI-7tips, V; I].
- **Shadows:**
  - Light from above: vertical offset, moderate blur.
  - A fixed set of about 5 elevation levels [RUI-7tips, V; RUI-notes2, S].
- **One radius system.** Large radii feel friendly, zero feels formal; mixing many radii reads as accidental [RUI-notes3, S].
- **Alignment:**
  - One alignment edge per column; aligned things read as related.
  - Nudge icons and round shapes optically [HIG-Layout, V; Lucide, V].
- **Aesthetic-usability effect:** attractive interfaces are judged easier and forgiven more. Polish also hides real problems in testing, so test with real tasks [LawsUX-Aesthetic, V].

### 1.7 Images
- **One aspect ratio per component.** Use `aspect-ratio` + `object-fit: cover` + `object-position` to keep the subject in frame [MDN-object-fit, V].
- **Text over photos.** Use one of: a full overlay, a gradient scrim, a solid or translucent strip, a calm copy-space area, or blur. The text must still pass 4.5:1 (3:1 if large) at the worst spot [Smashing-TextOverImages, V].
- **Image care:**
  - Don't shrink screenshots or icons below their design size.
  - Use real, high-quality photos.
  - Add an overlay behind any text [RUI-notes3, S].
- **Dark mode:** dim images that have white backgrounds so they don't glow [HIG-DarkMode, V].
- **Consistent grading across a set** (time of day, warmth, saturation): standard studio practice, but I found no single citable rule [I].
- **Project rule (council 3.10):** whatever the guest operates or must find is a real photo. Generated images are for decoration and the first-hour tiles only.

### 1.8 Icons and touch targets
- **One family:**
  - 24 × 24 grid, one stroke (Lucide: 2 px), round caps and joins.
  - The same visual weight across the set [Lucide, V].
  - Never mix emoji with line icons, or filled icons with outline ones [I; Lucide, V].
- **Optical size:** Material Symbols adjusts the stroke between 20 and 48 dp, and uses a lower grade in dark mode to cut glare [MaterialSymbols, V].
- **Don't blow up a 16–24 px icon.** Put it inside a tinted shape instead (exactly the site's `.ico` square) [RUI-7tips, V].
- **Label icons.** Only a few are universal (home, search, print) [NNG-Icons, V].
- **Touch targets:**

  | Source | Size |
  |---|---|
  | Apple | 44 × 44 pt (28 pt absolute minimum) |
  | Material | 48 × 48 dp |
  | WCAG 2.5.8 (AA) | 24 × 24 px, or spacing that leaves 24 px circles clear |
  | WCAG 2.5.5 (AAA) | 44 × 44 px |

  [HIG-Accessibility, V; Android-A11y, V; WCAG-2.5.8, V]
- **Fitts's law:** big, close, well-spaced targets are faster to hit [LawsUX-Fitts, V].

### 1.9 Motion
- **Durations** [NNG-AnimDuration, V]:
  - About 100 ms for simple feedback; 200–300 ms for bigger transitions.
  - Over about 400 ms feels slow.
  - Ease out on entry and ease in on exit.
- **M3 tokens:**
  - Short: 50–200 ms. Medium: 250–400 ms.
  - Standard easing `cubic-bezier(0.2,0,0,1)` [M3-motion, V-secondary].
- **Honour `prefers-reduced-motion`** [MDN-PRM, V; HIG-Accessibility, V].
- **Every animation needs a purpose.** The more often it plays, the subtler it should be [NNG-AnimDuration, V].

### 1.10 Dark mode
- **No pure black and white:**
  - Material base #121212.
  - Text at 87% (high emphasis), 60% (medium) and 38% (disabled).
  - Pure white "vibrates" [Material-Codelab, V; NNG-DarkIssues, V].
- **Elevation = lighter surfaces, not shadows.** Shadows are invisible on dark backgrounds. Material uses a 0–16% light overlay; Apple uses base and elevated backgrounds [M2-DarkTheme, S; HIG-DarkMode, V].
- **Accents:** desaturate and lighten them (about the 200 tone) so they reach 4.5:1 on every surface. Saturated colours look harsh on dark [M2-DarkTheme, S; NNG-DarkIssues, V].
- **Thin lines and thin fonts disappear in dark mode.** Strengthen dividers and card edges [NNG-DarkIssues, V; Smashing-DarkMode, V].
- **Legibility in both modes**, aiming for 7:1 [HIG-DarkMode, V].
  - Light mode gives better acuity for most readers, so follow the system setting [NNG-DarkMode, V].
  - Oren himself uses dark mode on a Samsung, so both modes are first-class here.

---

## 2. Practitioner references – what each is best for

| Reference | Use it for | Key numbers |
|---|---|---|
| **Refactoring UI** (Wathan & Schoger) | Fixing "developer-made" UI fast: hierarchy by tone/weight, spacing scale, palette shades, fewer borders, shadows | Spacing steps ≥ 25% apart; 8–10 greys; 5–10 shades per hue; 45–75 cpl |
| **Apple HIG** | Type sizes, touch targets, dark mode, testing in sunlight | 17 pt body, 11 pt min; 44 pt targets; aim 7:1 |
| **Material 3** | Type roles, tonal elevation, motion tokens, bidirectionality (what mirrors) | Body 16/24; margins 16/24 dp; 48 dp targets; motion 50–400 ms |
| **Nielsen Norman Group** | Evidence: hierarchy, Gestalt, icons, animation, dark mode, critique | 3 size levels; squint test; 100–300 ms |
| **Smashing Magazine** | Mobile typography, legibility CSS, text over images, inclusive dark mode | 16 px mobile body; 30–40 cpl mobile; 2 typefaces max |
| **Laws of UX** | Naming the principle behind a note (Proximity, Similarity, Common Region, Von Restorff, Fitts, Aesthetic-Usability) | – |
| **Butterick's Practical Typography** | Body text discipline and punctuation | 15–25 px web; 120–145% line-height; 45–90 cpl; caps +5–12% |
| **WCAG 2.2 / APCA** | Pass/fail numbers | 4.5 / 3 / 3; targets 24 (AA) and 44 (AAA) |
| **Hebrew sources** (W3C hlreq, Google Fonts, AlefAlefAlef, Oketz, Typotheque, lvvi) | Hebrew metrics, emphasis, quotes, bidi | §7 |

---

## 3. Education and the profession

### 3.1 What design schools teach in foundation years

**Bezalel, Visual Communication** [Bezalel-2015, V; the current syllabus may differ]
- Years 1–2 are compulsory foundations: "the link between content and form".
- First-year courses:
  - **יסודות הטיפוגרפיה** (Typography Fundamentals, full year). Hand practice first, "to feel the structure of the Hebrew and Latin letter", then word, line and text block, then signs and logotypes.
  - **יסודות רישום** (Drawing Fundamentals).
  - **מבוא לפיתוח צורה** (Introduction to Form): point, line, mass, positive/negative, composition, colour, scale, contrast.
  - Design thinking, illustration, photography/video, interaction.
- Year 2, **עיצוב טיפוגרפי** (Typographic Design): grids, typeface choice, sizes, spacing, column width.
- Studios in years 3–4 run on "ביקורת עבודות" (work critiques).

**Shenkar, Visual Communication** [Shenkar, V]
- A shared foundation year: Typography 1–2, Graphic Design 1, Drawing, Illustration, "Designer as Image-Maker", Message Delivery, Interactive 1, Logo & Image basics, Video, Animation, Manual techniques.
- Students then choose a track (graphic, digital product, video, illustration, games).

**HIT Holon** [HIT, S]
- Year 1A: visual literacy, basic elements and composition, UX/UI.
- Year 1B: colour theory, Gestalt, typography principles, layout, proportion and grid.

**WIZO Haifa** (now the University of Haifa School of Design, Neri Bloomfield) [Haifa-merger, V; Haifa-shnaton, S]
- B.Des with 54 of 160 credits in foundations.
- Years 1–2 build "tools for analysing and critiquing work".

**Musrara** (comparison point) [Musrara, V]
- Basic design (composition, hierarchy, warm/cool colour).
- Intro to Hebrew letter characteristics.
- Pictograms.

**RISD Experimental & Foundation Studies** [RISD, V]
- Three studios over two semesters: Drawing, Design, Spatial Dynamics.
- Every project ends in a group critique about "the capacity of the work to embody ideas".

**Parsons** [Parsons, S]
- A shared first year (Integrative Studio, Drawing/Imaging, Space/Materiality, Time).
- Communication-design core from year 2.

**Bauhaus Vorkurs and its descendants** [Itten, S; Getty-Bauhaus, S; Ruder, S; Basel, S]
- Itten's seven colour contrasts.
- Albers' relativity of colour.
- Moholy-Nagy's constructivism.
- The Basel Vorkurs (Maier); Emil Ruder's *Typographie* (point/line/surface, contrast, rhythm).
- Hofmann's form-reduction exercises.
- Müller-Brockmann's grid systems.

**Shared core everywhere:**
- Letter structure by hand (Hebrew **and** Latin in Israel).
- Composition (point, line, plane), colour contrast and relativity, hierarchy, grid.
- Conveying one message.
- **Regular critique against the wall.**

### 3.2 How top studios present and critique work

**Pentagram** [Pentagram-About, V; Pentagram-SMCC, V; EyeOnDesign, V]
- Partner-led: "the owners of the business are the creators of the work".
- No CEO; partners review each other at regular partner meetings.
- Case studies run **problem → idea → system → applications**.
- Their bilingual example (SMCC): the Latin face was drawn *to sit with* the Japanese, not on its own.

**IDEO / Stanford d.school** [Third-Way, S; GHELI, V]
- "Build to think": critique a working prototype on a real device.
- Brainstorm (judgement deferred) and critique (judgement on) are **separate modes**.
- **"I like / I wish / What if"** puts every comment in the same shape, so rank matters less.

**Instrument** [Instrument, V]
- "Designers who code. Developers who design."
- No hand-offs, so the craft survives into the build.

**Fantasy** [Fantasy, V]
- Now "AI-native"; known for self-initiated "What If?" concept films.
- No public description of its internal critique practice [U].

**Figma** [Figma-Crit, V]
- Six crit formats.
- The presenter states "the feedback I am looking for / NOT looking for".
- Crits should be "motivating, not intimidating".

**NN/g** [NNG-Crit, V]
- Three roles: presenter, critiquer, facilitator.
- Turn "that looks bad" into "does this help users complete the task?"

**Connor & Irizarry, *Discussing Design*** [DiscussingDesign, S]
- Objective → element → effective? → why.

**Liz Lerman's Critical Response Process** [Lerman, V]
- Neutral questions before opinions.

**Israel** [Firma, V; Hadar-INT, V; Dov, V; Koniak, V; Stern, S]
- **Firma (Tel Aviv):** a strategy-first "business design" studio. Brand idea → every touchpoint.
- **Yotam Hadar** (Bezalel/Yale, now NYC):
  - "Research based, concept driven and type led."
  - His bilingual catalogue *The State of Things* rotates Hebrew and English 180° so they share one story.
- **Tzur Golan:** I found no design studio by that name, only an advertising creative director, so it is not used here.
- **Close alternatives:**
  - Studio Dov Abramson, Jerusalem: form, colour and letters between tradition and innovation.
  - Studio Koniak: "will this still feel right in ten years?"
  - Adi Stern: Bezalel president; designer of the bilingual Noam Text.

### 3.3 AI and the profession (2025–2026)

**The evidence**
- **BLS (USA):**
  - 253,100 graphic-design jobs in 2025, median pay $62,960.
  - Projected **−2% for 2025–35**, about 16,000 openings a year (mostly replacements).
  - BLS states AI tools "are projected to make graphic designers more productive and reduce the need for these workers". The previous projection was +2.1% [BLS, V].
- **Adobe, June 2026:**
  - Graphic designers' real pay fell 1.2% over 2015–25.
  - **Web and digital-interface designers' real pay rose 17.8%** [Adobe-2026, V].
- **WEF Future of Jobs 2025:**
  - Graphic design is #11 of the fastest-declining roles to 2030.
  - UI/UX design is #8 of the fastest-growing [WEF/BEDA, V].
- **Figma State of the Designer 2026** (906 designers):
  - 91% say AI improves their designs, 89% say they work faster.
  - Sentiment is split: 36% say the profession got better, 35% say worse [Figma-2026, V].
- **AI in Design Report 2026** (900+ designers, mostly product designers):
  - The average designer uses 7 AI tools, up from 3 in 2025.
  - Half have shipped AI-generated code.
  - Hiring stresses "a high bar for craft, vision, and storytelling" [AIDesign-2026, V].
- **NN/g State of UX 2026:**
  - Entry-level roles remain scarce while senior and generalist roles recover.
  - UI skill alone is no longer a differentiator. What counts is "curated taste, research-informed contextual understanding, critical thinking, and careful judgment" [NNG-UX2026, V].
- **Pentagram (Giorgia Lupi, 2026):** craft lives in the slow loop of sketching, research and conversation. Use AI after the direction is set, to scale it [Pentagram-Lupi, V].

**Verdict on "the profession is disappearing"**
- **Partly true** for routine production design: social assets, simple layouts, stock-like images. The jobs are shrinking and entry-level jobs are hit hardest.
- **Not true** for the judgement layer. The job is splitting: **production is automated, and judgement becomes the job.**
- **What humans still add:**
  - taste and curation among endless options;
  - coherence of a whole system;
  - truthfulness and accountability for what is shown;
  - research and context;
  - language and culture (Hebrew/Latin pairing and RTL are still weak spots for AI builders [I]);
  - presenting the reasoning.
- **This project in miniature:** Base44 produced a beautiful page in 10 minutes with invented content. The council kept the look and rejected the fake device photos. That is the human contribution in one decision.

---

## 4. The crit method the skill uses

1. **State the objective** of the page or section in one line, for a real guest on a phone, in sun or at night.
2. **Pin up everything at once:** phone and desktop, light and dark, EN and HE (plus DE for length). Judge the **system**, not a single screen (Pentagram, RISD pin-up).
3. **Each note has three parts:** *element* → *principle or check id, with the measured number* → *why it looks amateur or slows the guest* (Connor & Irizarry, NN/g).
4. **Keep / problem / option:** "I like / I wish / What if" (d.school). This yields the "3 things not to touch" section.
5. **Taste is not a note.** If you can't name a principle or a number, drop it (NN/g).
6. **Real content in real languages, at real lengths** (Pentagram SMCC, Hadar).
7. **Squint test at 30% scale, and a 10-year test:** would it still look right without the trend? (NN/g, Koniak)
8. **Show the path:** the previous review → fixed / still open / new (Figma FYI crit, Pentagram case studies).

---

## 5. Critique checklist (40 measurable checks for a mobile web page)

Each check has an id, a measurable target and a source. Measured values come from `.claude/skills/graphic-designer/measure.js`.

**Hierarchy (V)**

| Id | Check | Target | Source |
|---|---|---|---|
| V1 | Squint test at 30% scale: the most important element of each section is obvious | 1 clear winner per view | NNG-Hierarchy |
| V2 | One primary (solid) action per view; secondary = outline, tertiary = link | ≤ 1 solid button per card/section | RUI-7tips |
| V3 | Secondary text de-emphasised by tone/weight, not by shrinking below the floor | secondary = `--muted`, ≥ 14 px | RUI-7tips |

**Typography (T)**

| Id | Check | Target | Source |
|---|---|---|---|
| T1 | Distinct font sizes in one page view (logo excluded) | ≤ 6–7 | NNG-5Principles, RUI |
| T2 | Sizes follow one ratio; each heading level has one size; adjacent levels differ ≥ 20% | ratio 1.2–1.25 on phone | TypeScale |
| T3 | Body ≥ 16 px; secondary ≥ 14 px; nothing a guest must read < 12 px | 16 / 14 / 12 | Smashing, HIG |
| T4 | Characters per line | phone 30–45; desktop 45–75; never > 80 | Baymard, Butterick |
| T5 | Line-height | body 1.4–1.6; headings 1.1–1.25 | Butterick, M3 |
| T6 | Families and weights | ≤ 2 families (+ logo as SVG); ≤ 4 weights each; no body weight < 400 | Smashing, HIG |
| T7 | All-caps labels tracked; lowercase and Hebrew not tracked | caps .05–.12em, ≤ 1 line | Butterick |
| T8 | Real punctuation | en dash (–), curly quotes, …, ×; Hebrew ״ ׳ | Butterick, W3C hlreq |

**Colour (C)**

| Id | Check | Target | Source |
|---|---|---|---|
| C1 | Text contrast | ≥ 4.5:1 (large ≥ 3:1); aim 7:1 for text under 14 px | WCAG 1.4.3, HIG |
| C2 | UI component edges, focus rings, meaningful icons | ≥ 3:1 against neighbours | WCAG 1.4.11 |
| C3 | One action accent; link colour only on clickable things; each semantic colour has one meaning | 1 accent + status colours | NNG-Similarity, HIG-Color |
| C4 | Text on photos has a scrim | ≥ 4.5:1 at the worst spot | Smashing-TextOverImages |
| C5 | Card surface vs page background, both themes | ≥ 1.15:1, or a visible edge ≥ 1.3:1 | I (sunlight), HIG |
| C6 | Colour is never the only signal | text or icon with every colour cue | WCAG 1.4.1 |

**Spacing and layout (S)**

| Id | Check | Target | Source |
|---|---|---|---|
| S1 | Spacing values from one scale | ≥ 85% on the 4-px grid; ≤ ~10 distinct values | Spec-8pt, RUI |
| S2 | Proximity ladder | inner padding < card gap < section gap | NNG-Proximity |
| S3 | Corner radii | ≤ 3 radii + pill | RUI-notes3 |
| S4 | Section rhythm | same top spacing for every section; no non-core section > ~35% of the scroll | I, NNG |
| S5 | Margins and alignment | 16–24 px phone margins; one alignment edge per column; icons optically centred | M3, HIG-Layout |
| S6 | Rows | equal-height cards; titles and actions aligned across a row | I, Gestalt continuity |

**Images (I)**

| Id | Check | Target | Source |
|---|---|---|---|
| I1 | One aspect ratio per component | 1 ratio per card type | MDN-object-fit |
| I2 | Crop from the original | ≤ ~40%; subject inside the frame (`object-position`) | I |
| I3 | No accidental letter/pillar-boxing | no `object-fit: contain` bands of a different colour | I |
| I4 | One photographic treatment per set | similar daylight, warmth and saturation | I |
| I5 | Overlays on a photo | ≤ 1 badge per corner; credits in one consistent place across components | I, Smashing |
| I6 | Weight and resolution | tiles ≤ 25 KB; natural ≤ 2.5× shown size | project brief |

**Icons and targets (K)**

| Id | Check | Target | Source |
|---|---|---|---|
| K1 | One icon family | same grid, stroke ±0.2, outline vs fill; no emoji next to line icons | Lucide |
| K2 | Icon sizes from a set, consistent per context | 16 / 20 / 24 | Lucide, MaterialSymbols |
| K3 | Non-universal icons have labels | always | NNG-Icons |
| K4 | Touch targets | ≥ 44 × 44 (≥ 24 with spacing as the floor) | HIG, WCAG 2.5.8 |
| K5 | RTL mirroring | directional icons mirrored; clocks, media and logos not | Material-Bidi |

**Motion (M)**

| Id | Check | Target | Source |
|---|---|---|---|
| M1 | Durations | 100–300 ms, ease-out on enter; nothing > 400 ms | NNG-AnimDuration |
| M2 | `prefers-reduced-motion` honoured | all transitions and animations | MDN-PRM |

**Dark mode (D)**

| Id | Check | Target | Source |
|---|---|---|---|
| D1 | No pure #000 or #fff | warm off-white text, ~87% emphasis | Material-Codelab |
| D2 | Elevation via lighter surfaces | surface vs bg ≥ ~1.2:1 | HIG-DarkMode, M2 |
| D3 | Accents lightened and still ≥ 4.5:1; semantic colours distinct | danger vs accent clearly different (≥ 1.5:1 or a different hue) | NNG-DarkIssues |
| D4 | Photos and badges behave | no glowing white images; badges on photos keep fixed colours | HIG-DarkMode |

---

## 6. Common mistakes of non-designers (what a pro spots in 10 seconds)

1. **Too many font sizes.** More than 6, or near-duplicates such as 13.12 / 13.33 / 13.44 px. [NNG; RUI]
2. **More than two typefaces.** A third or fourth family hidden in the logo; Light or Thin weights for body text. [Smashing; HIG]
3. **Everything emphasised:** bold everywhere, several accent colours, several badges per card. [NNG-Hierarchy]
4. **Hierarchy by size only.** Secondary text shrunk to 11–12 px instead of greyed. [RUI-7tips]
5. **Grey text on a coloured fill.** [RUI-7tips]
6. **Borders and boxes everywhere**, where spacing would do. [RUI; NNG-CommonRegion]
7. **Equal spacing everywhere**, so groups don't read; a heading floating midway between two blocks. [NNG-Proximity]
8. **Arbitrary spacing values** (3, 5, 9, 11, 14, 18, 22 px) instead of a scale. [Spec-8pt; RUI]
9. **Inconsistent radii and shadows**: 12 / 14 / 16 / 20 / 22 px on neighbouring things. [RUI-notes3]
10. **Centred paragraphs** longer than 2–3 lines. [Butterick]
11. **Lines too long on desktop** (> 80 characters) or too short on phone (< 25). [Baymard]
12. **Line-height wrong at either end:** 1.2 for body, 1.6 for big headings. [Butterick]
13. **Tracked lowercase or Hebrew; untracked all-caps.** [Butterick; W3C hlreq]
14. **Mixed icon styles:** emoji next to line icons, different strokes, enlarged small icons. [Lucide; RUI]
15. **Icons without labels.** [NNG-Icons]
16. **Tap targets under 44 px**, especially text links inside sentences used as the main action. [HIG; WCAG 2.5.8]
17. **Low-contrast grey on off-white**, worse in sunlight. [WCAG; HIG-Color]
18. **Colour as the only signal.** [WCAG 1.4.1]
19. **Text on busy photos without a scrim; badges and credits piled on the same photo.** [Smashing]
20. **Photos of mixed ratios and mixed light** in one row; portrait crops of landscape photos; letterboxing. [MDN; I]
21. **Dark mode as a colour flip:** shadows that vanish, cards that melt into the background, saturated accents, two warm reds that look the same. [Material; NNG-DarkIssues]
22. **Straight quotes and hyphens used as dashes.** [Butterick]
23. **Long decorative animations** that ignore reduced-motion. [NNG; MDN]
24. **CSS by accretion:** new override blocks stacked on old ones until nobody knows which value wins. The visible symptom is drift in sizes, radii and spacing. [I]

---

## 7. Hebrew and bilingual typography

### 7.1 What is different about Hebrew
- **One case, no capitals.** Letters "hang" from an invisible top line [Oketz, V].
  - Only ל rises above the letter height; ק and the final forms ך ן ף ץ drop below the baseline.
  - So the eye's "x-height" is the Hebrew letter height. Hebrew sits taller than Latin lowercase and shorter than Latin caps [Glyphs, S].
- **Stroke contrast is reversed.** Horizontals are heavier. Side by side with Latin, Hebrew looks darker and seems to have more line spacing [Oketz, V; GeekCalligraphy, V].
  - Adi Stern warns against importing Latin symmetry and Didot-style contrast [Stern, V].
- **No true italic.** OS "italic Hebrew" is a mechanical slant [Typotheque, V].
  - Emphasise with **weight**, colour, a second face, deliberate spacing or underline.
  - W3C: "Bold type is more likely to be used where English newspapers would use italics" [hlreq, V].
- **Letter-spacing** is a traditional *emphasis* device in Hebrew [hlreq, V].
  - So the Latin habit of tracking small caps labels has no equivalent. On Hebrew it reads as emphasis or a mistake [I].
- **Line-height:** about 1.5 for paragraphs and about 1–1.2 for headings (font-dependent 1.3–1.6) [lvvi, V].
  - Pointed text (ניקוד) needs more space, or a dedicated font [hlreq, V].
- **Israeli accessibility guidance** [lvvi, V]:
  - Sans for running text, weight 400–500.
  - 10–15 words per line.
  - Right-aligned; no justification.
  - 1–2 families, 1–3 weights; sizes in rem.
- **Punctuation:**
  - Gershayim ״ for abbreviations and acronyms (ת״א, מד״א).
  - Geresh ׳ for transliteration (צ׳ק-אין).
  - Maqaf ־ behaves like a hyphen.
  - Typewriter " and ' are the common fallback, but the real marks look more professional [hlreq, V].
- **"Make Hebrew 1–2 px bigger"** has no verifiable source. Compare the actual Hebrew letter height with the Latin lowercase of the paired font at 100% zoom [I].

### 7.2 Pairing and fonts
- **Google Fonts** lists 62 of 1,950 families with Hebrew [GF-meta, V].
  - Text sans: Open Sans, Rubik, Assistant, Heebo, Noto Sans Hebrew, IBM Plex Sans Hebrew, Varela Round, Alef.
  - Serif: Frank Ruhl Libre, David Libre, Noto Serif Hebrew.
- **Families designed as a pair** [GF-desc, V]:
  - **Heebo** = Roboto's Latin with Hebrew by Oded Ezer. Hebrew is the primary script in its metrics.
  - **Assistant** = Hebrew by Ben Nathan for Source Sans.
  - **Rubik** = Hubert & Fischer, with Hebrew revised by Meir Sadan.
  - **Frank Ruhl Libre** = revival of the classic Hebrew text face (Fontef).
- **Pairing rules:**
  - Prefer one family covering both scripts.
  - Otherwise match apparent letter height, weight and contrast. Low-contrast sans faces clash least [GeekCalligraphy, V; GF-Matrix, S].
- **Tools:** `font-size-adjust` (Baseline 2024) or `@font-face` with `unicode-range` + `size-adjust` to equalise the scripts [MDN-fsa, V; I].
- **This site:** Heebo for all Hebrew pages, Inter + Plus Jakarta Sans for Latin. On the Hebrew page, Latin words fall back to Heebo's Latin (Roboto), which is coherent. Do **not** mix Inter into Hebrew lines.

### 7.3 Direction and mixed content
- **Set direction in HTML** (`<html lang="he" dir="rtl">`), not in CSS. `lang` and `dir` are separate [W3C-dir, V].
- **`dir="auto"`** for dynamic or user content. Isolate opposite-direction phrases with `<bdi>` or `<span dir="ltr">`; use U+2066–2069 where markup is impossible [W3C-bidi, V].
  - Unwrapped numbers, phone numbers and English names spill punctuation to the wrong end of the line.
- **Logical CSS** (`margin-inline-start`, `inset-inline-end`, `text-align: start`) mirrors itself [CSS-logical, V].
- **What mirrors** [Material-Bidi, V]:
  - **Mirror:** back/forward arrows, chevrons that point "next", progress, list and chat icons, button order, forward-motion icons, the "external link ↗" arrow.
  - **Don't mirror:** numbers, phone numbers, clocks, media controls, charts, logos, the search magnifier, untranslated Latin text and URLs.
  - On the web, nothing flips by itself.

### 7.4 Hebrew checks (H1–H10, used by the skill)

| Id | Check | Target |
|---|---|---|
| H1 | `<html lang="he" dir="rtl">` set by the page, not by CSS | yes |
| H2 | No tracking on Hebrew text | letter-spacing 0 (measure.js `hebrewTracking` empty) |
| H3 | No slanted or italic Hebrew; emphasis by weight 600–700 | no `font-style: italic` on Hebrew |
| H4 | Hebrew line-height | body 1.5–1.6, headings 1.15–1.25; body weight 400–500 |
| H5 | One family for Hebrew (Heebo); Latin inside Hebrew lines doesn't switch to another family | no Inter inside Hebrew lines |
| H6 | Latin, numbers, phones and URLs in Hebrew text are isolated (`dir="auto"`, `<bdi>`); punctuation lands at the left end | test the lines that end in English |
| H7 | Directional glyphs mirrored (→ becomes ←, ↗ becomes ↖, "next" chevrons); clocks, media and logos are not | per K5 |
| H8 | Hebrew punctuation | ״ for acronyms (מד״א, ת״א), ׳ for transliteration (צ׳ק-אאוט); en dash, not " - " |
| H9 | Hebrew strings don't truncate where Latin didn't | check every `text-overflow: ellipsis` in HE; Hebrew phrases are often longer |
| H10 | Visual rhythm: a block of Latin content inside a Hebrew page is aligned to the start (right), has its own `dir`, and is a deliberate exception | `latinBlocksInRtl` reported; aim for 0 in core sections |

---

## 8. Sources

**Foundations and practitioners**
- RUI-7tips: https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886 (mirror read: https://prototypr.io/news/7-practical-tips-for-cheating-at-design-refactoring-ui-medium)
- RUI-Palette: https://www.refactoringui.com/previews/building-your-color-palette
- RUI book: https://refactoringui.com/
- RUI-notes: https://gist.github.com/selcukcihan/b9418596a98abfcd4bbc622550820cc5
- RUI-notes2: https://www.joelsleppy.com/blog/notes-on-refactoring-ui/
- RUI-notes3: https://iamaatoh.com/essays/refactoring-ui.html
- NNG-5Principles: https://www.nngroup.com/articles/principles-visual-design/
- NNG-Hierarchy: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- NNG-Proximity: https://www.nngroup.com/articles/gestalt-proximity/
- NNG-CommonRegion: https://www.nngroup.com/articles/common-region/
- NNG-Similarity: https://www.nngroup.com/articles/gestalt-similarity/
- NNG-Icons: https://www.nngroup.com/articles/icon-usability/
- NNG-AnimDuration: https://www.nngroup.com/articles/animation-duration/
- NNG-DarkIssues: https://www.nngroup.com/articles/dark-mode-users-issues/
- NNG-DarkMode: https://www.nngroup.com/articles/dark-mode/
- NNG-Crit: https://www.nngroup.com/articles/design-critiques/
- NNG-UX2026: https://www.nngroup.com/articles/state-of-ux-2026/
- LawsUX: https://lawsofux.com/law-of-proximity/, https://lawsofux.com/law-of-similarity/, https://lawsofux.com/law-of-common-region/, https://lawsofux.com/von-restorff-effect/, https://lawsofux.com/fittss-law/, https://lawsofux.com/aesthetic-usability-effect/
- Butterick: https://practicaltypography.com/summary-of-key-rules.html, https://practicaltypography.com/point-size.html, https://practicaltypography.com/line-length.html, https://practicaltypography.com/line-spacing.html, https://practicaltypography.com/letterspacing.html, https://practicaltypography.com/page-margins.html
- Apple HIG (read via the .json data endpoints): https://developer.apple.com/design/human-interface-guidelines/accessibility, …/typography, …/dark-mode, …/color, …/layout
- Android/M3: https://developer.android.com/develop/ui/compose/designsystems/material3, https://developer.android.com/guide/topics/ui/accessibility/apps, https://developer.android.com/codelabs/adaptive-material-guidance
- Material-Codelab (dark theme): https://codelabs.developers.google.com/codelabs/design-material-darktheme
- M2-DarkTheme (snippet only): https://m2.material.io/design/color/dark-theme.html
- M3 layout (snippet only): https://m3.material.io/foundations/layout/applying-layout
- M3-motion (token implementation): https://docs.rs/material-rs/latest/src/material_rs/theme/motion.rs.html; official: https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- MaterialSymbols: https://developers.google.com/fonts/docs/material_symbols
- Google Design, dark theme: https://design.google/library/material-design-dark-theme
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html, …/non-text-contrast.html, …/use-of-color.html, …/text-spacing.html, …/target-size-minimum.html
- APCA: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell
- Smashing: https://www.smashingmagazine.com/2018/06/reference-guide-typography-mobile-web-design/, https://www.smashingmagazine.com/2020/07/css-techniques-legibility/, https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/, https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/
- Baymard: https://baymard.com/blog/line-length-readability
- TypeScale: https://typescale.com/
- Spec-8pt: https://spec.fm/specifics/8-pt-grid
- LogRocket 60-30-10: https://blog.logrocket.com/ux-design/60-30-10-rule/
- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit, https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion, https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust
- Lucide: https://lucide.dev/contribute/icon-design-guide
- Mueller-Brockmann (summary): https://www.thegraphicdesignschool.com/design-history/joseph-mueller-brockmann/

**Hebrew and RTL**
- Oketz: https://oketz.com/introduction/
- GeekCalligraphy: https://geekcalligraphy.com/blog/2018/2/5/why-hebrew-and-english-on-the-same-page-always-looks-terrible
- Stern: https://luc.devroye.org/AdiStern-Aleph=X.html
- Typotheque: https://www.typotheque.com/articles/secondary-style-in-hebrew-typography
- hlreq: https://w3c.github.io/hlreq/ and https://www.w3.org/TR/hebr-lreq/
- lvvi (Hebrew typography for the web): https://lvvi.co.il/knowledge-center/טיפוגרפיה-עברית-א/
- AlefAlefAlef (summary only; the fetch timed out): https://alefalefalef.co.il/anatomy-of-type/
- Glyphs forum (summary only): https://forum.glyphsapp.com/t/hebrew-101-a-few-questions/12073
- Rosehill: https://blog.danielrosehill.com/posts/hebrew-fonts-worth-knowing
- GF-meta: https://fonts.google.com/metadata/fonts
- GF-desc: https://raw.githubusercontent.com/google/fonts/main/ofl/heebo/DESCRIPTION.en_us.html (also assistant, rubik, frankruhllibre)
- GF-Matrix: https://fonts.google.com/knowledge/choosing_type/pairing_typefaces_based_on_their_construction_using_the_font_matrix
- W3C-dir: https://www.w3.org/International/questions/qa-html-dir.en.html
- W3C-bidi: https://www.w3.org/International/articles/inline-bidi-markup/
- CSS-logical: https://www.w3.org/TR/css-logical-1/
- W3C authoring: https://www.w3.org/International/techniques/authoring-html
- Material-Bidi: https://www.mdui.org/en/design/1/usability/bidirectionality.html (mirror of M1); https://m2.material.io/design/usability/bidirectionality.html; https://m3.material.io/foundations/layout/bidirectionality-rtl
- Fontimonim, Fontef, Hagilda, Masterfont: searched; no relevant web-typography articles found (not cited).

**Education**
- Bezalel-2015: https://www.bezalel.ac.il/res/2012andupmisc/shnaton/2015/viscom15.pdf
- Shenkar: https://www.shenkar.ac.il/he/departments/design-visual-communication-curriculum/
- HIT (summary only): https://hit.ac.il/design/visual-communications/curriculum
- Haifa-shnaton: https://shnaton2025.haifa.ac.il/2024/09/01/עיצוב-תקשורת-חזותית-b-des/
- Haifa-merger: https://pr.haifa.ac.il/2023/04/historic-merger-with-haifas-neri-bloomfield-school-of-design-for-2023-24-academic-year/
- Musrara: https://musrara.co.il/visual-communication/first-year-syllabus/
- Parsons (summary only): https://www.newschool.edu/parsons/bfa-communication-design-curriculum/
- RISD: https://www.risd.edu/academics/experimental-and-foundation-studies
- Itten: https://en.wikipedia.org/wiki/Johannes_Itten
- Getty-Bauhaus: https://www.getty.edu/research/exhibitions_events/exhibitions/bauhaus/new_artist/form_color/color/
- Ruder: https://en.wikipedia.org/wiki/Emil_Ruder
- Basel: https://bookstore.thisisdisplay.org/products/the-foundations-program-at-the-school-of-design-basel-switzerland
- Third-Way (I like / I wish / What if): https://www.thirdway.org/thinking-tool/i-like-i-wish-what-if
- GHELI: https://repository.gheli.harvard.edu/repository/14053/
- Lerman: https://lizlerman.com/wp-content/uploads/2020/04/Critical-Response-Process-in-Brief_CRP-one-pager_updated-2020_03_24.pdf
- Center Centre: https://articles.centercentre.com/critique_design_interview/

**Studios**
- Pentagram-About: https://www.pentagram.com/about
- Pentagram-SMCC: https://www.pentagram.com/work/smcc
- Pentagram-Lupi: https://www.pentagram.com/work/in-defense-of-the-detour
- EyeOnDesign: https://eyeondesign.aiga.org/epically-long-how-pentagram-chooses-its-new-partners/
- IDEO brainstorm rules (summary only): https://www.ideou.com/blogs/inspiration/7-simple-rules-of-brainstorming
- Instrument: https://www.instrument.com/about/
- Fantasy: https://fantasy.co
- Figma-Crit: https://www.figma.com/blog/design-critiques-at-figma/
- DiscussingDesign (summary only): https://www.goodreads.com/book/show/32049560-discussing-design
- Firma: https://www.firmabrands.com
- Hadar-INT: https://www.itsnicethat.com/articles/yotam-hadar-graphic-design-111016
- Dov: https://www.studiodov.com/our-story/
- Koniak: https://vanschneider.com/blog/design-in/design-tel-aviv-featuring-studio-koniak/
- Stern (summary only): https://en.wikipedia.org/wiki/Adi_Stern; Noam Text: https://www.type-together.com/noam-text-hebrew-font

**AI and the profession**
- BLS: https://www.bls.gov/ooh/arts-and-design/graphic-designers.htm
- Adobe-2026: https://www.adobe.com/ai/research/202606/economic-state-of-creative-professions.html
- WEF/BEDA: https://beda.org/news/take-aways-for-design-from-the-wef-future-of-jobs-2025-report/
- Figma-2026: https://www.figma.com/blog/state-of-the-designer-2026/
- AIDesign-2026: https://stateofaidesign.com/
- NNG-UX2026: https://www.nngroup.com/articles/state-of-ux-2026/
- Not verified (403 or headline only, not relied on): https://www.designweek.co.uk/graphic-design-among-most-at-risk-jobs-from-ai-report/, https://www.fastcompany.com/91543989/ai-in-design-design-jobs-2026
