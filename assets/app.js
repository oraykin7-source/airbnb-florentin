(() => {
  "use strict";

  const LANGS = ["en", "de", "fr"];
  const LOCALES = { en: "en-GB", de: "de-DE", fr: "fr-FR" };
  const TZ = "Asia/Jerusalem";
  // ?demo loads sample data for previewing the layout before the first weekly run
  const DEMO = new URLSearchParams(location.search).has("demo");
  const CHECKOUT_CUTOFF_HOUR = 14; // on check-out day, after this hour the page assumes the next guest

  const UI = {
    en: {
      brand: "Florentin Home Guide", welcome: "Welcome home",
      house_title: "The apartment", week_title: "This week in Tel Aviv",
      cat_food: "Food & restaurants", cat_culture: "Culture & city events", cat_nightlife: "Nightlife & parties",
      footer: "Made with care by your host. Enjoy Florentin!",
      stay_until: d => `Picked for your stay · until ${d}`,
      checkout_today: "Check-out today - safe travels!",
      updated: d => `Updated ${d}`,
      during_stay: "during your stay", new_opening: "New", ongoing: "Ongoing",
      empty: "Nothing listed for your dates in this category yet - check another tab.",
      loading: "Loading…", unavailable: "This week's listings are being refreshed. Please check back soon.",
      more: "Details", copy: "Copy", copied: "Copied", source: "via",
    },
    de: {
      brand: "Florentin Wohnungsguide", welcome: "Willkommen zu Hause",
      house_title: "Die Wohnung", week_title: "Diese Woche in Tel Aviv",
      cat_food: "Essen & Restaurants", cat_culture: "Kultur & Stadtevents", cat_nightlife: "Nachtleben & Partys",
      footer: "Mit Liebe von Ihrem Gastgeber. Viel Spaß in Florentin!",
      stay_until: d => `Ausgewählt für Ihren Aufenthalt · bis ${d}`,
      checkout_today: "Heute ist Check-out - gute Reise!",
      updated: d => `Aktualisiert am ${d}`,
      during_stay: "während Ihres Aufenthalts", new_opening: "Neu", ongoing: "Laufend",
      empty: "Für Ihre Daten gibt es in dieser Kategorie noch nichts - schauen Sie in einen anderen Reiter.",
      loading: "Wird geladen…", unavailable: "Die Tipps dieser Woche werden gerade aktualisiert. Bitte später erneut vorbeischauen.",
      more: "Details", copy: "Kopieren", copied: "Kopiert", source: "via",
    },
    fr: {
      brand: "Guide de l'appart Florentin", welcome: "Bienvenue chez vous",
      house_title: "L'appartement", week_title: "Cette semaine à Tel Aviv",
      cat_food: "Cuisine & restaurants", cat_culture: "Culture & événements", cat_nightlife: "Vie nocturne & soirées",
      footer: "Préparé avec soin par votre hôte. Profitez de Florentin !",
      stay_until: d => `Sélectionné pour votre séjour · jusqu'au ${d}`,
      checkout_today: "Départ aujourd'hui - bon voyage !",
      updated: d => `Mis à jour le ${d}`,
      during_stay: "pendant votre séjour", new_opening: "Nouveau", ongoing: "En cours",
      empty: "Rien pour vos dates dans cette catégorie pour l'instant - essayez un autre onglet.",
      loading: "Chargement…", unavailable: "Les sorties de la semaine sont en cours de mise à jour. Revenez bientôt.",
      more: "Détails", copy: "Copier", copied: "Copié", source: "via",
    },
  };

  const state = { lang: pickLang(), cat: "food", house: null, weekly: null, stays: null };

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
  const fill = (s, host) => String(s).replace(/\{\{(\w+)\}\}/g, (_, k) => host[k] ?? "");
  const t = key => UI[state.lang][key];

  async function getJSON(path) {
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw new Error(`${path}: ${r.status}`);
    return r.json();
  }

  // ---------- stay window (from calendar-derived check-out dates) ----------
  function currentStay() {
    const { date: today, hour } = nowInTLV();
    const checkouts = (state.stays && state.stays.checkouts) || [];
    const next = checkouts.slice().sort().find(c => c > today || (c === today && hour < CHECKOUT_CUTOFF_HOUR));
    return { today, checkout: next || null };
  }

  // ---------- render ----------
  function renderChrome() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll(".lang button").forEach(b =>
      b.setAttribute("aria-checked", String(b.dataset.lang === state.lang)));
    document.querySelectorAll("#cat-tabs button").forEach(b =>
      b.setAttribute("aria-selected", String(b.dataset.cat === state.cat)));

    const { today, checkout } = currentStay();
    const line = document.getElementById("stay-line");
    if (checkout) {
      line.textContent = checkout === today
        ? t("checkout_today")
        : t("stay_until")(fmtDate(checkout, { weekday: "short", day: "numeric", month: "short" }));
      line.hidden = false;
    } else line.hidden = true;
  }

  function renderHouse() {
    const box = document.getElementById("house-cards");
    box.replaceChildren();
    if (!state.house) return;
    const host = state.house.host;
    const L = state.lang;
    for (const c of state.house.cards) {
      const body = el("div", { class: "body" });
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
          dl.append(el("dt", {}, row.label[L]), dd);
        }
        body.append(dl);
      }
      if (c.tel) {
        body.append(el("div", { class: "tel" },
          c.tel.map(x => el("a", { href: "tel:" + fill(x.number, host).replace(/[^\d+]/g, "") }, "📞 " + x.label[L]))));
      }
      if (c.items) body.append(el("ul", {}, c.items[L].map(s => el("li", {}, fill(s, host)))));
      if (c.link) body.append(el("div", { class: "tel" },
        el("a", { href: `${c.link.href}?lang=${L}` }, c.link.label[L] + " →")));

      const card = el("details", { class: "card" + (c.emergency ? " emergency" : ""), id: "card-" + c.id },
        el("summary", {},
          el("span", { class: "ico", "aria-hidden": "true" }, c.icon),
          el("span", {}, el("h3", {}, c.title[L]), el("span", { class: "sub" }, c.sub[L])),
          el("span", { class: "chev", "aria-hidden": "true" }, "▾")),
        body);
      box.append(card);
    }
  }

  function renderEvents() {
    const box = document.getElementById("events");
    const meta = document.getElementById("week-meta");
    box.replaceChildren();
    if (!state.weekly) {
      box.append(el("p", { class: "empty" }, state.weekly === null ? t("unavailable") : t("loading")));
      meta.textContent = "";
      return;
    }
    const L = state.lang;
    meta.textContent = t("updated")(fmtDate(state.weekly.generated_at.slice(0, 10), { day: "numeric", month: "long" }));

    const { today, checkout } = currentStay();
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
          el("h3", {}, it.title[L], inStay ? el("span", { class: "badge" }, t("during_stay")) : null),
          el("span", { class: "when" }, when)),
        whereBits ? el("div", { class: "where" }, whereBits + (it.price ? ` · ${it.price}` : "")) : null,
        el("p", {}, it.blurb[L]),
        el("div", { class: "foot-row" },
          el("span", { class: "src" }, `${t("source")} ${host}`),
          el("a", { href: it.url, target: "_blank", rel: "noopener" }, t("more") + " →"))));
    }
  }

  function renderAll() { renderChrome(); renderHouse(); renderEvents(); }

  // ---------- wiring ----------
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
    state.lang = b.dataset.lang; saveLang(state.lang); renderAll();
  }));
  document.querySelectorAll("#cat-tabs button").forEach(b => b.addEventListener("click", () => {
    state.cat = b.dataset.cat; renderChrome(); renderEvents();
  }));

  state.weekly = undefined; // loading
  renderAll();

  Promise.allSettled([getJSON("content/house.json"), getJSON(DEMO ? "data/weekly.sample.json" : "data/weekly.json"), getJSON(DEMO ? "data/stays.sample.json" : "data/stays.json")])
    .then(([house, weekly, stays]) => {
      state.house = house.status === "fulfilled" ? house.value : null;
      state.weekly = weekly.status === "fulfilled" ? weekly.value : null;
      state.stays = stays.status === "fulfilled" ? stays.value : null;
      renderAll();
    });
})();
