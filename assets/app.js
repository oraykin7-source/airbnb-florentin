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
      first_title: "Your first hour", first_lead: "What every guest asks about on day one - tap a tile.", hi_morning: "Good morning", hi_afternoon: "Good afternoon", hi_evening: "Good evening", hi_night: "Good night", hi_city: "Tel Aviv",
      brand: "Florentin Home Guide", welcome: "Welcome home",
      house_title: "The apartment", week_title: "This week in Tel Aviv",
      places_title: "Places we love", places_lead: "Our favourite corners of the city, all close by. Tap a card for the map.", map: "Open in Maps", photo: "Photo",
      cat_food: "Food & restaurants", cat_culture: "Culture & city events", cat_nightlife: "Nightlife & parties",
      footer: "Made with care by your host. Enjoy Florentin!",
      stay_until: d => `Events during your stay · until ${d}`,
      checkout_today: "Check-out today - safe travels!",
      whatsapp: "WhatsApp your host", sos: "Emergency", reset_dates: "Use calendar dates",
      welcome_name: n => `Welcome home, ${n}`, name_prompt: "What should we call you?", name_save: "Save", name_change: "Not you?",
      stay_label: "Your check-out date (edit if it's not yours):", stay_label_none: "Your check-out date (optional, to filter events):",
      updated: d => `Updated ${d}`,
      during_stay: "during your stay", new_opening: "New", ongoing: "Ongoing",
      empty: "Nothing listed for your dates in this category yet - check another tab.",
      loading: "Loading…", unavailable: "This week's listings are being refreshed. Please check back soon.",
      more: "Details", copy: "Copy", copied: "Copied", source: "via",
    },
    de: {
      first_title: "Ihre erste Stunde", first_lead: "Was jeder Gast am ersten Tag fragt - Kachel antippen.", hi_morning: "Guten Morgen", hi_afternoon: "Guten Tag", hi_evening: "Guten Abend", hi_night: "Gute Nacht", hi_city: "Tel Aviv",
      brand: "Florentin Wohnungsguide", welcome: "Willkommen zu Hause",
      house_title: "Die Wohnung", week_title: "Diese Woche in Tel Aviv",
      places_title: "Unsere Lieblingsorte", places_lead: "Unsere liebsten Ecken der Stadt, alle in der Nähe. Karte antippen für den Weg.", map: "In Maps öffnen", photo: "Foto",
      cat_food: "Essen & Restaurants", cat_culture: "Kultur & Stadtevents", cat_nightlife: "Nachtleben & Partys",
      footer: "Mit Liebe von Ihrem Gastgeber. Viel Spaß in Florentin!",
      stay_until: d => `Veranstaltungen während Ihres Aufenthalts · bis ${d}`,
      checkout_today: "Heute ist Check-out - gute Reise!",
      whatsapp: "Gastgeber per WhatsApp", sos: "Notfall", reset_dates: "Kalenderdatum verwenden",
      welcome_name: n => `Willkommen zu Hause, ${n}`, name_prompt: "Wie dürfen wir Sie nennen?", name_save: "Speichern", name_change: "Nicht Sie?",
      stay_label: "Ihr Check-out-Datum (ändern, falls es nicht Ihres ist):", stay_label_none: "Ihr Check-out-Datum (optional, filtert die Events):",
      updated: d => `Aktualisiert am ${d}`,
      during_stay: "während Ihres Aufenthalts", new_opening: "Neu", ongoing: "Laufend",
      empty: "Für Ihre Daten gibt es in dieser Kategorie noch nichts - schauen Sie in einen anderen Reiter.",
      loading: "Wird geladen…", unavailable: "Die Tipps dieser Woche werden gerade aktualisiert. Bitte später erneut vorbeischauen.",
      more: "Details", copy: "Kopieren", copied: "Kopiert", source: "via",
    },
    fr: {
      first_title: "Votre première heure", first_lead: "Ce que tout voyageur demande le premier jour - touchez une tuile.", hi_morning: "Bonjour", hi_afternoon: "Bon après-midi", hi_evening: "Bonsoir", hi_night: "Bonne nuit", hi_city: "Tel Aviv",
      brand: "Guide de l'appart Florentin", welcome: "Bienvenue chez vous",
      house_title: "L'appartement", week_title: "Cette semaine à Tel Aviv",
      places_title: "Nos endroits préférés", places_lead: "Nos coins préférés de la ville, tous à deux pas. Touchez une carte pour l'itinéraire.", map: "Ouvrir dans Maps", photo: "Photo",
      cat_food: "Cuisine & restaurants", cat_culture: "Culture & événements", cat_nightlife: "Vie nocturne & soirées",
      footer: "Préparé avec soin par votre hôte. Profitez de Florentin !",
      stay_until: d => `Événements pendant votre séjour · jusqu'au ${d}`,
      checkout_today: "Départ aujourd'hui - bon voyage !",
      whatsapp: "WhatsApp à votre hôte", sos: "Urgences", reset_dates: "Utiliser la date du calendrier",
      welcome_name: n => `Bienvenue chez vous, ${n}`, name_prompt: "Comment vous appelle-t-on ?", name_save: "Enregistrer", name_change: "Ce n'est pas vous ?",
      stay_label: "Votre date de départ (modifiez si ce n'est pas la vôtre) :", stay_label_none: "Votre date de départ (facultatif, filtre les événements) :",
      updated: d => `Mis à jour le ${d}`,
      during_stay: "pendant votre séjour", new_opening: "Nouveau", ongoing: "En cours",
      empty: "Rien pour vos dates dans cette catégorie pour l'instant - essayez un autre onglet.",
      loading: "Chargement…", unavailable: "Les sorties de la semaine sont en cours de mise à jour. Revenez bientôt.",
      more: "Détails", copy: "Copier", copied: "Copié", source: "via",
    },
    he: {
      first_title: "השעה הראשונה שלכם", first_lead: "מה שכל אורח שואל ביום הראשון - לחצו על אריח.", hi_morning: "בוקר טוב", hi_afternoon: "צהריים טובים", hi_evening: "ערב טוב", hi_night: "לילה טוב", hi_city: "תל אביב",
      brand: "מדריך הדירה בפלורנטין", welcome: "ברוכים הבאים הביתה",
      house_title: "הדירה", week_title: "השבוע בתל אביב",
      places_title: "מקומות שאנחנו אוהבים", places_lead: "הפינות האהובות עלינו בעיר, כולן קרובות. לחצו על כרטיס למפה.", map: "פתיחה במפות", photo: "צילום",
      cat_food: "אוכל ומסעדות", cat_culture: "תרבות ואירועים", cat_nightlife: "חיי לילה ומסיבות",
      footer: "הוכן באהבה על ידי המארח שלכם. תיהנו מפלורנטין!",
      stay_until: d => `אירועים במהלך השהות · עד ${d}`,
      checkout_today: "צ'ק-אאוט היום - נסיעה טובה!",
      whatsapp: "וואטסאפ למארח", sos: "חירום", reset_dates: "לפי תאריכי היומן",
      welcome_name: n => `ברוכים הבאים הביתה, ${n}`, name_prompt: "איך לקרוא לכם?", name_save: "שמירה", name_change: "לא אתם?",
      stay_label: "תאריך הצ'ק-אאוט שלכם (אפשר לשנות אם זה לא שלכם):", stay_label_none: "תאריך הצ'ק-אאוט שלכם (לא חובה, לסינון אירועים):",
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
    if (/^\d{4}-\d{2}-\d{2}$/.test(co)) { try { localStorage.setItem("checkout", co); } catch (_) {} touched = true; }
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
    const hiIcon = hr < 6 || hr >= 20 ? "🌙" : hr < 12 ? "🌤️" : hr < 18 ? "☀️" : "🌇";
    document.getElementById("eyebrow").textContent = `${hiIcon} ${t(hiKey)} · ${t("hi_city")}`;
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
    if (num) { wa.href = `https://wa.me/${num}`; wa.hidden = false; } else wa.hidden = true;

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
      strip.append(el("a", { class: "tile", href: "#card-" + c.id, onclick: () => { const d = document.getElementById("card-" + c.id); if (d) d.open = true; } },
        c.thumb ? el("img", { src: c.thumb, alt: "", loading: "lazy" }) : el("span", { class: "tile-ico" }, c.icon),
        el("span", { class: "tile-txt" }, el("strong", {}, L_(c.title)), el("span", {}, L_(c.sub)))));
    }
    document.getElementById("first").hidden = firsts.length === 0;
    for (const c of state.house.cards) {
      const body = el("div", { class: "body" });
      if (c.image) {
        const img = el("img", { class: "card-img", src: c.image, alt: (c.image_alt && L_(c.image_alt)) || "", loading: "lazy",
          onerror: e => e.target.remove() });
        body.append(img);
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
        body.append(dl);
      }
      if (c.tel) {
        body.append(el("div", { class: "tel" },
          c.tel.map(x => el("a", { href: "tel:" + fill(x.number, host).replace(/[^\d+]/g, "") }, "📞 " + L_(x.label)))));
      }
      if (c.items) body.append(el("ul", {}, L_(c.items).map(s => el("li", {}, fill(s, host)))));
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
            el("span", { class: "muted" }, ` · ${r.where} · ${r.hours}`),
            r.note ? el("div", { class: "muted small" }, L_(r.note)) : null,
            (r.links || r.image_credit) ? el("div", { class: "row-links small" },
              ...(r.links || []).map(l => el("a", { href: l.url, target: "_blank", rel: "noopener" }, l.label + " →")),
              r.image_credit ? el("a", { class: "credit-link", href: r.image_credit_url || r.url, target: "_blank", rel: "noopener" }, `${t("photo")}: ${r.image_credit}`) : null) : null)))));
      }
      for (const sec of c.sections || []) {
        body.append(el("h4", { class: "sec-title" }, L_(sec.title)));
        if (sec.image) body.append(el("img", { class: "card-img card-img-tall", src: sec.image, alt: (sec.image_alt && L_(sec.image_alt)) || "", loading: "lazy", onerror: e => e.target.remove() }));
        if (sec.items) body.append(el("ul", {}, L_(sec.items).map(s => el("li", {}, fill(s, host)))));
      }
      if (c.link) body.append(el("div", { class: "tel" },
        el("a", { href: `${c.link.href}?lang=${L}` }, L_(c.link.label) + " →")));

      const card = el("details", { class: "card" + (c.emergency ? " emergency" : ""), id: "card-" + c.id },
        el("summary", {},
          c.thumb ? el("img", { class: "thumb", src: c.thumb, alt: "", loading: "lazy", onerror: e => e.target.replaceWith(el("span", { class: "ico", "aria-hidden": "true" }, c.icon)) })
                  : el("span", { class: "ico", "aria-hidden": "true" }, c.icon),
          el("span", {}, el("h3", {}, L_(c.title)), el("span", { class: "sub" }, L_(c.sub))),
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
      box.append(el("article", { class: "place" },
        el("a", { class: "place-media", href: p.map, target: "_blank", rel: "noopener", "aria-label": L_(p.title) },
          el("img", { src: p.image, alt: L_(p.title), loading: "lazy", width: "1200", height: "675" }),
          el("span", { class: "walk" }, L_(p.walk))),
        el("div", { class: "place-body" },
          el("h3", {}, L_(p.title)),
          el("p", {}, L_(p.text)),
          el("div", { class: "place-foot" },
            el("a", { class: "credit-link", href: p.credit_url, target: "_blank", rel: "noopener" }, `${t("photo")}: ${p.credit}`),
            el("a", { class: "map-link", href: p.map, target: "_blank", rel: "noopener" }, t("map") + " →")))));
    }
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
          el("a", { href: it.url, target: "_blank", rel: "noopener" }, t("more") + " →"))));
    }
  }

  function renderAll() { renderChrome(); renderHouse(); renderPlaces(); renderEvents(); }

  // ---------- wiring ----------
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
    state.lang = b.dataset.lang; saveLang(state.lang); renderAll();
  }));
  document.querySelectorAll("#cat-tabs button").forEach(b => b.addEventListener("click", () => {
    state.cat = b.dataset.cat; renderChrome(); renderEvents();
  }));

  // The Emergency button also opens the card, not just scrolls to it
  document.getElementById("sos-btn").addEventListener("click", () => {
    const card = document.getElementById("card-emergency"); if (card) card.open = true;
  });
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
  getJSON("content/house.json").then(v => { state.house = v; renderChrome(); renderHouse(); }).catch(() => { state.house = null; });
  getJSON("content/places.json").then(v => { state.places = v; renderPlaces(); }).catch(() => {});
  Promise.allSettled([getJSON(DEMO ? "data/weekly.sample.json" : "data/weekly.json"), getJSON(DEMO ? "data/stays.sample.json" : "data/stays.json")])
    .then(([weekly, stays]) => {
      state.weekly = weekly.status === "fulfilled" ? weekly.value : null;
      state.stays = stays.status === "fulfilled" ? stays.value : null;
      renderChrome(); renderEvents();
    });
})();
