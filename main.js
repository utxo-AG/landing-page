const App = {
  init() {
    const root = document.getElementById('utxo-root');
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._reduce = reduce;

    // ---- Hover styles (style-hover attribute) ----
    root.querySelectorAll('[style-hover]').forEach((el) => {
      const base = el.getAttribute('style') || '';
      const hover = el.getAttribute('style-hover');
      el.addEventListener('mouseenter', () => { el.style.cssText = base + ';' + hover; });
      el.addEventListener('mouseleave', () => { el.style.cssText = base; });
    });

    // ---- Coworker emblem hover motion ----
    if (!reduce) {
      root.querySelectorAll('[data-team-grid] figure').forEach((fig) => {
        const parts = fig.querySelectorAll('[data-hover-tf]');
        if (!parts.length) return;
        fig.addEventListener('mouseenter', () => parts.forEach(p => { p.style.transform = p.getAttribute('data-hover-tf'); }));
        fig.addEventListener('mouseleave', () => parts.forEach(p => { p.style.transform = ''; }));
      });
    }

    // ---- Language switch (persists manual choice, see head redirect script) ----
    root.querySelectorAll('[data-set-lang]').forEach((el) => {
      el.addEventListener('click', () => {
        try { localStorage.setItem('utxo_lang', el.getAttribute('data-set-lang')); } catch (e) {}
      });
    });

    // ---- Mobile menu ----
    const burger = root.querySelector('[data-hamburger]');
    const overlay = root.querySelector('[data-mobile-overlay]');
    if (burger && overlay) {
      const close = () => { overlay.style.display = 'none'; };
      burger.addEventListener('click', () => { overlay.style.display = 'flex'; });
      overlay.querySelectorAll('a, [data-overlay-close]').forEach(el => el.addEventListener('click', close));
    }

    // ---- Header scroll shadow ----
    const hdr = root.querySelector('#hdr');

    // ---- Reveal on scroll ----
    // Content is visible by default (never hidden via CSS/HTML) so it can never
    // get stuck blank in throttled/offscreen render contexts. We add a subtle
    // one-time rise by hiding ONLY elements currently below the fold, then
    // revealing them as they enter view. Anything already on screen stays shown.
    const reveals = Array.prototype.slice.call(root.querySelectorAll('[data-reveal]'));
    const show = (el) => { el.style.opacity = '1'; el.style.transform = 'none'; };
    if (!reduce && 'IntersectionObserver' in window) {
      const vh = window.innerHeight || 800;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            const d = el.getAttribute('data-delay');
            if (d) el.style.transitionDelay = d + 'ms';
            show(el);
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top > vh * 1.05) { el.style.opacity = '0'; el.style.transform = 'translateY(22px)'; io.observe(el); }
      });
      // hard safety net: reveal everything after a short delay no matter what
      setTimeout(() => reveals.forEach(show), 2500);
    }

    // ---- Roadmap scroll fill (on black band) ----
    const rm = root.querySelector('#roadmap');
    const roadmap = () => {
      if (!rm) return;
      const fill = rm.querySelector('[data-fill]');
      const track = rm.querySelector('[data-track]');
      const dots = Array.prototype.slice.call(rm.querySelectorAll('[data-dot]'));
      if (!fill || !track || dots.length < 2) return;
      const rr = rm.getBoundingClientRect();
      const first = dots[0].getBoundingClientRect();
      const last = dots[dots.length - 1].getBoundingClientRect();
      const topY = (first.top + first.height / 2) - rr.top;
      const botY = (last.top + last.height / 2) - rr.top;
      const h = Math.max(botY - topY, 0);
      track.style.top = topY + 'px';
      track.style.height = h + 'px';
      fill.style.top = topY + 'px';
      const vh = window.innerHeight;
      const ref = vh * 0.66;
      let p = (ref - rr.top) / Math.max(rr.height, 1);
      p = Math.max(0, Math.min(1, p));
      if (this._reduce) p = 1;
      fill.style.height = (p * h) + 'px';
      dots.forEach((dot, i) => {
        const thr = i / (dots.length - 1);
        if (p >= thr - 0.001) {
          dot.style.background = 'var(--fill-petrol)';
          dot.style.borderColor = 'var(--fill-petrol)';
          dot.style.transform = 'scale(1.1)';
        } else {
          dot.style.background = '#000';
          dot.style.borderColor = 'rgba(255,255,255,.28)';
          dot.style.transform = 'none';
        }
      });
    };
    this._roadmap = roadmap;

    const onScroll = () => {
      if (hdr) hdr.style.boxShadow = window.scrollY > 40 ? '0 6px 24px -12px rgba(0,0,0,.18)' : 'none';
      roadmap();
    };
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', () => { roadmap(); }, { passive: true });
    requestAnimationFrame(() => requestAnimationFrame(roadmap));
    setTimeout(roadmap, 400);

    this._initPixelGrid(root, reduce);
    this._initCase(root, reduce);
    this._initCards(root, reduce);
    this._initBeats(root, reduce);
    this._initOrch(root, reduce);
    this._initBooking(root);
    this._initSecurity(root);
    this._initForms(root);
    this._initCarousel(root);
    this._initTeamScroll(root);
    this._initDemos(root);
    this._initDuo(root);
    this._initDocDemo(root);
    this._initSwipe(root);
    this._initPress(root);
    this._initPressLogos(root);
    this._initHeroRotator(root, reduce);
    this._initConsent(root);
  },

  _initConsent(root) {
    const id = (window.UTXO_CONFIG || {}).gaMeasurementId;
    if (!id) return;
    const KEY = 'utxo_consent';
    const MAX_AGE = 365 * 24 * 60 * 60 * 1000;
    const de = document.documentElement.lang === 'de';
    const text = de
      ? { msg: 'Wir möchten mit Google Analytics verstehen, wie unsere Website genutzt wird. Die Daten helfen uns, Inhalte zu verbessern. Sie können Ihre Wahl jederzeit im Footer ändern.', privacy: 'Datenschutz', href: '/privacy.de', deny: 'Ablehnen', accept: 'Akzeptieren' }
      : { msg: 'We would like to use Google Analytics to understand how our website is used. The data helps us improve our content. You can change your choice at any time in the footer.', privacy: 'Privacy Policy', href: '/privacy', deny: 'Decline', accept: 'Accept' };
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
    const img = (l) => '<img src="' + l.src + '" alt="' + l.name.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"' + (l.stacked ? ' class="is-stacked"' : '') + ' decoding="async">';
    root.querySelectorAll('[data-press-logos]').forEach(el => {
      const set = logos.map(img).join('');
      if (el.getAttribute('data-press-logos') === 'marquee') {
        el.innerHTML = '<div class="press-logos-track">' + set + '<span aria-hidden="true" class="press-logos-dup">' + set + '</span></div>';
      } else {
        el.innerHTML = set;
      }
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
    const extra = items.filter(i => i.tier !== 'featured');
    items.filter(i => i.tier === 'featured').forEach(i => list.appendChild(row(i)));
    extra.forEach(i => more.appendChild(row(i)));
    if (!extra.length || !toggle) return;
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

    const fresh = () => ({ step: 0, analyzed: 0, uploading: false, perms: {}, role: null, thread: [], busy: false, draft: '', viewer: null, suggestOpen: false });
    let state = fresh();
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
    const visible = (roleId) => data.docs.filter(d => (state.perms[d.id] || []).includes(roleId)).map(d => d.id);
    const fill = (s, vars) => Object.keys(vars).reduce((out, k) => out.replace('{' + k + '}', vars[k]), s);

    const answerFor = (q, roleId) => {
      const seen = visible(roleId);
      const blocks = q.blocks.filter(b => b.requires.every(id => seen.includes(id)));
      const needed = Array.from(new Set([].concat.apply([], q.blocks.map(b => b.requires))));
      return { blocks, hidden: needed.filter(id => !seen.includes(id)).length, seen };
    };

    const avatar = (r) => '<span class="dd-avatar dot-' + r.dot + '">' + esc(r.initials) + '</span>';

    const uploadView = () => {
      if (!state.uploading && state.analyzed === 0) {
        return '<div class="dd-panel dd-upload"><div class="dd-drop">' + icon.upload + '<h4>' + esc(t.upload.title) + '</h4><p>' + esc(t.upload.text) + '</p>' +
          '<button type="button" class="btn btn-primary" data-dd-upload="">' + esc(t.upload.button) + '</button></div></div>';
      }
      const head = '<div class="dd-perm-row dd-perm-head"><span>' + esc(t.upload.table) + '</span>' + data.roles.map(r => '<span class="dd-perm-role" title="' + esc(L(r.label)) + '">' + avatar(r) + '<small>' + esc(L(r.label)) + '</small></span>').join('') + '</div>';
      const rows = data.docs.map((d, i) => {
        const ready = i < state.analyzed;
        const perms = state.perms[d.id] || [];
        const changed = ready && (perms.length !== d.roles.length || perms.some(r => !d.roles.includes(r)));
        const meta = ready
          ? '<small class="dd-ai">' + icon.spark + esc(L(d.ai)) + (changed ? ' · <b>' + esc(t.upload.changed) + '</b>' : '') + '</small>'
          : i === state.analyzed
            ? '<small class="dd-ai is-busy">' + esc(t.upload.analyzing) + '<i></i><i></i><i></i></small>'
            : '<small class="dd-ai is-queued">' + esc(t.upload.queued) + '</small>';
        const cells = data.roles.map(r => ready
          ? '<button type="button" class="dd-perm' + (perms.includes(r.id) ? ' is-on' : '') + '" data-dd-perm="' + d.id + ':' + r.id + '" aria-pressed="' + perms.includes(r.id) + '" aria-label="' + esc(L(d.title) + ': ' + L(r.label)) + '">' + icon.check + '<span class="dd-perm-label">' + esc(L(r.label)) + '</span></button>'
          : '<span class="dd-perm is-wait"><span class="dd-perm-label">' + esc(L(r.label)) + '</span></span>').join('');
        return '<div class="dd-perm-row' + (ready ? ' is-ready' : '') + '"><span class="dd-perm-doc">' + icon.doc + '<span><b>' + esc(L(d.title)) + '</b>' + meta + '</span></span>' + cells + '</div>';
      }).join('');
      const done = state.analyzed === data.docs.length;
      return '<div class="dd-panel dd-perms"><div class="dd-perm-table">' + head + rows + '</div>' +
        '<div class="dd-perm-foot"><small>' + icon.spark + esc(t.upload.suggest) + ' · ' + esc(t.upload.hint) + '</small><button type="button" class="btn btn-primary" data-dd-go="1"' + (done ? '' : ' disabled') + '>' + esc(t.upload.done) + ' →</button></div></div>';
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
      data.roles.map(r => '<button type="button" class="dd-role dot-' + r.dot + (state.role === r.id ? ' is-active' : '') + '" data-dd-role="' + r.id + '">' + avatar(r) +
        '<b>' + esc(L(r.label)) + '</b><small>' + esc(r.person + ' · ' + L(r.scope)) + '</small><em>' + esc(fill(t.role.sees, { n: visible(r.id).length, t: data.docs.length })) + '</em></button>').join('') + '</div></div>';

    const chip = (c) => '<button type="button" class="dd-source" data-dd-open="' + c.doc + ':' + c.page + '">' + icon.doc + esc(L(c.label)) + '</button>';

    const renderAnswer = (turn) => {
      if (turn.free) return '<div class="dd-answer"><p>' + esc(t.chat.free) + '</p></div>';
      const q = data.questions.find(x => x.id === turn.q);
      const a = answerFor(q, turn.role);
      const hidden = a.hidden ? '<p class="dd-hidden">' + icon.lock + esc(a.hidden === 1 ? t.chat.hiddenOne : fill(t.chat.hidden, { n: a.hidden })) + '</p>' : '';
      if (!a.blocks.length) {
        const docs = a.seen.map(id => docById(id));
        return '<div class="dd-answer"><p>' + esc(t.chat.denial) + '</p>' + (docs.length ? '<small class="dd-avail">' + esc(t.chat.available) + '</small><div class="dd-chips">' +
          docs.map(d => chip({ doc: d.id, page: d.pages[0].p, label: d.title })).join('') + '</div>' : '') + '</div>';
      }
      return '<div class="dd-answer"><p class="dd-ans-head">' + esc(L(q.header)) + '</p>' +
        a.blocks.map((b, i) => '<div class="dd-blk"><h5>' + (i + 1) + ' · ' + esc(L(b.title).replace(/^\d+\s·\s/, '')) + '</h5>' + L(b.lines).map(l => '<p>' + esc(l) + '</p>').join('') +
          '<div class="dd-chips">' + b.cites.filter(c => a.seen.includes(c.doc)).map(chip).join('') + '</div>' +
          (b.warn ? '<p class="dd-warn">' + icon.warn + esc(L(b.warn)) + '</p>' : '') + '</div>').join('') +
        (q.gap ? '<p class="dd-gap">' + esc(t.chat.gap) + ' <span>' + esc(L(q.gap)) + '</span></p>' : '') + hidden + '</div>';
    };

    const chatView = () => {
      const role = roleById(state.role);
      let thread = '';
      if (!state.thread.length) thread = '<div class="dd-hello">' + icon.building + '<h4>' + esc(t.chat.hello) + '</h4><p>' + esc(t.building) + '</p></div>';
      state.thread.forEach(turn => {
        const r = roleById(turn.role);
        thread += '<div class="dd-turn"><div class="dd-ask-bubble"><small class="dot-' + r.dot + '">' + esc(L(r.label)) + '</small><p>' + esc(turn.text) + '</p></div>' +
          '<div class="dd-reply"><span class="dd-bot">' + icon.building + '</span>' + (turn.pending ? '<div class="dd-typing"><i></i><i></i><i></i></div>' : renderAnswer(turn)) + '</div></div>';
      });
      const asked = state.thread.filter(x => x.role === state.role && x.q).map(x => x.q);
      const suggestions = data.questions.filter(q => !asked.includes(q.id)).map(q => '<button type="button" class="dd-chip" data-dd-ask="' + q.id + '">' + esc(L(q.q)) + '</button>');
      const off = state.busy ? ' disabled' : '';
      const items = suggestions;
      const collapsed = state.thread.length > 0 && !state.suggestOpen;
      const sugg = collapsed
        ? '<button type="button" class="dd-sugg-toggle" data-dd-sugg="open"' + off + '>' + esc(t.chat.more) + ' <span>(' + items.length + ')</span> <i aria-hidden="true">▾</i></button>'
        : '<div class="dd-sugg-row"><small>' + esc(state.thread.length ? t.chat.more : t.chat.suggest) + '</small>' + (state.thread.length ? '<button type="button" class="dd-sugg-toggle is-inline" data-dd-sugg="close">' + esc(t.chat.hide) + ' <i aria-hidden="true">▴</i></button>' : '') + '</div><div class="dd-sugg">' + items.join('').replace(/<button /g, '<button' + off + ' ') + '</div>';
      return '<div class="dd-panel dd-chat' + (collapsed ? ' is-collapsed' : '') + '"><div class="dd-chat-head"><span class="dot-' + role.dot + '">' + esc(t.chat.as) + ' <b>' + esc(L(role.label)) + '</b></span><button type="button" data-dd-go="1">' + esc(t.chat.change) + '</button></div>' +
        '<div class="dd-thread">' + thread + '</div>' +
        '<div class="dd-composer">' + sugg +
        '<form class="dd-box" data-dd-form=""><textarea rows="1" data-dd-input="" placeholder="' + esc(t.chat.placeholder) + '"' + off + '>' + esc(state.draft) + '</textarea><button type="submit" class="dd-send" aria-label="' + esc(t.chat.send) + '"' + off + '>' + icon.send + '</button></form></div></div>';
    };

    const viewerView = () => {
      const d = docById(state.viewer.doc);
      const current = state.viewer.page;
      const rail = d.pages.map(p => '<button type="button" data-dd-page="' + p.p + '"' + (p.p === current ? ' aria-current="true"' : '') + '><span class="dd-mini"><i class="t"></i><i></i><i></i>' + (p.p === current ? '<i class="hl"></i><i class="hl"></i>' : '<i></i><i></i>') + '<i></i><i></i></span><small>' + p.p + '</small></button>').join('');
      const pages = d.pages.map(p => '<article class="dd-page' + (p.p === current ? ' is-cited' : '') + '" data-dd-pageno="' + p.p + '"><div class="dd-page-head"><span>' + esc(p.head) + '</span><span>' + esc(t.viewer.page) + ' ' + p.p + ' / ' + d.total + '</span></div>' +
        (p.status ? '<p class="dd-page-status' + (p.status.ok ? '' : ' is-void') + '">' + esc(p.status.text) + '</p>' : '') + p.html + '</article>').join('');
      return '<div class="dd-viewer"><div class="dd-viewer-bar"><button type="button" data-dd-close="">← ' + esc(t.viewer.back) + '</button><span class="dd-viewer-file">' + icon.doc + '<b>' + esc(d.file) + '</b></span>' +
        '<span class="dd-viewer-meta">' + esc(t.viewer.original) + ' · ' + esc(fill(t.viewer.stored, { n: d.pages.length, t: d.total })) + '</span></div>' +
        '<div class="dd-viewer-body"><nav class="dd-rail">' + rail + '</nav><div class="dd-pages">' + pages + '</div></div></div>';
    };

    const render = () => {
      const steps = t.steps.map((label, i) => '<li class="' + (i === state.step ? 'is-active' : i < state.step ? 'is-done' : '') + '"><span>' + (i + 1) + '</span>' + esc(label) + '</li>').join('');
      let body;
      if (state.step === 0) body = '<div class="dd-body is-full">' + uploadView() + '</div>';
      else body = '<div class="dd-body">' + sidebar() + '<div class="dd-main">' + (state.step === 1 ? roleView() : chatView()) + '</div>' + (state.viewer ? viewerView() : '') + '</div>';
      wrap.innerHTML = '<div class="stage-bar"><span>' + esc(t.bar) + '</span><button type="button" data-dd-restart="">' + esc(t.restart) + '</button></div><ol class="dd-steps">' + steps + '</ol>' + body;
      const thread = wrap.querySelector('.dd-thread');
      const turns = thread ? thread.querySelectorAll('.dd-turn') : [];
      if (turns.length) thread.scrollTop = turns[turns.length - 1].offsetTop - thread.offsetTop - 12;
      if (state.viewer) {
        const cited = wrap.querySelector('.dd-page.is-cited');
        const pagesEl = wrap.querySelector('.dd-pages');
        if (cited && pagesEl) {
          const mark = cited.querySelector('mark, tr.hl') || cited;
          pagesEl.scrollTop = mark.getBoundingClientRect().top - pagesEl.getBoundingClientRect().top + pagesEl.scrollTop - 120;
        }
      }
    };

    const ask = (qid, roleId) => {
      const q = data.questions.find(x => x.id === qid);
      state.busy = true;
      state.draft = '';
      state.role = roleId;
      render();
      const text = L(q.q);
      const input = wrap.querySelector('[data-dd-input]');
      let i = 0;
      const step = Math.max(1, Math.ceil(text.length / 40));
      const type = () => {
        i = Math.min(text.length, i + step);
        if (input) input.value = text.slice(0, i);
        if (i < text.length) return later(type, 22);
        later(() => {
          state.thread.push({ q: qid, role: roleId, text, pending: true });
          render();
          later(() => { state.thread[state.thread.length - 1].pending = false; state.busy = false; render(); }, 1000);
        }, 250);
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
      state.thread.push({ free: true, role: state.role, text, pending: true });
      render();
      later(() => { state.thread[state.thread.length - 1].pending = false; state.busy = false; render(); }, 700);
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
      if (el.hasAttribute('data-dd-restart')) { clearTimers(); state = fresh(); return render(); }
      if (el.hasAttribute('data-dd-upload')) {
        state.uploading = true;
        render();
        data.docs.forEach((d, i) => later(() => { state.perms[d.id] = d.roles.slice(); state.analyzed = i + 1; render(); }, 500 + i * 420));
        return;
      }
      if (el.hasAttribute('data-dd-perm')) {
        const [doc, role] = el.getAttribute('data-dd-perm').split(':');
        const list = state.perms[doc];
        const idx = list.indexOf(role);
        if (idx < 0) list.push(role); else list.splice(idx, 1);
        return render();
      }
      if (el.hasAttribute('data-dd-go')) { state.step = Number(el.getAttribute('data-dd-go')); state.viewer = null; return render(); }
      if (el.hasAttribute('data-dd-role')) {
        state.role = el.getAttribute('data-dd-role');
        render();
        return later(() => { state.step = 2; render(); }, 450);
      }
      if (el.hasAttribute('data-dd-sugg')) { state.suggestOpen = el.getAttribute('data-dd-sugg') === 'open'; return render(); }
      if (el.hasAttribute('data-dd-ask')) { state.suggestOpen = false; return ask(el.getAttribute('data-dd-ask'), state.role); }
      if (el.hasAttribute('data-dd-open')) {
        const [doc, page] = el.getAttribute('data-dd-open').split(':');
        state.viewer = { doc, page: Number(page) };
        render();
        if (wrap.getBoundingClientRect().top < 0) wrap.scrollIntoView({ behavior: this._reduce ? 'auto' : 'smooth', block: 'start' });
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

  _initDuo(root) {
    root.querySelectorAll('[data-duo]').forEach(duo => {
      const open = (key) => {
        if (duo.getAttribute('data-open') === key) return;
        duo.querySelectorAll('[data-duo-card]').forEach(card => {
          if (card.getAttribute('data-duo-card') !== key) card.querySelectorAll('[data-demo-stop]:not([hidden])').forEach(b => b.click());
        });
        duo.setAttribute('data-open', key);
        if (duo.getBoundingClientRect().top < 0) duo.scrollIntoView({ behavior: this._reduce ? 'auto' : 'smooth', block: 'start' });
      };
      duo.querySelectorAll('[data-duo-open]').forEach(el => {
        el.addEventListener('click', () => open(el.getAttribute('data-duo-open')));
        if (el.getAttribute('role') === 'button') el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.getAttribute('data-duo-open')); }
        });
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

  _initCarousel(root) {
    Array.prototype.slice.call(root.querySelectorAll('[data-carousel]')).forEach(carousel => {
      const track = carousel.querySelector('[data-carousel-track]');
      const slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-slide]'));
      const prev = carousel.querySelector('[data-carousel-prev]');
      const next = carousel.querySelector('[data-carousel-next]');
      const dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-dot]'));
      if (!track || !slides.length) return;
      track.style.overflowY = 'hidden';
      let index = 0;
      const setActive = (i) => {
        index = Math.max(0, Math.min(i, slides.length - 1));
        dots.forEach((d, di) => { d.style.backgroundColor = di === index ? 'var(--text-primary)' : 'var(--border-strong)'; });
        slides.forEach((s, si) => { s.style.opacity = si === index ? '1' : '.5'; });
      };
      const centerLeft = (slide) => slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2;
      const goTo = (i) => {
        const target = Math.max(0, Math.min(i, slides.length - 1));
        track.scrollTo({ left: centerLeft(slides[target]), behavior: 'smooth' });
        setActive(target);
      };
      if (prev) prev.addEventListener('click', () => goTo(index - 1));
      if (next) next.addEventListener('click', () => goTo(index + 1));
      dots.forEach((d, di) => d.addEventListener('click', () => goTo(di)));
      let scrollTimer = null;
      track.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          const trackCenter = track.scrollLeft + track.clientWidth / 2;
          let closest = 0, closestDist = Infinity;
          slides.forEach((s, si) => {
            const dist = Math.abs((s.offsetLeft + s.offsetWidth / 2) - trackCenter);
            if (dist < closestDist) { closestDist = dist; closest = si; }
          });
          setActive(closest);
        }, 80);
      }, { passive: true });
      track.scrollLeft = centerLeft(slides[0]);
      setActive(0);
      setActive(0);
    });
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
          form.style.display = 'none';
          if (done) done.style.display = 'flex';
        }).catch(() => {});
      });
    });
  },

  _initBeats(root, reduce) {
    if (reduce) return;
    Array.prototype.slice.call(root.querySelectorAll('[data-beats]')).forEach(group => {
      const beats = Array.prototype.slice.call(group.querySelectorAll('[data-beat] > div:first-child'));
      const arrows = Array.prototype.slice.call(group.querySelectorAll('[data-beat-arrow]'));
      if (beats.length < 3) return;
      let i = 0, timer = null;
      const paint = (active) => {
        beats.forEach((b, k) => {
          if (k === active) { b.style.borderColor = 'var(--text-primary)'; b.style.boxShadow = '0 0 0 1px var(--text-primary)'; }
          else { b.style.boxShadow = 'none'; if (b.style.borderWidth !== '1.5px') b.style.borderColor = 'var(--border-subtle)'; }
        });
        arrows.forEach((a, k) => { a.style.color = (k < active) ? 'var(--text-primary)' : 'var(--border-strong)'; });
      };
      const start = () => { if (timer) return; timer = setInterval(() => { i = (i + 1) % beats.length; paint(i); }, 1400); };
      const stop = () => { if (timer) { clearInterval(timer); timer = null; } beats.forEach(b => { b.style.boxShadow = 'none'; }); arrows.forEach(a => { a.style.color = 'var(--border-strong)'; }); };
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { paint(0); start(); } else { stop(); } });
      }, { threshold: 0.4 });
      io.observe(group);
    });
  },

  _initCase(root, reduce) {
    const wrap = root.querySelector('[data-case]');
    if (!wrap || reduce) return; // reduced motion: everything stays visible
    const steps = Array.prototype.slice.call(wrap.querySelectorAll('[data-case-step]'));
    if (steps.length < 2) return;
    const rowsOf = (s) => Array.prototype.slice.call(s.querySelectorAll('[data-case-row]'));
    const dotOf = (s) => s.querySelector('[data-case-dot]');
    let timers = [], running = false;
    const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
    const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
    const resetVisual = () => {
      steps.forEach(s => {
        s.style.opacity = '.35'; s.style.borderColor = 'var(--border-subtle)';
        const d = dotOf(s); if (d) d.style.background = 'var(--border-strong)';
        rowsOf(s).forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(8px)'; });
      });
    };
    const showAllFinal = () => {
      steps.forEach(s => {
        s.style.opacity = '1'; s.style.borderColor = 'var(--border-subtle)';
        rowsOf(s).forEach(r => { r.style.opacity = '1'; r.style.transform = 'none'; });
      });
    };
    const runSeq = () => {
      clearTimers();
      resetVisual();
      let t = 350;
      steps.forEach((s, i) => {
        later(() => {
          s.style.opacity = '1'; s.style.borderColor = 'var(--text-primary)';
          const d = dotOf(s); if (d) d.style.background = 'var(--text-primary)';
          if (i > 0) { const prev = steps[i-1]; prev.style.borderColor = 'var(--border-subtle)'; }
        }, t);
        const rows = rowsOf(s);
        rows.forEach((r, j) => {
          later(() => { r.style.opacity = '1'; r.style.transform = 'none'; }, t + 180 + j * 320);
        });
        t += 500 + rows.length * 320 + 500;
      });
      // hold final state, then loop
      later(() => {
        const last = steps[steps.length-1];
        last.style.borderColor = 'var(--border-subtle)';
        steps.forEach(s => { const d = dotOf(s); if (d) d.style.background = 'var(--text-primary)'; });
      }, t);
      later(() => { if (running) runSeq(); }, t + 4200);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !running) { running = true; runSeq(); }
        else if (!e.isIntersecting && running) { running = false; clearTimers(); showAllFinal(); }
      });
    }, { threshold: 0.25 });
    io.observe(wrap);
    // safety: if the observer never fires (throttled contexts), leave content visible
    setTimeout(() => { if (!running) showAllFinal(); }, 3000);
  },

  _initOrch(root, reduce) {
    const wrap = root.querySelector('[data-orch]');
    if (!wrap || reduce) return;
    const nodes = {
      in: wrap.querySelector('[data-orch-node="in"]'),
      hub: wrap.querySelector('[data-orch-node="hub"]'),
      subs: Array.prototype.slice.call(wrap.querySelectorAll('[data-orch-node="sub"]')),
      out: wrap.querySelector('[data-orch-node="out"]')
    };
    const arrows = Array.prototype.slice.call(wrap.querySelectorAll('[data-orch-arrow]'));
    if (!nodes.in || !nodes.hub || nodes.subs.length < 3 || !nodes.out) return;
    let timers = [], running = false;
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const clearAll = () => { timers.forEach(clearTimeout); timers = []; };
    const pillOn = (el) => { el.style.borderColor = 'var(--text-primary)'; el.style.boxShadow = '0 0 0 1px var(--text-primary)'; };
    const pillOff = (el) => { el.style.borderColor = 'var(--border-strong)'; el.style.boxShadow = 'none'; };
    const reset = () => {
      pillOff(nodes.in); pillOff(nodes.out);
      nodes.hub.style.boxShadow = 'none'; nodes.hub.style.transform = 'none';
      nodes.subs.forEach(s => { s.style.borderColor = 'var(--border-strong)'; });
      arrows.forEach(a => { a.style.color = 'var(--text-muted)'; });
    };
    const seq = () => {
      clearAll(); reset();
      later(() => pillOn(nodes.in), 300);
      later(() => { arrows[0].style.color = 'var(--text-primary)'; }, 900);
      later(() => { pillOff(nodes.in); nodes.hub.style.boxShadow = '0 14px 34px -14px rgba(0,0,0,.45)'; nodes.hub.style.transform = 'scale(1.02)'; }, 1300);
      later(() => { arrows[1].style.color = 'var(--text-primary)'; }, 1900);
      nodes.subs.forEach((s, i) => later(() => { s.style.borderColor = 'var(--text-primary)'; }, 2300 + i * 220));
      later(() => { nodes.hub.style.boxShadow = 'none'; nodes.hub.style.transform = 'none'; }, 2400);
      later(() => { arrows[2].style.color = 'var(--text-primary)'; nodes.subs.forEach(s => { s.style.borderColor = 'var(--border-strong)'; }); }, 3500);
      later(() => pillOn(nodes.out), 3900);
      later(() => { if (running) seq(); }, 6200);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !running) { running = true; seq(); }
        else if (!e.isIntersecting && running) { running = false; clearAll(); reset(); }
      });
    }, { threshold: 0.3 });
    io.observe(wrap);
  },

  _initBooking(root) {
    const containers = Array.prototype.slice.call(root.querySelectorAll('[data-cal-inline]'));
    if (!containers.length) return;
    if (!('IntersectionObserver' in window)) { this._loadCal(containers); return; }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      this._loadCal(containers);
    }, { rootMargin: '800px 0px' });
    containers.forEach(el => io.observe(el));
  },

  _loadCal(containers) {
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
    containers.forEach((el, i) => {
      if (!el.id) el.id = 'cal-inline-' + i;
      window.Cal('inline', {
        elementOrSelector: '#' + el.id,
        calLink: 'philip-isenmann-utxoag/30-min-meeting',
        config: { layout: 'month_view' }
      });
    });
  },

  _initSecurity(root) {
    const sec = root.querySelector('#security');
    if (!sec) return;
    const grid = sec.querySelector('[data-sec-grid]');
    if (!grid) return;
    Array.prototype.slice.call(grid.querySelectorAll('[data-reveal][data-delay]')).forEach(card => {
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      const line = document.createElement('div');
      line.style.cssText = 'position:absolute;left:0;bottom:0;height:2px;width:0;background:var(--text-primary);transition:width .45s var(--ease);';
      card.appendChild(line);
      card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-3px)'; card.style.borderColor = 'var(--text-primary)'; line.style.width = '100%'; });
      card.addEventListener('mouseleave', () => { card.style.transform = 'none'; card.style.borderColor = ''; line.style.width = '0'; });
    });
  },

  _initCards(root, reduce) {
    const fmt = (n) => n.toLocaleString('en-US');
    Array.prototype.slice.call(root.querySelectorAll('[data-uc-card]')).forEach(card => {
      const bp = card.querySelector('[data-uc-bp]');
      const countEl = card.querySelector('[data-uc-count]');
      const target = countEl ? parseInt(countEl.getAttribute('data-target'), 10) : 0;
      let counted = false, raf = null;
      const runCount = () => {
        if (!countEl) return;
        if (reduce) { countEl.textContent = fmt(target); return; }
        const dur = 900, t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          countEl.textContent = fmt(Math.round(target * e));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
      };
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.borderColor = 'var(--text-primary)';
        card.style.boxShadow = '0 16px 38px -18px rgba(0,0,0,.22)';
        if (bp) bp.style.opacity = '.5';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.borderColor = '';
        card.style.boxShadow = 'none';
        if (bp) bp.style.opacity = '0';
      });
      const reveal = () => { if (counted) return; counted = true; runCount(); };
      if (reduce) { reveal(); }
      else {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } });
        }, { threshold: 0.4 });
        io.observe(card);
      }
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
    const IMAGE_SRCS = SPOTLIGHT_ONLY ? [] : ['resources/agent_hero_anim/head_1_crop.webp'];
    const CYCLE_MS = 6000, FADE_MS = 700, IMG_FADE_IN_MS = 1800;
    let W = 0, H = 0, cols = 0, rows = 0, cell = 0, gut = 0, rad = 0, sigma = 0;
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
      do { k = Math.floor(Math.random() * n); } while (tintColor[k] && spots.length > 1);
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
      cols = Math.max(9, Math.min(80, Math.round(W / (11.5 * TILE_SCALE))));
      cell = W / cols;
      rows = Math.ceil(H / cell);
      gut = Math.max(1.5, cell * 0.05);
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
      spots.forEach(spot => {
        tintLevel[spot.k] = 0;
        if (!reduce && t - spot.born > spot.life) { tintColor[spot.k] = null; spawn(spot, t, total); }
        const age = t - spot.born;
        tintLevel[spot.k] = reduce ? 1 : Math.max(0, Math.min(1, age / TINT_FADE_MS, (spot.life - age) / TINT_FADE_MS));
      });
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const x = i * cell, y = j * cell;
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
          if (v < 0.018) continue;
          if (v > 1) v = 1;
          const c = tintColor[k];
          const f = c ? tintLevel[k] : 0;
          const a = (v * MAX_OPACITY * (1 - f) + Math.min(1, v * 2.4) * f).toFixed(3);
          ctx.fillStyle = f ? 'rgba(' + Math.round(c[0] * f) + ',' + Math.round(c[1] * f) + ',' + Math.round(c[2] * f) + ',' + a + ')' : 'rgba(0,0,0,' + a + ')';
          rrect(x + gut / 2, y + gut / 2, cell - gut, cell - gut, rad);
          ctx.fill();
        }
      }
    };
    build();
    if (reduce) { draw(2600); }
    else {
      const loop = (t) => { draw(t); this._pgRAF = requestAnimationFrame(loop); };
      this._pgRAF = requestAnimationFrame(loop);
    }
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => build()); ro.observe(cv); }
  },

  destroy() {
    if (this._pgRAF) cancelAnimationFrame(this._pgRAF);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.addEventListener('pagehide', () => App.destroy());
