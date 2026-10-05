const App = {
  init() {
    const root = document.getElementById('utxo-root');
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._reduce = reduce;

    root.querySelectorAll('[style-hover]').forEach((el) => {
      const base = el.getAttribute('style') || '';
      const hover = el.getAttribute('style-hover');
      el.addEventListener('mouseenter', () => { el.style.cssText = base + ';' + hover; });
      el.addEventListener('mouseleave', () => { el.style.cssText = base; });
    });

    root.querySelectorAll('[data-set-lang]').forEach((el) => {
      el.addEventListener('click', () => {
        const lang = el.getAttribute('data-set-lang');
        document.cookie = 'utxo_lang=' + lang + '; path=/; max-age=31536000; SameSite=Lax';
      });
    });

    this._initReveal(root, reduce);
    this._initMenu(root);
    this._initHeader(root);
    this._initDocQuote(root);
    this._initDocViz(root);
    this._initPlay(root, reduce);
    this._initPixelGrid(root, reduce);
    this._initBooking(root);
    this._initForms(root);
    this._initTeamScroll(root);
    this._initDemos(root);
    this._initDocDemo(root);
    this._initSwipe(root);
    this._initPress(root);
    this._initPressLogos(root);
    this._initHeroRotator(root, reduce);
    this._initConsent(root);
    this._initToc(root);
    this._initTables(root);
  },

  _initReveal(root, reduce) {
    const reveals = Array.prototype.slice.call(root.querySelectorAll('[data-reveal]'));
    if (reduce || !reveals.length || !('IntersectionObserver' in window)) return;
    const show = (el) => { el.style.opacity = '1'; el.style.transform = 'none'; };
    const vh = window.innerHeight || 800;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const d = e.target.getAttribute('data-delay');
        if (d) e.target.style.transitionDelay = d + 'ms';
        show(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top > vh * 1.05) { el.style.opacity = '0'; el.style.transform = 'translateY(16px)'; io.observe(el); }
    });
    setTimeout(() => reveals.forEach(show), 2500);
  },

  _initMenu(root) {
    const button = root.querySelector('[data-menu-open]');
    const menu = root.querySelector('[data-menu]');
    if (!button || !menu) return;
    const setOpen = (open) => {
      menu.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('is-menu-open', open);
      if (open) { const first = menu.querySelector('a, button'); if (first) first.focus(); }
      else button.focus({ preventScroll: true });
    };
    button.addEventListener('click', () => setOpen(true));
    menu.querySelectorAll('a, [data-menu-close]').forEach(el => el.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setOpen(false); });
  },

  _initHeader(root) {
    const header = root.querySelector('.site-header');
    if (!header) return;
    const hero = root.querySelector('.hero, .hero-product');
    const inks = Array.prototype.slice.call(root.querySelectorAll('main [data-surface="ink"], .site-footer[data-surface="ink"]'));
    let ticking = false;
    const update = () => {
      ticking = false;
      const h = header.offsetHeight;
      const top = window.scrollY <= 4;
      const overHero = hero ? hero.getBoundingClientRect().bottom > h : false;
      const overInk = inks.some(el => { const r = el.getBoundingClientRect(); return r.top <= h / 2 && r.bottom >= h / 2; });
      header.classList.toggle('is-solid', !top && overHero);
      header.classList.toggle('is-glass', !top && !overHero);
      header.classList.toggle('is-ink', !top && !overHero && overInk);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  },

  // --- product mockups (Fix B) ---
  // Renders the Doc Indexer page visuals from window.UTXO_DOCDEMO (single source with the guided demo):
  // [data-docmatrix] permission matrix, [data-docroles] same question for two roles, [data-docfiles] document strip.
  _initDocViz(root) {
    const data = window.UTXO_DOCDEMO;
    if (!data) return;
    const esc = (v) => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const langOf = (el) => (el.getAttribute('data-lang') === 'en' ? 'en' : 'de');
    const L = (v, lang) => (v && typeof v === 'object' ? v[lang] : v);
    const svg = (p, s) => '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" aria-hidden="true">' + p + '</svg>';
    const icon = {
      doc: svg('<path d="M7 3h7l5 5v13H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 3v5h5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>', 16),
      lock: svg('<rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/>', 14),
      spark: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>', 13)
    };
    const avatar = (r) => '<span class="pp-avatar dot-' + r.dot + '">' + esc(r.initials) + '</span>';
    const seenBy = (r) => data.docs.filter(d => d.roles.indexOf(r.id) > -1).map(d => d.id);
    const sees = (ui, n) => ui.role.sees.replace('{n}', n).replace('{t}', data.docs.length);

    root.querySelectorAll('[data-docmatrix]').forEach(el => {
      const lang = langOf(el);
      const ui = data.ui[lang];
      const changed = (el.getAttribute('data-changed') || '').split(':');
      const head = '<div class="pp-mx-row"><span></span>' + data.roles.map(r => '<span class="pp-mx-role">' + avatar(r) + '<small>' + esc(L(r.label, lang)) + '</small></span>').join('') + '</div>';
      const rows = data.docs.map(d => '<div class="pp-mx-row"><span class="pp-mx-doc"><b>' + esc(L(d.title, lang)) + '</b><small>' + esc(L(d.ai, lang)) + '</small></span>' +
        data.roles.map(r => {
          const flip = changed[0] === d.id && changed[1] === r.id;
          const on = (d.roles.indexOf(r.id) > -1) !== flip;
          return '<span class="pp-cell' + (on ? ' is-on' : '') + (flip ? ' is-changed' : '') + '">' + (flip ? '<small>' + esc(ui.upload.changed) + '</small>' : '') + '</span>';
        }).join('') + '</div>').join('');
      el.innerHTML = '<p class="mock-bar"><b>' + esc(ui.upload.table) + '</b><span class="pp-ai">' + icon.spark + esc(ui.upload.suggest) + '</span></p><div class="pp-mx">' + head + rows + '</div>';
    });

    root.querySelectorAll('[data-docroles]').forEach(el => {
      const lang = langOf(el);
      const ui = data.ui[lang];
      const q = data.questions.find(x => x.id === el.getAttribute('data-q'));
      const pair = [el.getAttribute('data-a'), el.getAttribute('data-b')].map(id => data.roles.find(r => r.id === id));
      if (!q || pair.some(r => !r)) return;
      const needed = Array.from(new Set([].concat.apply([], q.blocks.map(b => b.requires))));
      const panel = (r) => {
        const seen = seenBy(r);
        const blocks = q.blocks.filter(b => b.requires.every(id => seen.indexOf(id) > -1));
        const bar = '<p class="mock-bar"><b>' + avatar(r) + esc(L(r.label, lang)) + '</b><span>' + esc(sees(ui, seen.length)) + '</span></p>';
        if (!blocks.length) {
          const hidden = needed.filter(id => seen.indexOf(id) < 0).length;
          return '<div class="mock pp-role is-denied">' + bar + '<div class="pp-role-body"><p class="pp-deny">' + icon.lock + esc(ui.chat.denial) + '</p>' +
            (hidden ? '<span class="pp-pill pp-pill--clay pp-role-hidden">' + esc(ui.locked) + ': ' + hidden + '</span>' : '') +
            '<small class="pp-role-avail">' + esc(ui.chat.available) + '</small><div class="pp-role-chips">' +
            seen.map(id => '<span>' + esc(L(data.docs.find(d => d.id === id).title, lang)) + '</span>').join('') + '</div></div></div>';
        }
        let n = 0;
        return '<div class="mock pp-role">' + bar + '<div class="pp-role-body">' + blocks.map(b => '<div class="dq-blk"><h5>' + esc(L(b.title, lang)) + '</h5><p>' + esc(L(b.lines, lang)[0]) + '</p>' +
          b.cites.filter(c => seen.indexOf(c.doc) > -1).map(c => { n += 1; return '<span class="dq-cite"><b>' + n + '</b>' + esc(L(c.label, lang)) + '</span>'; }).join('') + '</div>').join('') + '</div></div>';
      };
      el.innerHTML = '<p class="pp-roles-q"><span class="dq-ask">' + esc(L(q.q, lang)) + '</span></p><div class="pp-roles-grid">' + pair.map(panel).join('') + '</div>';
    });

    root.querySelectorAll('[data-docfiles]').forEach(el => {
      const lang = langOf(el);
      const ui = data.ui[lang];
      const unit = el.getAttribute('data-unit') || '';
      const label = el.parentElement.querySelector('[data-docfolder]');
      if (label) label.textContent = ui.folder + ' · ' + ui.building;
      el.innerHTML = data.docs.map(d => '<li>' + icon.doc + '<span><b>' + esc(L(d.title, lang)) + '</b><small>' + d.total + ' ' + esc(unit) + '</small></span></li>').join('');
    });
  },
  // --- end product mockups (Fix B) ---

  _initDocQuote(root) {
    const data = window.UTXO_DOCDEMO;
    if (!data) return;
    const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    root.querySelectorAll('[data-docquote]').forEach(el => {
      const lang = el.getAttribute('data-lang') || 'de';
      const ui = data.ui[lang];
      const q = data.questions.find(x => x.id === el.getAttribute('data-q'));
      const role = data.roles.find(r => r.id === el.getAttribute('data-role'));
      if (!q || !role || !ui) return;
      const docs = data.docs.filter(d => d.roles.indexOf(role.id) > -1);
      const blocks = q.blocks.filter(b => b.requires.every(id => docs.some(d => d.id === id)));
      if (!blocks.length) return;
      let n = 0;
      const cites = [];
      const blockHtml = blocks.map(b => '<div class="dq-blk"><h5>' + esc(b.title[lang]) + '</h5>' + b.lines[lang].map(l => '<p>' + esc(l) + '</p>').join('') +
        b.cites.map(c => { n += 1; cites.push(c); return '<span class="dq-cite' + (n === 1 ? ' is-open' : '') + '"><b>' + n + '</b>' + esc(c.label[lang]) + '</span>'; }).join('') + '</div>').join('');
      const first = cites[0];
      const doc = data.docs.find(d => d.id === first.doc);
      const page = doc && doc.pages.find(pg => pg.p === first.page);
      const viewer = page ? '<div class="dq-viewer"><p class="dq-viewer-bar"><b>' + esc(doc.title[lang]) + '</b><span>' + esc(ui.viewer.page) + ' ' + page.p + ' ' + esc(ui.viewer.of) + ' ' + doc.total + '</span></p><div class="dq-page"><p class="dq-page-head"><span>' + esc(page.head) + '</span><span>' + page.p + '</span></p>' + page.html + '</div></div>' : '';
      el.innerHTML = '<p class="mock-bar"><b>Doc Indexer</b><span>' + esc(ui.building) + '</span></p><div class="dq"><div class="dq-chat"><p class="dq-ask">' + esc(q.q[lang]) + '</p><p class="dq-head">' + esc(q.header[lang]) + '</p>' + blockHtml + '</div>' + viewer + '</div>';
      const chip = el.parentElement.querySelector('[data-docquote-role]');
      if (chip) chip.innerHTML = '<i>' + esc(role.initials) + '</i><b>' + esc(role.label[lang]) + '</b><span>' + esc(ui.role.sees.replace('{n}', docs.length).replace('{t}', data.docs.length)) + '</span>';
    });
  },

  _initPlay(root, reduce) {
    root.querySelectorAll('svg[data-wave]').forEach(svg => {
      if (svg.childElementCount) return;
      const n = 44, w = 280 / n;
      let out = '';
      for (let i = 0; i < n; i++) {
        const env = 0.35 + 0.65 * Math.sin(Math.PI * (i + 0.5) / n);
        const h = Math.max(4, Math.round(36 * env * (0.45 + 0.55 * Math.abs(Math.sin(i * 1.7)))));
        out += '<rect x="' + (i * w + w * 0.2).toFixed(1) + '" y="' + ((36 - h) / 2) + '" width="' + (w * 0.6).toFixed(1) + '" height="' + h + '" rx="1.5" style="animation-delay:-' + ((i * 0.137) % 1.3).toFixed(2) + 's"></rect>';
      }
      svg.innerHTML = out;
    });
    if (!('IntersectionObserver' in window)) return;
    const waves = Array.prototype.slice.call(root.querySelectorAll('svg[data-wave]'));
    if (!reduce && waves.length) {
      const wio = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('is-live', e.isIntersecting)), { threshold: 0 });
      waves.forEach(w => wio.observe(w));
    }
    if (reduce) return;
    const items = Array.prototype.slice.call(root.querySelectorAll('[data-play]'));
    const vh = window.innerHeight || 800;
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.classList.remove('pv-wait');
      io.unobserve(e.target);
    }), { threshold: 0.35 });
    items.forEach(el => {
      if (el.getBoundingClientRect().top < vh * 0.9) return;
      el.classList.add('pv-wait');
      io.observe(el);
    });
  },

  _initConsent(root) {
    const id = (window.UTXO_CONFIG || {}).gaMeasurementId;
    if (!id) return;
    const KEY = 'utxo_consent';
    const MAX_AGE = 365 * 24 * 60 * 60 * 1000;
    const de = document.documentElement.lang === 'de';
    const text = de
      ? { msg: 'Wir möchten mit Google Analytics verstehen, wie unsere Website genutzt wird. Die Daten helfen uns, Inhalte zu verbessern. Sie können Ihre Wahl jederzeit im Footer ändern.', privacy: 'Datenschutz', href: '/de/datenschutz', deny: 'Ablehnen', accept: 'Akzeptieren' }
      : { msg: 'We would like to use Google Analytics to understand how our website is used. The data helps us improve our content. You can change your choice at any time in the footer.', privacy: 'Privacy Policy', href: '/en/privacy', deny: 'Decline', accept: 'Accept' };
    const read = () => {
      try {
        const v = JSON.parse(localStorage.getItem(KEY) || 'null');
        return v && Date.now() - v.t < MAX_AGE ? v.v : null;
      } catch (e) { return null; }
    };
    const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {} };
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      window.gtag('js', new Date());
      window.gtag('config', id);
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(tag);
    };
    let banner = null;
    const close = () => { if (banner) { banner.remove(); banner = null; } };
    const open = () => {
      if (banner) return;
      banner = document.createElement('div');
      banner.className = 'consent';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Cookies');
      const p = document.createElement('p');
      p.textContent = text.msg + ' ';
      const a = document.createElement('a');
      a.href = text.href;
      a.textContent = text.privacy;
      p.appendChild(a);
      const actions = document.createElement('div');
      actions.className = 'consent-actions';
      [['denied', text.deny], ['granted', text.accept]].forEach(([value, label]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn btn-ghost';
        b.textContent = label;
        b.addEventListener('click', () => {
          const revoked = read() === 'granted' && value === 'denied';
          save(value);
          close();
          if (value === 'granted') load();
          if (revoked) location.reload();
        });
        actions.appendChild(b);
      });
      banner.appendChild(p);
      banner.appendChild(actions);
      root.appendChild(banner);
    };
    root.querySelectorAll('[data-consent-open]').forEach(el => {
      el.hidden = false;
      el.addEventListener('click', open);
    });
    const choice = read();
    if (choice === 'granted') load();
    else if (choice !== 'denied') open();
  },

  _initHeroRotator(root, reduce) {
    const el = root.querySelector('[data-rotate]');
    if (!el) return;
    const words = (el.getAttribute('data-words') || '').split('|').map(w => w.trim()).filter(Boolean);
    if (reduce || words.length < 2) return;
    let i = 0;
    setInterval(() => {
      el.style.opacity = '0';
      setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.style.opacity = '1';
      }, 300);
    }, 2600);
  },

  _initPressLogos(root) {
    const logos = window.UTXO_PRESS_LOGOS;
    if (!Array.isArray(logos)) return;
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const img = (l, alt) => '<img src="' + l.src + '" alt="' + (alt ? esc(l.name) : '') + '"' + (l.stacked ? ' class="is-stacked"' : '') + ' decoding="async">';
    root.querySelectorAll('[data-press-logos]').forEach(el => {
      const limit = parseInt(el.getAttribute('data-limit'), 10) || logos.length;
      const list = logos.slice(0, limit);
      if (el.getAttribute('data-press-logos') === 'marquee') {
        const group = (copy) => '<ul class="press-marquee-group"' + (copy ? ' aria-hidden="true"' : '') + '>' + list.map(l => '<li>' + img(l, !copy) + '</li>').join('') + '</ul>';
        el.innerHTML = '<div class="press-marquee-track">' + group(false) + group(true) + '</div>';
        return;
      }
      el.innerHTML = list.map(l => img(l, true)).join('');
    });
  },

  _initPress(root) {
    const wrap = root.querySelector('[data-press]');
    const items = window.UTXO_PRESS;
    if (!wrap || !Array.isArray(items)) return;
    const lang = wrap.getAttribute('data-lang') || 'en';
    const untitled = wrap.getAttribute('data-label-untitled') || '';
    const dots = { 'Masumi': 'navy', 'Sokosumi': 'petrol', 'utxo AG': 'moss', 'Patrick Tobler': 'clay', 'NMKR': 'plum' };
    const fmtDate = (value) => {
      const [y, m] = value.split('-');
      if (!m) return y;
      return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString(lang === 'de' ? 'de-CH' : 'en-GB', { month: 'short', year: 'numeric' });
    };
    const row = (item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener';
      const add = (cls, text) => { const el = document.createElement('span'); el.className = cls; el.textContent = text; a.appendChild(el); return el; };
      add('press-outlet', item.outlet);
      add('press-date', fmtDate(item.date));
      const title = add('press-title', item.title || untitled + ' ↗');
      if (item.title) title.lang = item.lang === 'DE' ? 'de' : item.lang === 'FR' ? 'fr' : 'en';
      const entity = add('press-entity', item.entity);
      if (dots[item.entity]) entity.classList.add('dot-' + dots[item.entity]);
      li.appendChild(a);
      return li;
    };
    const list = wrap.querySelector('[data-press-list]');
    const more = wrap.querySelector('[data-press-more]');
    const toggle = wrap.querySelector('[data-press-toggle]');
    const limit = parseInt(wrap.getAttribute('data-limit'), 10);
    const featured = items.filter(i => i.tier === 'featured');
    const onlyLang = wrap.getAttribute('data-filter-lang');
    if (limit) { featured.filter(i => !onlyLang || i.lang === onlyLang).slice(0, limit).forEach(i => list.appendChild(row(i))); return; }
    const extra = items.filter(i => i.tier !== 'featured');
    featured.forEach(i => list.appendChild(row(i)));
    if (more) extra.forEach(i => more.appendChild(row(i)));
    if (!extra.length || !toggle || !more) return;
    const labelMore = (wrap.getAttribute('data-label-more') || '').replace('{n}', extra.length);
    const labelLess = wrap.getAttribute('data-label-less') || '';
    toggle.textContent = labelMore;
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const open = more.hidden;
      more.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? labelLess : labelMore;
    });
  },

  _initDocDemo(root) {
    const wrap = root.querySelector('[data-docdemo]');
    const data = window.UTXO_DOCDEMO;
    if (!wrap || !data) return;
    const reduce = this._reduce;
    const lang = wrap.getAttribute('data-lang') === 'de' ? 'de' : 'en';
    const t = data.ui[lang];
    const L = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v);
    const esc = (v) => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const docById = (id) => data.docs.find(d => d.id === id);
    const roleById = (id) => data.roles.find(r => r.id === id);
    const svg = (p, size) => '<svg width="' + (size || 16) + '" height="' + (size || 16) + '" viewBox="0 0 24 24" fill="none" aria-hidden="true">' + p + '</svg>';
    const icon = {
      doc: svg('<path d="M7 3h7l5 5v13H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 3v5h5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'),
      lock: svg('<rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6"/>', 14),
      building: svg('<path d="M4 21V5l8-2v18M12 8h8v13M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', 18),
      upload: svg('<path d="M12 16V4M7 9l5-5 5 5M4 20h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>', 22),
      spark: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>', 14),
      check: svg('<path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>', 14),
      send: svg('<path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>', 18),
      warn: svg('<path d="M12 4l9 16H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 10v4M12 17h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>', 14)
    };

    const CELLS = 40;
    const totalPages = data.docs.reduce((n, d) => n + d.total, 0);

    const fresh = () => ({ step: 0, reach: 0, indexing: false, read: {}, indexed: 0, perms: {}, role: null, thread: [], busy: false, draft: '', viewer: null, suggestOpen: false });
    let state = fresh();
    let shownStep = -1;
    let shownViewer = '';
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
    const visible = (roleId) => data.docs.filter(d => (state.perms[d.id] || []).includes(roleId)).map(d => d.id);
    const fill = (s, vars) => Object.keys(vars).reduce((out, k) => out.split('{' + k + '}').join(vars[k]), s);

    const answerFor = (q, roleId) => {
      const seen = visible(roleId);
      const blocks = q.blocks.filter(b => b.requires.every(id => seen.includes(id)));
      const needed = Array.from(new Set([].concat.apply([], q.blocks.map(b => b.requires))));
      const cites = [].concat.apply([], blocks.map(b => b.cites.filter(c => seen.includes(c.doc))));
      return { blocks, cites, hidden: needed.filter(id => !seen.includes(id)).length, seen };
    };

    const scanFor = (q, roleId) => {
      const a = answerFor(q, roleId);
      return data.docs.map(d => {
        if (!a.seen.includes(d.id)) return { d, state: 'skip', label: t.assemble.skip };
        const pages = Array.from(new Set(a.cites.filter(c => c.doc === d.id).map(c => c.page)));
        if (!pages.length) return { d, state: 'miss', label: t.assemble.miss };
        return { d, state: 'hit', label: t.assemble.hit + ' · ' + t.viewer.page + ' ' + pages.join(', ') };
      });
    };

    const avatar = (r) => '<span class="dd-avatar dot-' + r.dot + '">' + esc(r.initials) + '</span>';

    const indexMeta = (d) => {
      const p = state.read[d.id] || 0;
      if (p >= d.total) return '<span class="dd-ix-ok">' + icon.check + esc(t.index.done) + '</span> · ' + esc(L(d.ai));
      return p ? esc(fill(t.index.reading, { p, t: d.total })) : esc(t.upload.queued);
    };

    const indexView = () => {
      if (!state.indexing) {
        return '<div class="dd-panel dd-upload"><div class="dd-drop">' + icon.upload + '<h4>' + esc(t.upload.title) + '</h4><p>' + esc(t.upload.text) + '</p>' +
          '<button type="button" class="btn btn-primary" data-dd-upload="">' + esc(t.upload.button) + '</button></div></div>';
      }
      const rows = data.docs.map(d => '<li class="dd-ix-doc" data-dd-ix="' + d.id + '"><span class="dd-ix-ic">' + icon.doc + '</span><span class="dd-ix-txt"><b>' + esc(L(d.title)) + '</b><small data-dd-ix-meta>' + indexMeta(d) + '</small></span>' +
        '<span class="dd-ix-bar" aria-hidden="true"><i data-dd-ix-bar></i></span></li>').join('');
      const cells = Array.from({ length: CELLS }, () => '<i></i>').join('');
      return '<div class="dd-panel dd-index"><div class="dd-ix-grid"><ul class="dd-ix-list">' + rows + '</ul>' +
        '<div class="dd-ix-core"><p class="dd-ix-title">' + icon.spark + esc(t.index.title) + '</p><div class="dd-ix-cells" aria-hidden="true">' + cells + '</div>' +
        '<dl class="dd-ix-stats"><div><dt>' + esc(t.index.docs) + '</dt><dd data-dd-ix-docs></dd></div><div><dt>' + esc(t.index.pages) + '</dt><dd data-dd-ix-pages></dd></div></dl></div></div>' +
        '<div class="dd-perm-foot"><small>' + esc(t.building) + '</small><button type="button" class="btn btn-primary" data-dd-go="1" data-dd-ix-next>' + esc(t.index.next) + ' →</button></div></div>';
    };

    const paintIndex = () => {
      const panel = wrap.querySelector('.dd-index');
      if (!panel) return;
      let read = 0;
      data.docs.forEach(d => {
        const p = Math.min(d.total, state.read[d.id] || 0);
        read += p;
        const row = panel.querySelector('[data-dd-ix="' + d.id + '"]');
        if (!row) return;
        row.classList.toggle('is-busy', p > 0 && p < d.total);
        row.classList.toggle('is-done', p >= d.total);
        row.querySelector('[data-dd-ix-bar]').style.transform = 'scaleX(' + (p / d.total).toFixed(3) + ')';
        row.querySelector('[data-dd-ix-meta]').innerHTML = indexMeta(d);
      });
      const on = Math.round(CELLS * read / totalPages);
      panel.querySelectorAll('.dd-ix-cells i').forEach((c, i) => c.classList.toggle('is-on', i < on));
      panel.querySelector('[data-dd-ix-docs]').textContent = state.indexed + ' / ' + data.docs.length;
      panel.querySelector('[data-dd-ix-pages]').textContent = read + ' / ' + totalPages;
      panel.querySelector('[data-dd-ix-next]').disabled = state.indexed < data.docs.length;
      panel.classList.toggle('is-complete', state.indexed === data.docs.length);
    };

    const startIndex = () => {
      state.indexing = true;
      const finish = (d, i) => { state.read[d.id] = d.total; state.perms[d.id] = d.roles.slice(); state.indexed = i + 1; };
      if (reduce) {
        data.docs.forEach(finish);
        return render();
      }
      render();
      let at = 350;
      data.docs.forEach((d, i) => {
        const dur = Math.min(1100, 360 + d.total * 5);
        const ticks = Math.max(5, Math.round(dur / 55));
        for (let k = 1; k <= ticks; k++) {
          later(() => {
            if (k === ticks) finish(d, i); else state.read[d.id] = Math.round(d.total * k / ticks);
            paintIndex();
          }, at + Math.round(k * dur / ticks));
        }
        at += dur + 140;
      });
    };

    const permsView = () => {
      const head = '<div class="dd-perm-row dd-perm-head"><span>' + esc(t.upload.table) + '</span>' + data.roles.map(r => '<span class="dd-perm-role" title="' + esc(L(r.label)) + '">' + avatar(r) + '<small>' + esc(L(r.label)) + '</small></span>').join('') + '</div>';
      const rows = data.docs.map(d => {
        const perms = state.perms[d.id] || [];
        const changed = perms.length !== d.roles.length || perms.some(r => !d.roles.includes(r));
        const meta = '<small class="dd-ai">' + icon.spark + esc(L(d.ai)) + (changed ? ' · <b>' + esc(t.upload.changed) + '</b>' : '') + '</small>';
        const cells = data.roles.map(r => '<button type="button" class="dd-perm' + (perms.includes(r.id) ? ' is-on' : '') + '" data-dd-perm="' + d.id + ':' + r.id + '" aria-pressed="' + perms.includes(r.id) + '" aria-label="' + esc(L(d.title) + ': ' + L(r.label)) + '">' + icon.check + '<span class="dd-perm-label">' + esc(L(r.label)) + '</span></button>').join('');
        return '<div class="dd-perm-row is-ready"><span class="dd-perm-doc">' + icon.doc + '<span><b>' + esc(L(d.title)) + '</b>' + meta + '</span></span>' + cells + '</div>';
      }).join('');
      return '<div class="dd-panel dd-perms"><div class="dd-perm-table">' + head + rows + '</div>' +
        '<div class="dd-perm-foot"><small>' + icon.spark + esc(t.upload.suggest) + ' · ' + esc(t.upload.hint) + '</small><button type="button" class="btn btn-primary" data-dd-go="2">' + esc(t.upload.done) + ' →</button></div></div>';
    };

    const sidebar = () => {
      const r = state.role ? roleById(state.role) : null;
      const seen = r ? visible(r.id) : data.docs.map(d => d.id);
      return '<aside class="dd-files"><div class="dd-files-head">' + icon.building + '<span>' + esc(t.folder) + '<small>' + esc(t.building) + '</small></span></div><ul>' +
        data.docs.map(d => {
          const ok = seen.includes(d.id);
          return '<li class="dd-file' + (ok ? '' : ' is-locked') + '"><span class="dd-file-ic">' + (ok ? icon.doc : icon.lock) + '</span><span class="dd-file-txt"><b>' + esc(L(d.title)) + '</b><small>' + (ok ? esc(d.file) : esc(t.locked)) + '</small></span></li>';
        }).join('') + '</ul></aside>';
    };

    const roleView = () => '<div class="dd-panel"><h4 class="dd-title">' + esc(t.role.title) + '</h4><p class="dd-sub">' + esc(t.role.text) + '</p><div class="dd-roles">' +
      data.roles.map(r => {
        const seen = visible(r.id);
        const dots = data.docs.map(d => '<i class="' + (seen.includes(d.id) ? 'is-on' : '') + '" title="' + esc(L(d.title)) + '"></i>').join('');
        return '<button type="button" class="dd-role dot-' + r.dot + (state.role === r.id ? ' is-active' : '') + '" data-dd-role="' + r.id + '">' + avatar(r) +
          '<b>' + esc(L(r.label)) + '</b><small>' + esc(r.person + ' · ' + L(r.scope)) + '</small><em><span class="dd-role-docs" aria-hidden="true">' + dots + '</span>' + esc(fill(t.role.sees, { n: seen.length, t: data.docs.length })) + '</em></button>';
      }).join('') + '</div></div>';

    const chip = (c) => '<button type="button" class="dd-source" data-dd-open="' + c.doc + ':' + c.page + '">' + icon.doc + esc(L(c.label)) + '</button>';

    const scanView = (turn) => {
      const q = data.questions.find(x => x.id === turn.q);
      return '<div class="dd-answer dd-scan"><p class="dd-ans-head">' + esc(t.assemble.title) + '</p><ul>' +
        scanFor(q, turn.role).map(s => '<li class="is-' + s.state + '">' + (s.state === 'skip' ? icon.lock : icon.doc) + '<b>' + esc(L(s.d.title)) + '</b><small>' + esc(s.label) + '</small></li>').join('') + '</ul></div>';
    };

    const renderAnswer = (turn) => {
      const enter = turn.fresh ? ' is-fresh' : '';
      if (turn.free) return '<div class="dd-answer' + enter + '"><p>' + esc(t.chat.free) + '</p></div>';
      const q = data.questions.find(x => x.id === turn.q);
      const a = answerFor(q, turn.role);
      const hidden = a.hidden ? '<p class="dd-hidden">' + icon.lock + esc(a.hidden === 1 ? t.chat.hiddenOne : fill(t.chat.hidden, { n: a.hidden })) + '</p>' : '';
      if (!a.blocks.length) {
        const docs = a.seen.map(id => docById(id));
        return '<div class="dd-answer' + enter + '"><p>' + esc(t.chat.denial) + '</p>' + (docs.length ? '<small class="dd-avail">' + esc(t.chat.available) + '</small><div class="dd-chips">' +
          docs.map(d => chip({ doc: d.id, page: d.pages[0].p, label: d.title })).join('') + '</div>' : '') + '</div>';
      }
      const used = Array.from(new Set(a.cites.map(c => c.doc))).length;
      return '<div class="dd-answer' + enter + '"><p class="dd-ans-head">' + esc(L(q.header)) + '</p>' +
        a.blocks.map((b, i) => '<div class="dd-blk"><h5>' + (i + 1) + ' · ' + esc(L(b.title).replace(/^\d+\s·\s/, '')) + '</h5>' + L(b.lines).map(l => '<p>' + esc(l) + '</p>').join('') +
          '<div class="dd-chips">' + b.cites.filter(c => a.seen.includes(c.doc)).map(chip).join('') + '</div>' +
          (b.warn ? '<p class="dd-warn">' + icon.warn + esc(L(b.warn)) + '</p>' : '') + '</div>').join('') +
        (q.gap ? '<p class="dd-gap">' + esc(t.chat.gap) + ' <span>' + esc(L(q.gap)) + '</span></p>' : '') + hidden +
        '<p class="dd-built">' + icon.check + esc(used === 1 ? t.assemble.builtOne : fill(t.assemble.built, { n: used })) + '</p></div>';
    };

    const chatView = () => {
      const role = roleById(state.role);
      let thread = '';
      if (!state.thread.length) thread = '<div class="dd-hello">' + icon.building + '<h4>' + esc(t.chat.hello) + '</h4><p>' + esc(t.building) + '</p></div>';
      state.thread.forEach(turn => {
        const r = roleById(turn.role);
        const body = turn.pending ? (turn.free ? '<div class="dd-typing"><i></i><i></i><i></i></div>' : scanView(turn)) : renderAnswer(turn);
        thread += '<div class="dd-turn' + (turn.born ? ' is-new' : '') + '"><div class="dd-ask-bubble"><small class="dot-' + r.dot + '">' + esc(L(r.label)) + '</small><p>' + esc(turn.text) + '</p></div>' +
          '<div class="dd-reply"><span class="dd-bot">' + icon.building + '</span>' + body + '</div></div>';
      });
      const asked = state.thread.filter(x => x.role === state.role && x.q).map(x => x.q);
      const off = state.busy ? ' disabled' : '';
      const items = data.questions.filter(q => !asked.includes(q.id)).map(q => '<button type="button" class="dd-chip" data-dd-ask="' + q.id + '"' + off + '>' + esc(L(q.q)) + '</button>');
      const collapsed = state.thread.length > 0 && !state.suggestOpen;
      const sugg = collapsed
        ? '<button type="button" class="dd-sugg-toggle" data-dd-sugg="open"' + off + '>' + esc(t.chat.more) + ' <span>(' + items.length + ')</span> <i aria-hidden="true">▾</i></button>'
        : '<div class="dd-sugg-row"><small>' + esc(state.thread.length ? t.chat.more : t.chat.suggest) + '</small>' + (state.thread.length ? '<button type="button" class="dd-sugg-toggle is-inline" data-dd-sugg="close">' + esc(t.chat.hide) + ' <i aria-hidden="true">▴</i></button>' : '') + '</div><div class="dd-sugg">' + items.join('') + '</div>';
      return '<div class="dd-panel dd-chat' + (collapsed ? ' is-collapsed' : '') + '"><div class="dd-chat-head"><span class="dot-' + role.dot + '">' + esc(t.chat.as) + ' <b>' + esc(L(role.label)) + '</b></span><button type="button" data-dd-go="2">' + esc(t.chat.change) + '</button></div>' +
        '<div class="dd-thread" aria-live="polite">' + thread + '</div>' +
        '<div class="dd-composer">' + sugg +
        '<form class="dd-box" data-dd-form=""><textarea rows="1" data-dd-input="" aria-label="' + esc(t.chat.placeholder) + '" placeholder="' + esc(t.chat.placeholder) + '"' + off + '>' + esc(state.draft) + '</textarea><button type="submit" class="dd-send" aria-label="' + esc(t.chat.send) + '"' + off + '>' + icon.send + '</button></form></div></div>';
    };

    const viewerView = (enter) => {
      const d = docById(state.viewer.doc);
      const current = state.viewer.page;
      const rail = d.pages.map(p => '<button type="button" data-dd-page="' + p.p + '"' + (p.p === current ? ' aria-current="true"' : '') + '><span class="dd-mini"><i class="t"></i><i></i><i></i>' + (p.p === current ? '<i class="hl"></i><i class="hl"></i>' : '<i></i><i></i>') + '<i></i><i></i></span><small>' + p.p + '</small></button>').join('');
      const pages = d.pages.map(p => '<article class="dd-page' + (p.p === current ? ' is-cited' : '') + '" data-dd-pageno="' + p.p + '"><div class="dd-page-head"><span>' + esc(p.head) + '</span><span>' + esc(t.viewer.page) + ' ' + p.p + ' / ' + d.total + '</span></div>' +
        (p.status ? '<p class="dd-page-status' + (p.status.ok ? '' : ' is-void') + '">' + esc(p.status.text) + '</p>' : '') + p.html + '</article>').join('');
      return '<div class="dd-viewer' + (enter ? ' is-enter' : '') + '"><div class="dd-viewer-bar"><button type="button" data-dd-close="">← ' + esc(t.viewer.back) + '</button><span class="dd-viewer-file">' + icon.doc + '<b>' + esc(d.file) + '</b></span>' +
        '<span class="dd-viewer-cite">' + esc(t.viewer.cited) + ' · ' + esc(t.viewer.page) + ' ' + current + '</span>' +
        '<span class="dd-viewer-meta">' + esc(t.viewer.original) + ' · ' + esc(fill(t.viewer.stored, { n: d.pages.length, t: d.total })) + '</span></div>' +
        '<div class="dd-viewer-body"><nav class="dd-rail">' + rail + '</nav><div class="dd-pages">' + pages + '</div></div></div>';
    };

    const render = () => {
      state.reach = Math.max(state.reach, state.step);
      const enterStep = state.step !== shownStep;
      const viewerKey = state.viewer ? state.viewer.doc + ':' + state.viewer.page : '';
      const enterViewer = !!viewerKey && viewerKey !== shownViewer;
      const steps = t.steps.map((label, i) => {
        const cls = i === state.step ? 'is-active' : i <= state.reach ? 'is-done' : '';
        const inner = '<span class="dd-step-n">' + (cls === 'is-done' ? icon.check : i + 1) + '</span><span class="dd-step-label">' + esc(label) + '</span>';
        return '<li class="' + cls + '"' + (i === state.step ? ' aria-current="step"' : '') + '>' + (cls === 'is-done' ? '<button type="button" data-dd-go="' + i + '">' + inner + '</button>' : inner) + '</li>';
      }).join('');
      const help = '<p class="dd-help' + (enterStep ? ' is-enter' : '') + '"><span>' + esc(fill(t.stepOf, { n: state.step + 1, t: t.steps.length })) + '</span>' + esc(t.help[state.step]) + '</p>';
      let body;
      if (state.step < 2) body = '<div class="dd-body is-full' + (enterStep ? ' is-enter' : '') + '">' + (state.step === 0 ? indexView() : permsView()) + '</div>';
      else body = '<div class="dd-body' + (enterStep ? ' is-enter' : '') + '">' + sidebar() + '<div class="dd-main">' + (state.step === 2 ? roleView() : chatView()) + '</div>' + (state.viewer ? viewerView(enterViewer) : '') + '</div>';
      wrap.innerHTML = '<div class="stage-bar"><span>' + esc(t.bar) + '</span><button type="button" data-dd-restart="">' + esc(t.restart) + '</button></div><ol class="dd-steps">' + steps + '</ol>' + help + body;
      shownStep = state.step;
      shownViewer = viewerKey;
      state.thread.forEach(turn => { if (!turn.pending) turn.fresh = false; turn.born = false; });
      if (state.step === 0 && state.indexing) paintIndex();
      const thread = wrap.querySelector('.dd-thread');
      const turns = thread ? thread.querySelectorAll('.dd-turn') : [];
      if (turns.length) thread.scrollTop = turns[turns.length - 1].offsetTop - thread.offsetTop - 12;
      if (state.viewer) {
        const cited = wrap.querySelector('.dd-page.is-cited');
        const pagesEl = wrap.querySelector('.dd-pages');
        if (cited && pagesEl) {
          const mark = cited.querySelector('mark, tr.hl');
          if (mark) (mark.closest('p, tr') || mark).classList.add('dd-cited');
          const target = mark || cited;
          pagesEl.scrollTop = target.getBoundingClientRect().top - pagesEl.getBoundingClientRect().top + pagesEl.scrollTop - 120;
        }
      }
    };

    const reveal = (turn, ms) => later(() => { turn.pending = false; turn.fresh = true; state.busy = false; render(); }, reduce ? 300 : ms);

    const ask = (qid, roleId) => {
      const q = data.questions.find(x => x.id === qid);
      state.busy = true;
      state.draft = '';
      state.role = roleId;
      render();
      const text = L(q.q);
      const input = wrap.querySelector('[data-dd-input]');
      const post = () => {
        const turn = { q: qid, role: roleId, text, pending: true, born: true };
        state.thread.push(turn);
        render();
        reveal(turn, 1700);
      };
      if (reduce) return post();
      let i = 0;
      const step = Math.max(1, Math.ceil(text.length / 40));
      const type = () => {
        i = Math.min(text.length, i + step);
        if (input) input.value = text.slice(0, i);
        if (i < text.length) return later(type, 22);
        later(post, 250);
      };
      type();
    };

    wrap.addEventListener('submit', (e) => {
      if (!e.target.matches('[data-dd-form]')) return;
      e.preventDefault();
      const input = wrap.querySelector('[data-dd-input]');
      const text = input ? input.value.trim() : '';
      if (!text || state.busy) return;
      const hit = data.questions.find(q => L(q.q).toLowerCase() === text.toLowerCase());
      if (hit) return ask(hit.id, state.role);
      state.busy = true;
      state.draft = '';
      const turn = { free: true, role: state.role, text, pending: true, born: true };
      state.thread.push(turn);
      render();
      reveal(turn, 700);
    });

    wrap.addEventListener('keydown', (e) => {
      if (e.target.matches('[data-dd-input]') && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        e.target.form.requestSubmit();
      }
    });

    wrap.addEventListener('input', (e) => { if (e.target.matches('[data-dd-input]')) state.draft = e.target.value; });

    wrap.addEventListener('click', (e) => {
      const el = e.target.closest('button');
      if (!el || !wrap.contains(el) || el.disabled || el.type === 'submit') return;
      if (el.hasAttribute('data-dd-restart')) { clearTimers(); state = fresh(); shownStep = -1; return render(); }
      if (el.hasAttribute('data-dd-upload')) return startIndex();
      if (el.hasAttribute('data-dd-perm')) {
        const [doc, role] = el.getAttribute('data-dd-perm').split(':');
        const list = state.perms[doc];
        const idx = list.indexOf(role);
        if (idx < 0) list.push(role); else list.splice(idx, 1);
        return render();
      }
      if (el.hasAttribute('data-dd-go')) {
        const go = Number(el.getAttribute('data-dd-go'));
        if (go === 3 && !state.role) return;
        state.step = go;
        state.viewer = null;
        render();
        if (wrap.getBoundingClientRect().top < ((document.querySelector('.site-header') || {}).offsetHeight || 0)) wrap.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      if (el.hasAttribute('data-dd-role')) {
        state.role = el.getAttribute('data-dd-role');
        render();
        return later(() => { state.step = 3; render(); }, reduce ? 0 : 450);
      }
      if (el.hasAttribute('data-dd-sugg')) { state.suggestOpen = el.getAttribute('data-dd-sugg') === 'open'; return render(); }
      if (el.hasAttribute('data-dd-ask')) { state.suggestOpen = false; return ask(el.getAttribute('data-dd-ask'), state.role); }
      if (el.hasAttribute('data-dd-open')) {
        const [doc, page] = el.getAttribute('data-dd-open').split(':');
        state.viewer = { doc, page: Number(page) };
        render();
        if (wrap.getBoundingClientRect().top < ((document.querySelector('.site-header') || {}).offsetHeight || 0)) wrap.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      if (el.hasAttribute('data-dd-page')) {
        state.viewer.page = Number(el.getAttribute('data-dd-page'));
        return render();
      }
      if (el.hasAttribute('data-dd-close')) { state.viewer = null; return render(); }
    });
    render();
  },

  _initSwipe(root) {
    const KEY = 'utxo_swipe';
    const cover = () => { const el = document.createElement('div'); el.className = 'swipe-cover'; el.setAttribute('aria-hidden', 'true'); document.body.appendChild(el); return el; };
    let arrived = false;
    try { arrived = sessionStorage.getItem(KEY) === '1'; sessionStorage.removeItem(KEY); } catch (e) {}
    if (arrived && !this._reduce) {
      const el = cover();
      el.style.transition = 'none';
      el.classList.add('is-in');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.transition = '';
        el.classList.add('is-out');
        el.addEventListener('transitionend', () => el.remove(), { once: true });
      }));
    }
    window.addEventListener('pageshow', (e) => { if (e.persisted) document.querySelectorAll('.swipe-cover').forEach(el => el.remove()); });
    root.querySelectorAll('[data-swipe]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || this._reduce) return;
        e.preventDefault();
        try { sessionStorage.setItem(KEY, '1'); } catch (err) {}
        const el = cover();
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
        setTimeout(() => { location.href = link.href; }, 520);
      });
    });
  },

  _initDemos(root) {
    const config = window.UTXO_CONFIG || {};
    const urls = { call: config.callDemoUrl };
    Array.prototype.slice.call(root.querySelectorAll('[data-demo]')).forEach(stage => {
      const kind = stage.getAttribute('data-demo');
      const url = urls[kind];
      const body = stage.querySelector('.stage-body');
      const idle = stage.querySelector('[data-demo-idle]');
      const stop = stage.querySelector('[data-demo-stop]');
      const starts = Array.prototype.slice.call(root.querySelectorAll('[data-demo-start="' + kind + '"]'));
      if (!url) {
        starts.forEach(b => { b.hidden = true; });
        const note = stage.querySelector('[data-demo-unavailable]');
        if (note) note.hidden = false;
        return;
      }
      let frame = null;
      const start = (e) => {
        if (frame) return;
        frame = document.createElement('iframe');
        frame.src = url;
        frame.title = stage.getAttribute('data-demo-title') || '';
        frame.allow = 'microphone; autoplay';
        body.appendChild(frame);
        if (idle) idle.hidden = true;
        if (stop) stop.hidden = false;
        if (e && !stage.contains(e.currentTarget)) stage.scrollIntoView({ behavior: this._reduce ? 'auto' : 'smooth', block: 'center' });
      };
      const end = () => {
        if (!frame) return;
        frame.remove();
        frame = null;
        if (idle) idle.hidden = false;
        if (stop) stop.hidden = true;
      };
      starts.forEach(b => b.addEventListener('click', start));
      if (stop) stop.addEventListener('click', end);
    });
  },

  _initTeamScroll(root) {
    const track = root.querySelector('[data-team-grid]');
    if (!track) return;
    const prev = root.querySelector('[data-team-prev]');
    const next = root.querySelector('[data-team-next]');
    const step = (dir) => {
      const card = track.querySelector('figure');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
      const size = card.getBoundingClientRect().width + gap;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let target = track.scrollLeft + dir * size;
      if (target < 1) target = maxScroll;
      else if (target > maxScroll - 1) target = 0;
      track.scrollTo({ left: target, behavior: 'smooth' });
    };
    if (prev) prev.addEventListener('click', () => step(-1));
    if (next) next.addEventListener('click', () => step(1));
  },

  _initForms(root) {
    Array.prototype.slice.call(root.querySelectorAll('[data-form]')).forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const done = form.parentElement.querySelector('[data-form-done]');
        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(res => {
          if (!res.ok) throw new Error('submit failed');
          form.hidden = true;
          if (done) { done.hidden = false; done.style.removeProperty('display'); }
        }).catch(() => {});
      });
    });
  },

  _initBooking(root) {
    const containers = Array.prototype.slice.call(root.querySelectorAll('[data-cal-inline]'));
    const popups = Array.prototype.slice.call(root.querySelectorAll('[data-cal-popup]'));
    if (!containers.length && !popups.length) return;
    const first = containers[0] || popups[0];
    const theme = first.getAttribute('data-cal-theme') || 'light';
    const compact = first.hasAttribute('data-cal-compact');
    const small = window.matchMedia('(max-width: 919px)');
    const hasIO = 'IntersectionObserver' in window;
    let inlineDone = false;
    const startInline = () => {
      if (inlineDone || !containers.length || (popups.length && small.matches)) return;
      inlineDone = true;
      if (!hasIO) { this._loadCal(containers, theme, compact); return; }
      const io = new IntersectionObserver((entries) => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect();
        this._loadCal(containers, theme, compact);
      }, { rootMargin: '1600px 0px' });
      containers.forEach(el => io.observe(el));
    };
    startInline();
    if (small.addEventListener) small.addEventListener('change', startInline);
    popups.forEach(btn => {
      btn.addEventListener('click', () => {
        this._calApi(theme, compact);
        window.Cal('modal', { calLink: this._calLink, config: { layout: 'month_view', theme } });
      });
      if (hasIO) {
        const pio = new IntersectionObserver((entries) => {
          if (!entries.some(e => e.isIntersecting)) return;
          pio.disconnect();
          this._calApi(theme, compact);
        }, { rootMargin: '600px 0px' });
        pio.observe(btn);
      }
    });
  },

  _calLink: 'philip-isenmann-utxoag/30-min-meeting',

  _calApi(theme, compact) {
    if (this._calReady) return;
    this._calReady = true;
    (function (C, A, L) {
      const p = function (a, ar) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');
    window.Cal('init', { origin: 'https://cal.com' });
    const dark = { 'cal-brand': '#ffffff', 'cal-bg': '#13171d', 'cal-bg-muted': '#181d24', 'cal-border-subtle': 'rgba(255,255,255,.08)', 'cal-border-booker': 'transparent' };
    window.Cal('ui', { theme, cssVarsPerTheme: { light: { 'cal-brand': '#0b0e12' }, dark }, hideEventTypeDetails: !!compact });
  },

  _loadCal(containers, theme, compact) {
    this._calApi(theme, compact);
    containers.forEach((el, i) => {
      if (!el.id) el.id = 'cal-inline-' + i;
      window.Cal('inline', {
        elementOrSelector: '#' + el.id,
        calLink: this._calLink,
        config: { layout: 'month_view', theme }
      });
    });
  },

  _initPixelGrid(root, reduce) {
    const cv = root.querySelector('[data-pixelgrid]');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const SPOTLIGHT_ONLY = cv.hasAttribute('data-spotlight-only');
    const TILE_SCALE = parseFloat(cv.getAttribute('data-tile-scale')) || 1;
    const MAX_OPACITY = parseFloat(cv.getAttribute('data-max-opacity')) || 0.8;
    const GAP = parseFloat(cv.getAttribute('data-gap')) || 0.05;
    const IMAGE_SRCS = SPOTLIGHT_ONLY ? [] : ['/resources/agent_hero_anim/head_1_crop.webp'];
    const CYCLE_MS = 6000, FADE_MS = 700, IMG_FADE_IN_MS = 1800;
    const edgeSel = cv.getAttribute('data-align-edge');
    const edgeEl = edgeSel ? cv.parentElement.querySelector(edgeSel) : null;
    let W = 0, H = 0, cols = 0, rows = 0, cell = 0, gut = 0, rad = 0, sigma = 0, ox = 0, edgeCols = 0;
    let phase = [];
    const sampleCv = document.createElement('canvas');
    const sampleCtx = sampleCv.getContext('2d', { willReadFrequently: true });
    sampleCtx.imageSmoothingQuality = 'high';
    const images = IMAGE_SRCS.map(src => {
      const rec = { src, el: new Image(), ready: false, luma: null };
      rec.el.onload = () => { rec.ready = true; rec.readyAt = performance.now(); if (cols && rows) resampleImage(rec); };
      rec.el.src = src;
      return rec;
    });
    const rrect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };
    const resampleImage = (rec) => {
      if (!rec.ready || !cols || !rows) return;
      sampleCv.width = cols; sampleCv.height = rows;
      const iw = rec.el.naturalWidth, ih = rec.el.naturalHeight;
      const scale = Math.max(cols / iw, rows / ih);
      const dw = iw * scale, dh = ih * scale;
      const dx = (cols - dw) / 2, dy = (rows - dh) / 2;
      sampleCtx.clearRect(0, 0, cols, rows);
      sampleCtx.drawImage(rec.el, dx, dy, dw, dh);
      const data = sampleCtx.getImageData(0, 0, cols, rows).data;
      const luma = new Float32Array(cols * rows);
      for (let k = 0; k < luma.length; k++) {
        const p = k * 4;
        luma[k] = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
      }
      rec.luma = luma;
    };
    const lumaAt = (idx, k, t) => {
      const rec = images[idx];
      if (!rec || !rec.luma) return 0;
      const fadeIn = rec.readyAt ? Math.min(1, (t - rec.readyAt) / IMG_FADE_IN_MS) : 0;
      return rec.luma[k] * fadeIn;
    };
    const accentVars = ['--accent-navy-soft', '--accent-petrol-soft', '--accent-moss-soft', '--accent-clay-soft', '--accent-plum-soft'];
    const hexToRgb = (hex) => { const n = parseInt(hex.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
    const accents = accentVars.map(v => getComputedStyle(document.documentElement).getPropertyValue(v).trim()).filter(Boolean).map(hexToRgb);
    const TINT_SHARE = 0.09, TINT_FADE_MS = 900;
    let spots = [], tintColor = [], tintLevel = null;
    const spawn = (spot, t, n) => {
      let k;
      // Half of the accent tints land under the glass panel so its colour reads through the smoked tint.
      const underEdge = edgeCols && Math.random() < 0.5;
      do { k = underEdge ? Math.floor(Math.random() * rows) * cols + cols - 1 - Math.floor(Math.random() * edgeCols) : Math.floor(Math.random() * n); } while (tintColor[k] && spots.length > 1);
      spot.k = k;
      spot.c = accents[Math.floor(Math.random() * accents.length)];
      spot.born = t;
      spot.life = 3200 + Math.random() * 4200;
      tintColor[k] = spot.c;
    };
    const build = () => {
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      if (W < 2 || H < 2) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const edgeW = edgeEl ? parseFloat(getComputedStyle(edgeEl).getPropertyValue('--swipe-w')) : 0;
      if (edgeW > 0) {
        // Columns run from the right edge so a tile gap sits exactly on the panel edge, collapsed and open.
        cell = edgeW / Math.max(1, Math.round(edgeW / (11.5 * TILE_SCALE)));
        cols = Math.ceil(W / cell);
        ox = W - cols * cell;
        edgeCols = 1 + Math.max(1, Math.floor((Math.min(440, window.innerWidth * 0.4) - edgeW) / cell));
        edgeEl.style.setProperty('--swipe-open', Math.round(edgeW + (edgeCols - 1) * cell) + 'px');
      } else {
        cols = Math.max(9, Math.min(80, Math.round(W / (11.5 * TILE_SCALE))));
        cell = W / cols;
        ox = 0;
        edgeCols = 0;
      }
      rows = Math.ceil(H / cell);
      gut = Math.max(1.5, cell * GAP);
      rad = Math.max(1, (cell - gut) * 0.16);
      sigma = cell * cols * 0.13;
      const n = cols * rows;
      phase = new Array(n);
      for (let k = 0; k < n; k++) { phase[k] = Math.random() * Math.PI * 2; }
      tintColor = new Array(n);
      tintLevel = new Float32Array(n);
      spots = [];
      if (accents.length) {
        const now = performance.now();
        for (let s = 0; s < Math.round(n * TINT_SHARE); s++) {
          const spot = {};
          spots.push(spot);
          spawn(spot, now, n);
          spot.born = now - Math.random() * spot.life;
        }
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      images.forEach(resampleImage);
    };
    const draw = (t) => {
      if (W < 2) { build(); if (W < 2) return; }
      ctx.clearRect(0, 0, W, H);
      let cx, cy, s2;
      if (SPOTLIGHT_ONLY) {
        cx = W * (0.66 + 0.05 * Math.sin(t * 0.00016));
        cy = H * (0.40 + 0.06 * Math.cos(t * 0.00013));
        s2 = 2 * sigma * sigma;
      }
      const n = images.length;
      const cyclePos = n ? (t / CYCLE_MS) % n : 0;
      const curIdx = Math.floor(cyclePos);
      const prevIdx = n ? (curIdx - 1 + n) % n : 0;
      const fadeT = Math.min(1, (t % CYCLE_MS) / FADE_MS);
      const total = cols * rows;
      // Tiles behind the vertical glass panel get a floor, so the smoked glass shows a structured, coloured grid.
      let glassX = Infinity;
      if (edgeCols) {
        const er = edgeEl.getBoundingClientRect();
        if (er.height > er.width) glassX = er.left - cv.getBoundingClientRect().left;
      }
      spots.forEach(spot => {
        tintLevel[spot.k] = 0;
        if (!reduce && t - spot.born > spot.life) { tintColor[spot.k] = null; spawn(spot, t, total); }
        const age = t - spot.born;
        tintLevel[spot.k] = reduce ? 1 : Math.max(0, Math.min(1, age / TINT_FADE_MS, (spot.life - age) / TINT_FADE_MS));
      });
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const x = ox + i * cell, y = j * cell;
          const shim = 0.55 + 0.45 * Math.sin(t * 0.0012 + phase[k]);
          let v;
          if (SPOTLIGHT_ONLY) {
            const ex = x + cell / 2, ey = y + cell / 2;
            const dx = ex - cx, dy = ey - cy;
            const g = Math.exp(-(dx * dx + dy * dy) / s2);
            v = g * 0.34 + (0.1 + 0.4 * g) * shim;
          } else {
            const L = lumaAt(prevIdx, k, t) * (1 - fadeT) + lumaAt(curIdx, k, t) * fadeT;
            v = L * 0.34 + (0.1 + 0.4 * L) * shim;
          }
          const glass = x + cell / 2 > glassX;
          if (glass) v = Math.max(v, 0.32);
          if (v < 0.018) continue;
          if (v > 1) v = 1;
          const c = tintColor[k];
          const f = c ? tintLevel[k] : 0;
          const tint = glass ? Math.max(0.85, v * 2.4) : v * 2.4;
          const a = (v * MAX_OPACITY * (1 - f) + Math.min(1, tint) * f).toFixed(3);
          ctx.fillStyle = f ? 'rgba(' + Math.round(c[0] * f) + ',' + Math.round(c[1] * f) + ',' + Math.round(c[2] * f) + ',' + a + ')' : 'rgba(0,0,0,' + a + ')';
          rrect(x + gut / 2, y + gut / 2, cell - gut, cell - gut, rad);
          ctx.fill();
        }
      }
    };
    let visible = true;
    let resizeTimer = null;
    const running = () => !reduce && visible && document.visibilityState === 'visible';
    const loop = (t) => { draw(t); this._pgRAF = requestAnimationFrame(loop); };
    const stop = () => { if (this._pgRAF) { cancelAnimationFrame(this._pgRAF); this._pgRAF = null; } };
    const sync = () => {
      if (reduce) { draw(2600); return; }
      if (running() && !this._pgRAF) this._pgRAF = requestAnimationFrame(loop);
      else if (!running()) stop();
    };
    requestAnimationFrame(() => requestAnimationFrame(() => {
      build();
      sync();
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; sync(); }).observe(cv);
      }
      document.addEventListener('visibilitychange', sync);
      if (reduce && edgeEl) ['mouseenter', 'mouseleave', 'focus', 'blur'].forEach(ev => edgeEl.addEventListener(ev, () => requestAnimationFrame(() => draw(2600))));
      window.addEventListener('pageshow', (e) => { if (e.persisted) sync(); });
      if (window.ResizeObserver) {
        let first = true;
        new ResizeObserver(() => {
          if (first) { first = false; return; }
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => { build(); if (reduce) draw(2600); }, 150);
        }).observe(cv);
      }
    }));
  },

  _initToc(root) {
    const toc = root.querySelector('.gd-toc');
    if (!toc) return;
    const details = toc.querySelector('.gd-toc-d');
    if (details && window.matchMedia('(min-width: 961px)').matches) details.open = true;
    if (!('IntersectionObserver' in window)) return;
    const links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    const targets = links.map(a => document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))).filter(Boolean);
    if (!targets.length) return;
    const setActive = (id) => links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => seen.set(e.target.id, e.isIntersecting));
      const current = targets.find(t => seen.get(t.id));
      if (current) setActive(current.id);
    }, { rootMargin: '-20% 0px -65% 0px' });
    targets.forEach(t => io.observe(t));
  },

  _initTables(root) {
    // Header labels for the stacked mobile layout of legal tables.
    root.querySelectorAll('.legal-table table').forEach(table => {
      const heads = Array.prototype.slice.call(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
      if (!heads.length) return;
      table.querySelectorAll('tbody tr').forEach(tr => {
        Array.prototype.slice.call(tr.children).forEach((td, i) => { if (heads[i]) td.setAttribute('data-label', heads[i]); });
      });
    });
  },

  destroy() {
    if (this._pgRAF) cancelAnimationFrame(this._pgRAF);
    this._pgRAF = null;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.addEventListener('pagehide', () => App.destroy());
