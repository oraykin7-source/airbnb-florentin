(() => {
  "use strict";

  const LANGS = ["en", "de", "fr", "he"];
  const LOCALES = { en: "en-GB", de: "de-DE", fr: "fr-FR", he: "he-IL" };
  const TZ = "Asia/Jerusalem";
  // ?demo loads sample data for previewing the layout before the first weekly run
  const DEMO = new URLSearchParams(location.search).has("demo");
  const CHECKOUT_CUTOFF_HOUR = 14; // on check-out day, after this hour the page assumes the next guest

  const UI = {
    en: {
      fav: "My guests' pick", more_tours: "all tours",
      tours_title: "Day trips & tours", tab_tours: "Tours", book: "Details & booking",
      sos_static2: "Siren? Here's what to do", open_sat: "Open Sat", closed_sat: "closed Sat", until: "until", from: "from", open_247: "24/7", load_error: "Couldn't load the apartment guide - check your connection and refresh, or message Oren.",
      tab_home: "Start", tab_house: "Apartment", tab_places: "Places", tab_week: "This week",
      first_title: "Your first hour", first_lead: "What every guest asks about on day one - tap a tile.", hi_morning: "Good morning", hi_afternoon: "Good afternoon", hi_evening: "Good evening", hi_night: "Good night", hi_city: "Tel Aviv",
      brand: "A cozy room in Florentin", brand_short: "Cozy room", welcome: "Welcome home",
      house_title: "The apartment", week_title: "This week in Tel Aviv",
      places_title: "Places I love", places_lead: "My favourite corners of the city - most within a 20-minute walk. Tap a card for the map. Guided-tour buttons are partner links - same price for you.", map: "Open in Maps", photo: "Photo",
      cat_food: "Food & restaurants", cat_culture: "Culture & city events", cat_nightlife: "Nightlife & parties",
      footer: "Made with care by your host. Enjoy Florentin!",
      stay_until: d => `Events during your stay · until ${d}`,
      checkout_today: "Check-out today - safe travels!",
      whatsapp: "WhatsApp your host", sos: "Emergency", reset_dates: "Reset to booking dates",
      welcome_name: n => `Welcome home, ${n}`, name_prompt: "Your first name", name_save: "Save", name_change: "Not you?",
      stay_label: "Showing events from today until your check-out:", stay_label_none: "Showing events from today. Enter your check-out date to narrow the list:",
      updated: d => `Updated ${d}`,
      during_stay: "during your stay", new_opening: "New", ongoing: "Ongoing",
      empty: "Nothing listed for your dates in this category yet - check another tab.",
      loading: "Loading…", unavailable: "This week's listings are being refreshed. Please check back soon.",
      more: "Details", copy: "Copy", copied: "Copied", source: "via",
    },
    de: {
      fav: "Tipp meiner Gäste", more_tours: "alle Touren",
      tours_title: "Ausflüge & Touren", tab_tours: "Touren", book: "Details & Buchung",
      sos_static2: "Sirene? So geht's", open_sat: "Sa. offen", closed_sat: "Sa. geschlossen", until: "bis", from: "ab", open_247: "rund um die Uhr", load_error: "Der Wohnungsguide konnte nicht geladen werden - Verbindung prüfen und neu laden, oder Oren schreiben.",
      tab_home: "Start", tab_house: "Wohnung", tab_places: "Orte", tab_week: "Woche",
      first_title: "Ihre erste Stunde", first_lead: "Was jeder Gast am ersten Tag fragt - Kachel antippen.", hi_morning: "Guten Morgen", hi_afternoon: "Guten Tag", hi_evening: "Guten Abend", hi_night: "Gute Nacht", hi_city: "Tel Aviv",
      brand: "Ein gemütliches Zimmer in Florentin", brand_short: "Gemütliches Zimmer", welcome: "Willkommen zu Hause",
      house_title: "Die Wohnung", week_title: "Diese Woche in Tel Aviv",
      places_title: "Meine Lieblingsorte", places_lead: "Meine liebsten Ecken der Stadt - die meisten in 20 Minuten zu Fuß. Karte antippen für den Weg. Die Tour-Buttons sind Partnerlinks - gleicher Preis für Sie.", map: "In Maps öffnen", photo: "Foto",
      cat_food: "Essen & Restaurants", cat_culture: "Kultur & Stadtevents", cat_nightlife: "Nachtleben & Partys",
      footer: "Mit Liebe von Ihrem Gastgeber. Viel Spaß in Florentin!",
      stay_until: d => `Veranstaltungen während Ihres Aufenthalts · bis ${d}`,
      checkout_today: "Heute ist Check-out - gute Reise!",
      whatsapp: "Gastgeber per WhatsApp", sos: "Notfall", reset_dates: "Zurück zu den Buchungsdaten",
      welcome_name: n => `Willkommen zu Hause, ${n}`, name_prompt: "Ihr Vorname", name_save: "Speichern", name_change: "Nicht Sie?",
      stay_label: "Events von heute bis zu Ihrem Check-out:", stay_label_none: "Events ab heute. Check-out-Datum eingeben, um die Liste einzugrenzen:",
      updated: d => `Aktualisiert am ${d}`,
      during_stay: "während Ihres Aufenthalts", new_opening: "Neu", ongoing: "Laufend",
      empty: "Für Ihre Daten gibt es in dieser Kategorie noch nichts - schauen Sie in einen anderen Reiter.",
      loading: "Wird geladen…", unavailable: "Die Tipps dieser Woche werden gerade aktualisiert. Bitte später erneut vorbeischauen.",
      more: "Details", copy: "Kopieren", copied: "Kopiert", source: "via",
    },
    fr: {
      fav: "Le choix de mes voyageurs", more_tours: "toutes les excursions",
      tours_title: "Excursions & visites", tab_tours: "Visites", book: "Détails et réservation",
      sos_static2: "Sirène ? Voici quoi faire", open_sat: "Ouvert sam.", closed_sat: "fermé sam.", until: "jusqu'à", from: "à partir de", open_247: "24h/24", load_error: "Impossible de charger le guide - vérifiez la connexion et rechargez, ou écrivez à Oren.",
      tab_home: "Accueil", tab_house: "Appart", tab_places: "Lieux", tab_week: "Semaine",
      first_title: "Votre première heure", first_lead: "Ce que tout voyageur demande le premier jour - touchez une tuile.", hi_morning: "Bonjour", hi_afternoon: "Bon après-midi", hi_evening: "Bonsoir", hi_night: "Bonne nuit", hi_city: "Tel Aviv",
      brand: "Une chambre cosy à Florentin", brand_short: "Chambre cosy", welcome: "Bienvenue chez vous",
      house_title: "L'appartement", week_title: "Cette semaine à Tel Aviv",
      places_title: "Mes endroits préférés", places_lead: "Mes coins préférés de la ville - la plupart à 20 minutes à pied. Touchez une carte pour l'itinéraire. Les boutons de visite guidée sont des liens partenaires - même prix pour vous.", map: "Ouvrir dans Maps", photo: "Photo",
      cat_food: "Cuisine & restaurants", cat_culture: "Culture & événements", cat_nightlife: "Vie nocturne & soirées",
      footer: "Préparé avec soin par votre hôte. Profitez de Florentin !",
      stay_until: d => `Événements pendant votre séjour · jusqu'au ${d}`,
      checkout_today: "Départ aujourd'hui - bon voyage !",
      whatsapp: "WhatsApp à votre hôte", sos: "Urgences", reset_dates: "Revenir aux dates de la réservation",
      welcome_name: n => `Bienvenue chez vous, ${n}`, name_prompt: "Votre prénom", name_save: "Enregistrer", name_change: "Ce n'est pas vous ?",
      stay_label: "Événements d'aujourd'hui jusqu'à votre départ :", stay_label_none: "Événements à partir d'aujourd'hui. Indiquez votre date de départ pour affiner la liste :",
      updated: d => `Mis à jour le ${d}`,
      during_stay: "pendant votre séjour", new_opening: "Nouveau", ongoing: "En cours",
      empty: "Rien pour vos dates dans cette catégorie pour l'instant - essayez un autre onglet.",
      loading: "Chargement…", unavailable: "Les sorties de la semaine sont en cours de mise à jour. Revenez bientôt.",
      more: "Détails", copy: "Copier", copied: "Copié", source: "via",
    },
    he: {
      fav: "הבחירה של האורחים שלי", more_tours: "כל הסיורים",
      tours_title: "טיולי יום וסיורים", tab_tours: "טיולים", book: "פרטים והזמנה",
      sos_static2: "אזעקה? מה עושים", open_sat: "פתוח בשבת", closed_sat: "סגור בשבת", until: "עד", from: "מ-", open_247: "24/7", load_error: "לא הצלחנו לטעון את מדריך הדירה - בדקו חיבור ורעננו, או כתבו לאורן.",
      tab_home: "התחלה", tab_house: "הדירה", tab_places: "מקומות", tab_week: "השבוע",
      first_title: "השעה הראשונה שלכם", first_lead: "מה שכל אורח שואל ביום הראשון - לחצו על תמונה.", hi_morning: "בוקר טוב", hi_afternoon: "צהריים טובים", hi_evening: "ערב טוב", hi_night: "לילה טוב", hi_city: "תל אביב",
      brand: "חדר נעים בפלורנטין", brand_short: "חדר נעים", welcome: "ברוכים הבאים הביתה",
      house_title: "הדירה", week_title: "השבוע בתל אביב",
      places_title: "מקומות שאני אוהב", places_lead: "הפינות האהובות עליי בעיר - רובן ב-20 דקות הליכה. לחצו על כרטיס למפה. כפתורי הסיור המודרך הם קישורי שותפים - אותו מחיר בשבילכם.", map: "פתיחה במפות", photo: "צילום",
      cat_food: "אוכל ומסעדות", cat_culture: "תרבות ואירועים", cat_nightlife: "חיי לילה ומסיבות",
      footer: "הוכן באהבה על ידי המארח שלכם. תיהנו מפלורנטין!",
      stay_until: d => `אירועים במהלך השהות · עד ${d}`,
      checkout_today: "צ'ק-אאוט היום - נסיעה טובה!",
      whatsapp: "וואטסאפ למארח", sos: "חירום", reset_dates: "חזרה לתאריכי ההזמנה",
      welcome_name: n => `ברוכים הבאים הביתה, ${n}`, name_prompt: "השם שלכם", name_save: "שמירה", name_change: "לא אתם?",
      stay_label: "אירועים מהיום ועד הצ'ק-אאוט שלכם:", stay_label_none: "אירועים מהיום. הזינו תאריך צ'ק-אאוט כדי לצמצם את הרשימה:",
      updated: d => `עודכן ${d}`,
      during_stay: "במהלך השהות", new_opening: "חדש", ongoing: "מתמשך",
      empty: "עדיין אין פריטים לתאריכים שלכם בקטגוריה הזו - נסו לשונית אחרת.",
      loading: "טוען…", unavailable: "רשימת השבוע מתעדכנת כרגע. בדקו שוב בקרוב.",
      more: "פרטים", copy: "העתקה", copied: "הועתק", source: "מתוך",
    },
  };

  const state = { lang: pickLang(), cat: "food", house: null, places: null, weekly: null, stays: null };

  // Personalisation lives only in this browser. A link from the host's Airbnb message can carry
  // ?guest=Anna&checkout=2026-10-26 (Airbnb fills those in); we store them once and drop them from the URL.
  function guestName() { try { return (localStorage.getItem("guest") || "").trim().slice(0, 40); } catch (_) { return ""; } }
  function setGuestName(n) { try { n ? localStorage.setItem("guest", n.trim().slice(0, 40)) : localStorage.removeItem("guest"); } catch (_) {} }
  (function readLinkParams() {
    const q = new URLSearchParams(location.search);
    const g = (q.get("guest") || "").replace(/[<>"'&]/g, "").trim();
    const co = q.get("checkout") || "";
    let touched = false;
    if (g) { setGuestName(g); touched = true; }
    let iso = /^\d{4}-\d{2}-\d{2}$/.test(co) ? co : "";
    if (!iso && co) { const dt = new Date(co); if (!isNaN(dt)) iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`; }
    if (iso) { try { localStorage.setItem("checkout", iso); } catch (_) {} touched = true; }
    if (touched) { q.delete("guest"); q.delete("checkout"); history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : "") + location.hash); }
  })();

  // ---------- helpers ----------
  function pickLang() {
    try {
      const saved = localStorage.getItem("lang");
      if (LANGS.includes(saved)) return saved;
    } catch (_) { /* storage blocked */ }
    const nav = (navigator.languages || [navigator.language || "en"]).map(l => l.slice(0, 2).toLowerCase());
    return nav.find(l => LANGS.includes(l)) || "en";
  }
  function saveLang(l) { try { localStorage.setItem("lang", l); } catch (_) {} }

  // "YYYY-MM-DD" of the current date in Tel Aviv, plus the local hour
  function nowInTLV() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false,
    }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    return { date: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")) % 24 };
  }
  // Sunrise/sunset for Tel Aviv (NOAA approximation), returned as minutes-of-day in local (TLV) time.
  function sunTimesTLV(now = new Date()) {
    const lat = 32.08 * Math.PI / 180, lon = 34.78;
    const tlv = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
    const g = t => Number(tlv.find(p => p.type === t).value);
    const localMin = (g("hour") % 24) * 60 + g("minute");
    const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
    let offset = localMin - utcMin; if (offset > 720) offset -= 1440; if (offset < -720) offset += 1440;
    const start = Date.UTC(g("year"), 0, 0), doy = Math.floor((Date.UTC(g("year"), g("month") - 1, g("day")) - start) / 864e5);
    const y = 2 * Math.PI / 365 * (doy - 1 + (12 - 12) / 24);
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(y) - 0.032077 * Math.sin(y) - 0.014615 * Math.cos(2 * y) - 0.040849 * Math.sin(2 * y));
    const decl = 0.006918 - 0.399912 * Math.cos(y) + 0.070257 * Math.sin(y) - 0.006758 * Math.cos(2 * y) + 0.000907 * Math.sin(2 * y) - 0.002697 * Math.cos(3 * y) + 0.00148 * Math.sin(3 * y);
    const ha = Math.acos(Math.cos(90.833 * Math.PI / 180) / (Math.cos(lat) * Math.cos(decl)) - Math.tan(lat) * Math.tan(decl)) * 180 / Math.PI;
    const sunrise = 720 - 4 * (lon + ha) - eq + offset;
    const sunset = 720 - 4 * (lon - ha) - eq + offset;
    return { nowMin: localMin, sunrise, sunset };
  }
  function skyPhase() {
    const { nowMin: m, sunrise, sunset } = sunTimesTLV();
    const dawn = sunrise - 30, dusk = sunset + 25, glow = sunset - 75;
    if (m < dawn || m >= dusk) return "night";
    if (m >= glow) return "evening";
    if (m < 11 * 60) return "morning";
    return "noon";
  }
  function fmtDate(iso, opts) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Intl.DateTimeFormat(LOCALES[state.lang], { timeZone: "UTC", ...opts }).format(Date.UTC(y, m - 1, d));
  }
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
    return n;
  };
  // {{key}} placeholders; a per-language object picks the current language
  const fill = (s, host) => String(s).replace(/\{\{(\w+)\}\}/g, (_, k) => {
    const v = host[k];
    return v && typeof v === "object" ? (v[state.lang] ?? v.en ?? "") : (v ?? "");
  });
  const t = key => UI[state.lang][key];
  const ARROW = () => state.lang === "he" ? "←" : "→";
  // External links on a card or section: [{label: {en,...}, url: "https://..." | {en,...}}]
  const extLinks = links => el("div", { class: "ext-links" },
    links.map(l => el("a", { href: L_(l.url), target: "_blank", rel: "noopener" }, L_(l.label) + " " + ARROW())));
  // "until 17:00, closed Sat" style hour strings -> localised
  const hoursText = h => String(h || "").replace(/\b24\/7\b/, t("open_247")).replace(/\buntil\b/g, t("until")).replace(/\bfrom\b/g, t("from")).replace(/closed Sat/g, t("closed_sat")).replace(/open Shabbat/g, t("open_sat"));

  // Names mentioned in text become links: places -> their card, apartment cards -> the card,
  // shops/restaurants -> their map link. Built from the JSON, so nothing to maintain by hand.
  const LINKS = new Map();
  function registerLinks() {
    LINKS.clear();
    const add = (name, href, kind) => { if (name && name.length > 3) LINKS.set(name, { href, kind }); };
    for (const c of (state.house && state.house.cards) || []) {
      for (const L of LANGS) add(c.title[L], "#card-" + c.id, "card");
      for (const lst of c.lists || []) for (const r of lst.rows) add(r.name, r.url, "out");
    }
    // places win over shop rows with the same name (Levinsky Market -> the place card, not the map)
    for (const p of (state.places && state.places.places) || []) for (const L of LANGS) add(p.title[L], "#place-" + p.id, "in");
    const placeAlias = { beach: ["The beach", "the beach", "Strand", "la plage", "הים", "החוף"], old_jaffa: ["Old Jaffa", "Alt-Jaffa", "vieux Jaffa", "יפו העתיקה", "flea market", "Flohmarkt", "marché aux puces", "שוק הפשפשים"],
      jaffa_port: ["Jaffa Port", "Hafen von Jaffa", "port de Jaffa", "נמל יפו"], carmel: ["Carmel Market", "Carmel-Markt", "marché du Carmel", "שוק הכרמל"],
      rothschild: ["Rothschild", "רוטשילד"], neve_tzedek: ["Neve Tzedek", "נווה צדק"], levinsky: ["Levinsky", "Levinski", "לוינסקי"], hatachana: ["HaTachana", "התחנה"] };
    for (const [id, names] of Object.entries(placeAlias)) if ((state.places && state.places.places || []).some(p => p.id === id)) for (const n of names) add(n, "#place-" + id, "in");
    // a few plain words that point at cards
    const alias = { en: { "Groceries card": "shops", "Emergency card": "emergency", "kitchen guide": "kitchen", "House rules": "rules" },
                    de: { "Karte Einkaufen": "shops", "Karte Notfall": "emergency", "Küchenguide": "kitchen" },
                    fr: { "carte Courses": "shops", "carte Urgences": "emergency", "guide cuisine": "kitchen" },
                    he: { "כרטיס קניות": "shops", "כרטיס חירום": "emergency", "מדריך המטבח": "kitchen" } };
    for (const L of LANGS) for (const [k, id] of Object.entries(alias[L] || {})) add(k, "#card-" + id, "card");
    // phrases that point at the separate kitchen guide page
    const kitchenPage = (state.house && state.house.cards.find(c => c.id === "kitchen") || {}).link;
    if (kitchenPage) for (const k of ["The full guide", "full kitchen guide", "kitchen guide", "Die vollständige Anleitung", "Küchenguide", "Le guide complet", "guide cuisine", "המדריך המלא", "מדריך המטבח"])
      add(k, kitchenPage.href + "?lang=" + state.lang, "page");
  }
  function rich(text, selfId) {
    text = String(text);
    if (!LINKS.size) return [text];
    const keys = [...LINKS.keys()].sort((a, b) => b.length - a.length);
    const re = new RegExp("(" + keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "g");
    const isLetter = ch => /[\p{L}\p{N}]/u.test(ch || "");
    const out = []; let last = 0, m;
    while ((m = re.exec(text))) {
      const before = text[m.index - 1], after = text[m.index + m[0].length];
      // whole words only (a Hebrew prefix letter ו/ב/ל/מ/ה/ש/כ directly before is fine)
      if (isLetter(after) || (isLetter(before) && !(/[ובלמהשכ]/.test(before) && !isLetter(text[m.index - 2])))) continue;
      const { href, kind } = LINKS.get(m[0]);
      if (selfId && href === "#card-" + selfId) continue;
      if (m.index > last) out.push(text.slice(last, m.index));
      const attrs = { class: "auto " + kind, href };
      if (kind === "out") { attrs.target = "_blank"; attrs.rel = "noopener"; }
      else if (kind === "page") { /* same tab */ }
      else attrs.onclick = e => { const d = document.querySelector(href); if (!d) return; e.preventDefault(); if (d.tagName === "DETAILS") d.open = true; requestAnimationFrame(() => d.scrollIntoView({ block: "start", behavior: "smooth" })); };
      out.push(el("a", attrs, m[0] + (kind === "out" ? " ↗" : "")));
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  }
  const L_ = o => (o && typeof o === "object") ? (o[state.lang] ?? o.en ?? "") : (o ?? "");

  async function getJSON(path) {
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw new Error(`${path}: ${r.status}`);
    return r.json();
  }

  // ---------- stay window (from calendar-derived check-out dates) ----------
  // The calendar only tells us the next check-out; it can't know who opened the page.
  // A guest may override it with the date picker (kept in this browser only).
  function guestCheckout() {
    try { const v = localStorage.getItem("checkout"); return /^\d{4}-\d{2}-\d{2}$/.test(v || "") ? v : null; } catch (_) { return null; }
  }
  function setGuestCheckout(v) { try { v ? localStorage.setItem("checkout", v) : localStorage.removeItem("checkout"); } catch (_) {} }
  function currentStay() {
    const { date: today, hour } = nowInTLV();
    const chosen = guestCheckout();
    if (chosen && chosen >= today) return { today, checkout: chosen, source: "guest" };
    const checkouts = (state.stays && state.stays.checkouts) || [];
    const next = checkouts.slice().sort().find(c => c > today || (c === today && hour < CHECKOUT_CUTOFF_HOUR));
    return { today, checkout: next || null, source: next ? "calendar" : null };
  }

  // ---------- render ----------
  function renderChrome() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "he" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll(".lang button").forEach(b =>
      b.setAttribute("aria-checked", String(b.dataset.lang === state.lang)));
    document.querySelectorAll("#cat-tabs button").forEach(b =>
      b.setAttribute("aria-selected", String(b.dataset.cat === state.cat)));

    const name = guestName();
    const hr = nowInTLV().hour;
    const hiKey = hr < 5 ? "hi_night" : hr < 12 ? "hi_morning" : hr < 18 ? "hi_afternoon" : hr < 23 ? "hi_evening" : "hi_night";
    const sky = skyPhase();
    document.getElementById("eyebrow").replaceChildren(
      el("img", { class: "sky", src: `assets/img/sky/${sky}.webp`, alt: "", width: "40", height: "40", loading: "eager" }),
      el("span", {}, `${t(hiKey)} · ${t("hi_city")}`));
    document.getElementById("welcome").textContent = name ? t("welcome_name")(name) : t("welcome");
    const nb = document.getElementById("name-box");
    nb.replaceChildren();
    if (name) {
      nb.append(el("button", { class: "linkish", type: "button", onclick: () => { setGuestName(""); renderChrome(); } }, t("name_change")));
    } else {
      const inp = el("input", { type: "text", maxlength: "40", placeholder: t("name_prompt"), autocomplete: "given-name" });
      const save = () => { if (inp.value.trim()) { setGuestName(inp.value); renderChrome(); } };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") save(); });
      nb.append(inp, el("button", { class: "qbtn qbtn-ghost", type: "button", onclick: save }, t("name_save")));
    }

    const wa = document.getElementById("wa-btn");
    const num = state.house && String(state.house.host.whatsapp || "").replace(/\D/g, "");
    if (num) wa.href = `https://wa.me/${num}`;
    wa.hidden = !(num || wa.getAttribute("href"));

    // date picker for the events section
    const { today, checkout, source } = currentStay();
    const label = document.getElementById("stay-label");
    const input = document.getElementById("checkout-input");
    const reset = document.getElementById("checkout-reset");
    label.textContent = checkout ? t("stay_label") : t("stay_label_none");
    input.min = today;
    input.value = checkout || "";
    reset.hidden = source !== "guest";
  }

  function renderHouse() {
    const box = document.getElementById("house-cards");
    box.replaceChildren();
    if (!state.house) return;
    const host = state.house.host;
    const L = state.lang;
    const groups = state.house.groups || {};
    const grids = {};
    for (const [gid, label] of Object.entries(groups)) {
      grids[gid] = el("div", { class: "cards" });
      box.append(el("h3", { class: "group-title", "data-group": gid }, el("span", { class: "dot", "aria-hidden": "true" }), L_(label)), grids[gid]);
    }
    const strip = document.getElementById("first-hour");
    strip.replaceChildren();
    const firsts = state.house.cards.filter(c => c.first_hour).sort((a, b) => a.first_hour - b.first_hour);
    for (const c of firsts) {
      strip.append(el("a", { class: "tile", href: "#card-" + c.id, onclick: e => { const d = document.getElementById("card-" + c.id); if (!d) return; e.preventDefault(); d.open = true; requestAnimationFrame(() => d.scrollIntoView({ block: "start", behavior: "smooth" })); } },
        (c.tile || c.thumb) ? el("img", { src: c.tile || c.thumb, alt: "", loading: "lazy" }) : el("span", { class: "tile-ico" }, c.icon),
        el("span", { class: "tile-txt" }, el("strong", {}, L_(c.title)), el("span", {}, L_(c.sub)))));
    }
    document.getElementById("first").hidden = firsts.length === 0;
    for (const c of state.house.cards) {
      const body = el("div", { class: "body" });
      const parts = { img: null, kv: null, tel: null, items: null, steps: [] };
      if (c.image) {
        parts.img = el("img", { class: "card-img", src: c.image, alt: (c.image_alt && L_(c.image_alt)) || "", loading: "lazy",
          onerror: e => e.target.remove() });
      }
      if (c.kv) {
        const dl = el("dl", { class: "kv" });
        for (const row of c.kv) {
          const val = fill(row.value, host);
          const dd = el("dd", {}, val);
          if (row.copy && navigator.clipboard) {
            const btn = el("button", { class: "copy", type: "button" }, t("copy"));
            btn.addEventListener("click", async () => {
              try { await navigator.clipboard.writeText(val); btn.textContent = t("copied"); } catch (_) {}
              setTimeout(() => { btn.textContent = t("copy"); }, 1500);
            });
            dd.append(btn);
          }
          dl.append(el("dt", {}, L_(row.label)), dd);
        }
        parts.kv = dl;
      }
      if (c.tel) {
        parts.tel = el("div", { class: "tel" },
          c.tel.map(x => el("a", { href: "tel:" + fill(x.number, host).replace(/[^\d+]/g, "") }, "📞 " + L_(x.label))));
      }
      if (c.items) parts.items = el("ul", {}, L_(c.items).map(s => el("li", {}, ...rich(fill(s, host), c.id))));
      if (c.steps) {
        if (c.steps_title) parts.steps.push(el("h4", { class: "sec-title" }, L_(c.steps_title)));
        parts.steps.push(el("ol", { class: "steps" }, L_(c.steps).map(s => el("li", {}, ...rich(fill(s, host), c.id)))));
      }
      // A card with numbered steps (the emergency card) shows what to DO first, the photo and phone numbers after
      body.append(...(c.steps ? [parts.items, ...parts.steps, parts.img, parts.kv, parts.tel]
                              : [parts.img, parts.kv, parts.tel, parts.items]).filter(Boolean));
      if (c.video) {
        body.append(el("video", { class: "card-video", src: c.video.src, poster: c.video.poster || "", muted: "", loop: "", playsinline: "", controls: "", preload: "none" }));
        body.append(el("p", { class: "muted small" }, L_(c.video.caption)));
      }
      for (const lst of c.lists || []) {
        body.append(el("h4", { class: "sec-title" }, L_(lst.title)));
        body.append(el("ul", { class: "plain" }, lst.rows.map(r => el("li", { class: "row" + (r.image ? " row-img" : "") },
          r.image ? el("a", { class: "row-pic", href: r.url, target: "_blank", rel: "noopener", "aria-hidden": "true", tabindex: "-1" },
            el("img", { src: r.image, alt: "", loading: "lazy", onerror: e => e.target.closest(".row-pic").remove() })) : null,
          el("div", { class: "row-txt" },
            el("a", { href: r.url, target: "_blank", rel: "noopener" }, r.name),
            el("span", { class: "muted" }, `${r.where} · ${hoursText(r.hours)}`),
            r.shabbat === true ? el("span", { class: "badge sat" }, t("open_sat")) : null,
            r.note ? el("div", { class: "muted small" }, L_(r.note)) : null,
            (r.links || r.image_credit) ? el("div", { class: "row-links small" },
              ...(r.links || []).map(l => el("a", { href: l.url, target: "_blank", rel: "noopener" }, l.label + " " + ARROW())),
              r.image_credit ? el("a", { class: "credit-link", href: r.image_credit_url || r.url, target: "_blank", rel: "noopener" }, `${t("photo")}: ${r.image_credit}`) : null) : null)))));
      }
      for (const sec of c.sections || []) {
        body.append(el("h4", { class: "sec-title" }, L_(sec.title)));
        if (sec.image) body.append(el("img", { class: "card-img card-img-tall", src: sec.image, alt: (sec.image_alt && L_(sec.image_alt)) || "", loading: "lazy", onerror: e => e.target.remove() }));
        if (sec.items) body.append(el("ul", {}, L_(sec.items).map(s => el("li", {}, ...rich(fill(s, host), c.id)))));
        if (sec.links) body.append(extLinks(sec.links));
      }
      if (c.links) body.append(extLinks(c.links));
      if (c.link) body.append(el("div", { class: "tel" },
        el("a", { href: `${c.link.href}?lang=${L}` }, L_(c.link.label) + " " + ARROW())));

      const card = el("details", { class: "card" + (c.emergency ? " emergency" : ""), id: "card-" + c.id },
        el("summary", {},
          c.thumb ? el("img", { class: "thumb", src: c.thumb, alt: "", loading: "lazy", onerror: e => e.target.replaceWith(el("span", { class: "ico", "aria-hidden": "true" }, c.icon)) })
                  : el("span", { class: "ico", "aria-hidden": "true" }, c.icon),
          el("span", {}, el("h3", {}, fill(L_(c.title), host)), el("span", { class: "sub" }, fill(L_(c.sub), host))),
          el("span", { class: "chev", "aria-hidden": "true" }, "▾")),
        body);
      (grids[c.group] || box).append(card);
    }
  }

  function renderPlaces() {
    const box = document.getElementById("places-list");
    box.replaceChildren();
    if (!state.places) return;
    const L = state.lang;
    for (const p of state.places.places) {
      box.append(el("article", { class: "place", id: "place-" + p.id },
        el("a", { class: "place-media", href: p.map, target: "_blank", rel: "noopener", "aria-label": L_(p.title) },
          el("img", { src: p.image, alt: L_(p.title), loading: "lazy", width: "1200", height: "675" }),
          el("span", { class: "walk" }, L_(p.walk))),
        el("div", { class: "place-body" },
          el("h3", {}, L_(p.title)),
          el("p", {}, ...rich(L_(p.text))),
          p.tour ? el("a", { class: "place-tour", href: p.tour.url, target: "_blank", rel: "noopener sponsored" }, "🧭 " + L_(p.tour.label) + " " + ARROW()) : null,
          el("div", { class: "place-foot" },
            el("a", { class: "credit-link", href: p.credit_url, target: "_blank", rel: "noopener" }, `${t("photo")}: ${p.credit}`),
            el("a", { class: "map-link", href: p.map, target: "_blank", rel: "noopener" }, t("map") + " " + ARROW())))));
    }
  }

  // Day trips & tours: open photo cards (same look as the weekly events), each with a partner link
  function renderTours() {
    const sec = document.getElementById("tours"), box = document.getElementById("tours-list");
    const tr = state.house && state.house.tours;
    const has = !!(tr && tr.items && tr.items.length);
    sec.hidden = !has;
    document.querySelectorAll('.jump a[href="#tours"], .tabbar a[data-target="tours"]').forEach(a => { a.hidden = !has; });
    box.replaceChildren();
    if (!has) return;
    document.getElementById("tours-lead").textContent = L_(tr.lead);
    document.getElementById("tours-note").textContent = L_(tr.note);
    for (const it of tr.items) {
      if (it.langs && !it.langs.includes(state.lang)) continue;   // e.g. a Hebrew-only booking site
      const media = el("a", { class: "ev-media", href: it.url, target: "_blank", rel: "noopener sponsored", "aria-hidden": "true", tabindex: "-1" },
        el("img", { src: it.image, alt: "", loading: "lazy", referrerpolicy: "no-referrer",
          onerror: e => { e.target.parentNode.replaceWith(el("div", { class: "ev-media ph ph-culture", "aria-hidden": "true" }, "🧭")); } }),
        it.image_credit ? el("span", { class: "credit" }, it.image_credit) : null,
        it.fav ? el("span", { class: "fav-tag" }, "★ " + t("fav")) : null);
      box.append(el("article", { class: "ev tour", id: "tour-" + it.id },
        media,
        el("div", { class: "ev-top" }, el("h3", {}, L_(it.title))),
        el("div", { class: "where" }, L_(it.meta)),
        el("p", {}, L_(it.blurb)),
        el("div", { class: "foot-row" },
          it.image_credit_url ? el("a", { class: "credit-link", href: it.image_credit_url, target: "_blank", rel: "noopener" }, t("photo")) : el("span", {}),
          el("a", { class: "book", href: it.url, target: "_blank", rel: "noopener sponsored" }, t("book") + " " + ARROW()))));
    }
    if (tr.more) box.append(el("a", { class: "more-tours", href: tr.more.url, target: "_blank", rel: "noopener sponsored" }, L_(tr.more.label) + " " + ARROW()));
  }

  const MAX_FEED_AGE_DAYS = 10;
  function feedIsStale() {
    if (!state.weekly || !state.weekly.generated_at) return true;
    const age = (Date.now() - Date.parse(state.weekly.generated_at)) / 86400000;
    return !(age >= -1 && age <= MAX_FEED_AGE_DAYS);
  }
  function renderEvents() {
    const box = document.getElementById("events");
    const meta = document.getElementById("week-meta");
    box.replaceChildren();
    // A feed that failed to load or wasn't refreshed for over 10 days is hidden entirely -
    // showing expired events would be worse than showing nothing.
    const stale = state.weekly !== undefined && feedIsStale();
    document.getElementById("week").hidden = stale;
    document.querySelector('.jump a[href="#week"]').hidden = stale;
    const wt = document.querySelector('.tabbar a[data-target="week"]'); if (wt) wt.hidden = stale;
    if (stale) return;
    if (!state.weekly) {
      box.append(el("p", { class: "empty" }, state.weekly === null ? t("unavailable") : t("loading")));
      meta.textContent = "";
      return;
    }
    const L = state.lang;
    const hu = document.getElementById("headsup");
    hu.replaceChildren(...(state.weekly.headsup || []).map(n =>
      el("li", {}, el("span", { class: "hu-ico", "aria-hidden": "true" }, n.icon || "ℹ️"), L_(n.text))));
    hu.hidden = hu.children.length === 0;
    const { today, checkout } = currentStay();
    const stayTxt = checkout ? (checkout === today ? t("checkout_today") : t("stay_until")(fmtDate(checkout, { weekday: "short", day: "numeric", month: "short" }))) : "";
    meta.textContent = [stayTxt, t("updated")(fmtDate(state.weekly.generated_at.slice(0, 10), { day: "numeric", month: "long" }))].filter(Boolean).join(" · ");
    const windowEnd = state.weekly.window_end;
    const until = checkout && checkout < windowEnd ? checkout : windowEnd;

    const items = state.weekly.items
      .filter(it => it.category === state.cat)
      .filter(it => {
        if (!it.date_start) return true;                 // e.g. new restaurant openings
        const end = it.date_end || it.date_start;
        return end >= today && it.date_start <= until;   // overlaps [today, stay end]
      })
      .sort((a, b) => (a.date_start || "0").localeCompare(b.date_start || "0"));

    if (!items.length) { box.append(el("p", { class: "empty" }, t("empty"))); return; }

    for (const it of items) {
      let when;
      if (!it.date_start) when = it.category === "food" ? t("new_opening") : t("ongoing");
      else if (it.date_end && it.date_end !== it.date_start)
        when = `${fmtDate(it.date_start < today ? today : it.date_start, { day: "numeric", month: "short" })} – ${fmtDate(it.date_end, { day: "numeric", month: "short" })}`;
      else when = fmtDate(it.date_start, { weekday: "short", day: "numeric", month: "short" });
      if (it.time) when += ` · ${it.time}`;

      const inStay = checkout && it.date_start && it.date_start <= checkout && (it.date_end || it.date_start) >= today;
      const whereBits = [it.venue, it.area].filter(Boolean).join(" · ");
      const host = (() => { try { return new URL(it.url).hostname.replace(/^www\./, ""); } catch (_) { return it.source; } })();

      const ICON = { food: "🍽️", culture: "🎭", nightlife: "🎧" };
      const media = it.image
        ? el("div", { class: "ev-media" },
            el("img", { src: it.image, alt: "", loading: "lazy", referrerpolicy: "no-referrer",
              onerror: e => { e.target.parentNode.replaceWith(el("div", { class: `ev-media ph ph-${it.category}` }, ICON[it.category])); } }),
            it.image_credit ? el("span", { class: "credit" }, it.image_credit) : null)
        : el("div", { class: `ev-media ph ph-${it.category}`, "aria-hidden": "true" }, ICON[it.category]);

      box.append(el("article", { class: "ev" },
        media,
        el("div", { class: "ev-top" },
          el("h3", {}, L_(it.title), inStay ? el("span", { class: "badge" }, t("during_stay")) : null),
          el("span", { class: "when" }, when)),
        whereBits ? el("div", { class: "where" }, whereBits + (it.price ? ` · ${it.price}` : "")) : null,
        el("p", {}, L_(it.blurb)),
        el("div", { class: "foot-row" },
          el("span", { class: "src" }, `${t("source")} ${host}`),
          el("a", { href: it.url, target: "_blank", rel: "noopener" }, t("more") + " " + ARROW()))));
    }
  }

  // Deep link: stayflorentin.com/#card-tours opens that card and scrolls to it (links sent in messages)
  const hashCard = () => (/^#card-[\w-]+$/.test(location.hash) ? location.hash.slice(1) : null);
  let openCard = hashCard(), hashScrolled = false;
  function applyHashCard() {
    if (!openCard) return;
    const d = document.getElementById(openCard === "card-tours" ? "tours" : openCard); if (!d || d.hidden) return;   // not rendered yet: try again after the data loads
    if (d.tagName === "DETAILS") d.open = true;
    if (!hashScrolled) { hashScrolled = true; requestAnimationFrame(() => d.scrollIntoView({ block: "start" })); }
  }
  window.addEventListener("hashchange", () => { openCard = hashCard(); hashScrolled = false; applyHashCard(); });
  function renderAll() { registerLinks(); renderChrome(); renderHouse(); renderTours(); renderPlaces(); renderEvents(); applyHashCard(); }

  // Bottom tab bar: highlight the section in view
  (function tabbar() {
    const links = [...document.querySelectorAll(".tabbar a")];
    const hero = document.querySelector(".hero"); if (hero && !hero.id) hero.id = "hero";
    const targets = ["hero", "first", "house", "tours", "places", "week"].map(id => document.getElementById(id)).filter(Boolean);
    const tabOf = id => (id === "hero" || id === "first") ? "top" : id;
    const io = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!vis) return;
      links.forEach(a => a.setAttribute("aria-current", a.dataset.target === tabOf(vis.target.id) ? "true" : "false"));
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, .1, .5] });
    targets.forEach(el => io.observe(el));
  })();

  // ---------- wiring ----------
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
    state.lang = b.dataset.lang; saveLang(state.lang); renderAll();
  }));
  document.querySelectorAll("#cat-tabs button").forEach(b => b.addEventListener("click", () => {
    state.cat = b.dataset.cat; renderChrome(); renderEvents();
  }));

  // The Emergency button also opens the card, not just scrolls to it
  document.querySelectorAll("#sos-btn, #sos-brand, #sos-link").forEach(b => b.addEventListener("click", e => {
    const card = document.getElementById("card-emergency"); if (!card) return;
    e.preventDefault(); card.open = true;
    requestAnimationFrame(() => card.scrollIntoView({ block: "start", behavior: "smooth" }));
  }));
  document.getElementById("checkout-input").addEventListener("change", e => {
    setGuestCheckout(e.target.value || null); renderChrome(); renderEvents();
  });
  document.getElementById("checkout-reset").addEventListener("click", () => {
    setGuestCheckout(null); renderChrome(); renderEvents();
  });

  state.weekly = undefined; // loading
  renderAll();

  // Each part renders as soon as its own file arrives: a slow or failed events feed
  // never delays the apartment / emergency cards.
  getJSON("content/house.json").then(v => { state.house = v; registerLinks(); renderChrome(); renderHouse(); renderTours(); renderPlaces(); applyHashCard(); }).catch(() => { state.house = null; const b = document.getElementById("house-cards"); b.replaceChildren(el("p", { class: "empty" }, t("load_error"))); });
  getJSON("content/places.json").then(v => { state.places = v; registerLinks(); renderPlaces(); renderHouse(); applyHashCard(); }).catch(() => {});
  Promise.allSettled([getJSON(DEMO ? "data/weekly.sample.json" : "data/weekly.json"), getJSON(DEMO ? "data/stays.sample.json" : "data/stays.json")])
    .then(([weekly, stays]) => {
      state.weekly = weekly.status === "fulfilled" ? weekly.value : null;
      state.stays = stays.status === "fulfilled" ? stays.value : null;
      renderChrome(); renderEvents();
    });
})();
