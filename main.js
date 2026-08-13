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
          dot.style.background = '#fff';
          dot.style.borderColor = '#fff';
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
        dots.forEach((d, di) => { d.style.background = di === index ? 'var(--text-primary)' : 'var(--border-strong)'; });
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
        form.style.display = 'none';
        if (done) done.style.display = 'flex';
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
          const a = (v * MAX_OPACITY).toFixed(3);
          const cr = 0;
          const cg = cr;
          const cb = cr;
          ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + a + ')';
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
