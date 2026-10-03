// Graphic-designer measuring kit for stayflorentin.com
// Paste this whole file into mcp__claude-in-chrome__javascript_tool on a tab that is
// already on https://stayflorentin.com/ (same origin, so the iframe is readable).
// Then call, for example:
//   await gd.load({lang:'en', w:400, h:860, dark:false});  gd.report()
//   await gd.load({lang:'he', w:400, h:860, dark:true});   gd.report()
//   await gd.load({lang:'en', w:1280, h:900});             gd.report()
//   gd.scroll(1600)   // then take a `zoom` screenshot of the iframe region
// Notes:
// - The site has NO ?lang= parameter. Language comes from localStorage "lang" (en/de/fr/he),
//   so gd.load() sets it before loading the iframe.
// - Dark mode = data-theme="dark" on <html> inside the iframe.
// - The Chrome window is often hidden: screenshots still work with the `zoom` action on the
//   iframe's rectangle (scale the coordinates by screenshot-width / window.innerWidth).
//   A hidden window can paint a frame late; wait 1 s after scrolling before a zoom.
// - Contents of closed <details> report a size in Chrome; every metric here skips them.

window.gd = (() => {
  let F = null;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const parse = c => {
    const m = c.match(/[\d.]+/g); if (!m) return null;
    let v = m.map(Number);
    if (c.startsWith('color(')) v = [v[0] * 255, v[1] * 255, v[2] * 255, v[3] === undefined ? 1 : v[3]];
    if (v[3] === undefined) v[3] = 1;
    return v;
  };
  const blend = (fg, bg) => [0, 1, 2].map(i => fg[i] * fg[3] + bg[i] * (1 - fg[3]));
  const lum = rgb => { const [r, g, b] = rgb.slice(0, 3).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const hex = h => { h = h.trim().replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };

  async function load({ lang = 'en', w = 400, h = 860, dark = false } = {}) {
    try { localStorage.setItem('lang', lang); } catch (_) {}
    document.querySelectorAll('iframe.gd').forEach(f => f.remove());
    F = document.createElement('iframe'); F.className = 'gd';
    F.style.cssText = `position:fixed;left:0;top:0;width:${w}px;height:${h}px;border:0;z-index:99999;background:#fff`;
    document.body.appendChild(F);
    await new Promise(r => { F.onload = r; F.src = '/?r=' + Date.now(); });
    await sleep(2500);
    const d = F.contentDocument;
    if (dark) d.documentElement.setAttribute('data-theme', 'dark');
    d.documentElement.style.scrollBehavior = 'auto';
    await sleep(300);
    return { title: d.title, dir: d.documentElement.dir, w, h, dark, lang };
  }
  function scroll(y) { F.contentWindow.scrollTo({ top: y, behavior: 'instant' }); return F.contentWindow.scrollY; }
  function openCard(id) { const c = F.contentDocument.querySelector('#card-' + id); if (!c) return 'no card'; c.open = true; scroll(c.getBoundingClientRect().top + F.contentWindow.scrollY - 70); return 'open ' + id; }

  function report() {
    const d = F.contentDocument, W = F.contentWindow;
    const vis = e => {
      const r = e.getBoundingClientRect(); if (!r.width || !r.height) return false;
      if (e.closest('details:not([open])') && !e.closest('summary')) return false;
      for (let x = e; x; x = x.parentElement) { const cs = W.getComputedStyle(x); if (cs.display === 'none' || cs.visibility === 'hidden') return false; }
      return true;
    };
    const tag = e => e.tagName + (typeof e.className === 'string' && e.className ? '.' + e.className.split(' ')[0] : '');
    const bgOf = el => {
      const stack = [];
      for (let e = el; e; e = e.parentElement) {
        const cs = W.getComputedStyle(e);
        if (/url|gradient/.test(cs.backgroundImage)) return null; // text on a photo or gradient: judge by eye
        if (e.tagName === 'IMG') return null;
        const c = parse(cs.backgroundColor);
        if (c && c[3] > 0) { stack.push(c); if (c[3] === 1) break; }
      }
      let base = [255, 255, 255];
      for (let i = stack.length - 1; i >= 0; i--) base = blend(stack[i], base);
      return base;
    };

    // 1. Type: distinct sizes, families, weights, contrast of every visible text node
    const sizes = {}, fams = {}, weights = {}, low = [], tiny = [];
    const tw = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT); const seen = new Set();
    while (tw.nextNode()) {
      const t = tw.currentNode; if (!t.textContent.trim()) continue;
      const el = t.parentElement; if (seen.has(el) || !vis(el)) continue; seen.add(el);
      const cs = W.getComputedStyle(el); const fs = Math.round(parseFloat(cs.fontSize) * 100) / 100;
      (sizes[fs] = sizes[fs] || new Set()).add(tag(el));
      const fam = cs.fontFamily.split(',')[0].replace(/"/g, ''); fams[fam] = (fams[fam] || 0) + 1;
      weights[cs.fontWeight] = (weights[cs.fontWeight] || 0) + 1;
      const txt = t.textContent.trim().slice(0, 26);
      if (fs < 12) tiny.push(`${fs}px ${tag(el)} "${txt}"`);
      const bg = bgOf(el); if (!bg) continue;
      const fg = blend(parse(cs.color), bg); const r = ratio(fg, bg);
      const large = fs >= 24 || (fs >= 18.66 && +cs.fontWeight >= 700);
      if (r < (large ? 3 : 4.5)) low.push(`${r.toFixed(2)} ${fs}px ${tag(el)} "${txt}"`);
    }
    const sizeList = Object.keys(sizes).map(Number).sort((a, b) => a - b).map(s => `${s}px: ${[...sizes[s]].slice(0, 6).join(' ')}`);

    // 2. Headings and their scale steps
    const heads = [...new Set([...d.querySelectorAll('h1,h2,h3,.group-title,.eyebrow')].filter(vis).map(e => {
      const cs = W.getComputedStyle(e);
      return `${tag(e)} ${cs.fontSize}/${cs.lineHeight} w${cs.fontWeight} ls${cs.letterSpacing} ${cs.fontFamily.split(',')[0]}`;
    }))];

    // 3. Line length (characters per line) and line-height of running text
    const cv = d.createElement('canvas').getContext('2d'); const lines = [];
    d.querySelectorAll('p, li, .sub, .lead').forEach(p => {
      if (!vis(p)) return; const txt = p.textContent.trim(); if (txt.length < 50) return;
      const cs = W.getComputedStyle(p); cv.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const avg = cv.measureText(txt).width / txt.length;
      lines.push(`${Math.round(p.clientWidth / avg)}cpl lh${(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2)} ${cs.fontSize} ${tag(p)}`);
    });

    // 4. Spacing rhythm and radii
    const sp = {}; let on4 = 0, tot = 0; const rad = {};
    [...d.body.querySelectorAll('*')].filter(vis).forEach(e => {
      const cs = W.getComputedStyle(e);
      ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'rowGap', 'columnGap'].forEach(p => {
        const v = parseFloat(cs[p]); if (v > 0) { sp[v] = (sp[v] || 0) + 1; tot++; if (v % 4 === 0) on4++; }
      });
      if (cs.borderTopLeftRadius !== '0px') rad[cs.borderTopLeftRadius] = (rad[cs.borderTopLeftRadius] || 0) + 1;
    });

    // 5. Images: rendered aspect vs natural aspect (crop), and letterboxing
    const imgs = [];
    d.querySelectorAll('img').forEach(i => {
      if (!vis(i)) return; const r = i.getBoundingClientRect(); const cs = W.getComputedStyle(i);
      const ra = r.width / r.height, na = i.naturalWidth / (i.naturalHeight || 1);
      const crop = Math.round(100 * (1 - Math.min(ra, na) / Math.max(ra, na)));
      imgs.push(`${i.parentElement.className || i.parentElement.tagName}: shown ${Math.round(r.width)}x${Math.round(r.height)} (${ra.toFixed(2)}) natural ${i.naturalWidth}x${i.naturalHeight} (${na.toFixed(2)}) fit:${cs.objectFit} crop≈${crop}%`);
    });

    // 6. Icons and touch targets
    const icons = {}; d.querySelectorAll('svg').forEach(s => {
      if (!vis(s)) return; const r = s.getBoundingClientRect();
      const k = `${s.parentElement.className || s.parentElement.tagName} ${Math.round(r.width)}x${Math.round(r.height)} stroke ${s.getAttribute('stroke-width') || W.getComputedStyle(s).strokeWidth}`;
      icons[k] = (icons[k] || 0) + 1;
    });
    const targets = []; d.querySelectorAll('a,button,summary,input,select,label').forEach(e => {
      if (!vis(e)) return; const r = e.getBoundingClientRect();
      if ((r.height < 44 || r.width < 44) && !e.closest('p, li')) targets.push(`${Math.round(r.width)}x${Math.round(r.height)} ${tag(e)} "${(e.textContent || e.placeholder || '').trim().slice(0, 22)}"`);
    });

    // 7. Token contrast (current theme)
    const root = W.getComputedStyle(d.documentElement); const v = n => root.getPropertyValue(n).trim();
    const pairs = [['--ink', '--bg'], ['--muted', '--bg'], ['--muted', '--surface'], ['--accent', '--bg'], ['--accent', '--surface'], ['--accent', '--accent-soft'], ['--accent-ink', '--accent'], ['--accent-deco', '--bg'], ['--danger', '--surface'], ['--surface', '--bg'], ['--line', '--surface']]
      .filter(([a, b]) => /^#/.test(v(a)) && /^#/.test(v(b)))
      .map(([a, b]) => `${a} ${v(a)} on ${b} ${v(b)}: ${ratio(hex(v(a)), hex(v(b))).toFixed(2)}`);

    // 8. Hebrew specifics
    const heb = /[֐-׿]/;
    const hebTracking = [...d.querySelectorAll('*')].filter(e => e.children.length === 0 && vis(e) && heb.test(e.textContent) && parseFloat(W.getComputedStyle(e).letterSpacing) > 0.3)
      .map(e => `${tag(e)} ls ${W.getComputedStyle(e).letterSpacing} "${e.textContent.trim().slice(0, 20)}"`);
    const latinInRtl = d.documentElement.dir === 'rtl' ? [...d.querySelectorAll('h3,p')].filter(e => vis(e) && /^[A-Za-z]/.test(e.textContent.trim())).length : 0;
    const truncated = [...d.querySelectorAll('*')].filter(e => vis(e) && e.children.length === 0 && W.getComputedStyle(e).textOverflow === 'ellipsis' && e.scrollWidth > e.clientWidth + 1).map(e => `${tag(e)} "${e.textContent.trim().slice(0, 30)}"`);

    const sections = [...d.querySelectorAll('.hero, .block, section')].filter(vis).map(b => { const r = b.getBoundingClientRect(); return `${b.id || b.className} top ${Math.round(r.top + W.scrollY)} h ${Math.round(r.height)}`; });

    return {
      viewport: `${W.innerWidth}x${W.innerHeight}`, dir: d.documentElement.dir, theme: d.documentElement.getAttribute('data-theme') || 'light/system', pageHeight: d.documentElement.scrollHeight,
      fontSizesDistinct: sizeList.length, fontSizes: sizeList, families: fams, weights, headings: heads,
      tinyText: tiny.slice(0, 15), tinyCount: tiny.length, lowContrast: low.slice(0, 20), lowContrastCount: low.length,
      lineLength: [...new Set(lines)].slice(0, 20),
      spacingDistinct: Object.keys(sp).length, spacingOn4pxGridPct: Math.round(100 * on4 / tot), radii: rad,
      images: imgs.slice(0, 40), icons, smallTargets: targets.slice(0, 30), smallTargetCount: targets.length,
      tokenContrast: pairs, hebrewTracking: hebTracking.slice(0, 10), latinBlocksInRtl: latinInRtl, truncated: truncated.slice(0, 15), sections
    };
  }
  return { load, report, scroll, openCard, get frame() { return F; } };
})();
'gd ready: await gd.load({lang, w, h, dark}); gd.report()';
