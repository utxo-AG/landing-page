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
    Array.prototype.slice.call(root.querySelectorAll('[data-cal-days]')).forEach(days => {
      if (days.children.length) return;
      const blanks = 1, total = 30, selected = 16;
      const unavailable = { 5:1, 6:1, 7:1, 12:1, 13:1, 14:1, 19:1, 20:1, 26:1, 27:1 };
      let html = '';
      for (let b = 0; b < blanks; b++) html += '<div></div>';
      for (let d = 1; d <= total; d++) {
        const sel = d === selected;
        const off = !!unavailable[d] && !sel;
        const base = 'aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:7px;cursor:' + (off ? 'default' : 'pointer') + ';transition:background .15s ease,color .15s ease;';
        const style = sel ? base + 'background:#000;color:#fff;' : off ? base + 'color:#cfcfcf;' : base + 'color:#1a1a1a;';
        html += '<div data-day="' + d + '"' + (off ? ' data-off' : '') + ' style="' + style + '">' + d + '</div>';
      }
      days.innerHTML = html;
      days.addEventListener('click', (e) => {
        const t = e.target.closest('[data-day]');
        if (!t || t.hasAttribute('data-off')) return;
        days.querySelectorAll('[data-day]').forEach(n => { if (n.hasAttribute('data-off')) return; n.style.background = 'transparent'; n.style.color = '#1a1a1a'; });
        t.style.background = '#000'; t.style.color = '#fff';
      });
    });
    Array.prototype.slice.call(root.querySelectorAll('[data-cal-slots]')).forEach(slots => {
      if (slots.children.length) return;
      const times = ['09:00', '11:30', '14:00', '16:30'];
      slots.innerHTML = times.map((tm, i) => {
        const sel = i === 2;
        const base = 'height:36px;display:flex;align-items:center;justify-content:center;border-radius:7px;cursor:pointer;transition:background .15s ease,color .15s ease,border-color .15s ease;border:1px solid ' + (sel ? '#000' : '#e3e3e3') + ';';
        return '<div data-slot style="' + base + (sel ? 'background:#000;color:#fff;' : 'color:#1a1a1a;') + '">' + tm + '</div>';
      }).join('');
      slots.addEventListener('click', (e) => {
        const t = e.target.closest('[data-slot]');
        if (!t) return;
        slots.querySelectorAll('[data-slot]').forEach(n => { n.style.background = 'transparent'; n.style.color = '#1a1a1a'; n.style.borderColor = '#e3e3e3'; });
        t.style.background = '#000'; t.style.color = '#fff'; t.style.borderColor = '#000';
      });
    });
  },

  _initSecurity(root) {
    const sec = root.querySelector('#security');
    if (!sec) return;
    Array.prototype.slice.call(sec.querySelectorAll('[data-reveal][data-delay]')).forEach(card => {
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
    let W = 0, H = 0, cols = 0, rows = 0, cell = 0, gut = 0, rad = 0, sigma = 0;
    let phase = [], noise = [];
    const rrect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };
    const build = () => {
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      if (W < 2 || H < 2) return;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cols = Math.max(9, Math.min(20, Math.round(W / 46)));
      cell = W / cols;
      rows = Math.ceil(H / cell);
      gut = Math.max(1.5, cell * 0.1);
      rad = Math.max(1, (cell - gut) * 0.16);
      sigma = cell * cols * 0.095;
      const n = cols * rows;
      phase = new Array(n); noise = new Array(n);
      for (let k = 0; k < n; k++) { phase[k] = Math.random() * Math.PI * 2; noise[k] = Math.random(); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t) => {
      if (W < 2) { build(); if (W < 2) return; }
      ctx.clearRect(0, 0, W, H);
      const cx = W * (0.66 + 0.05 * Math.sin(t * 0.00016));
      const cy = H * (0.40 + 0.06 * Math.cos(t * 0.00013));
      const s2 = 2 * sigma * sigma;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          const x = i * cell, y = j * cell;
          const ex = x + cell / 2, ey = y + cell / 2;
          const dx = ex - cx, dy = ey - cy;
          const g = Math.exp(-(dx * dx + dy * dy) / s2);
          const shim = 0.55 + 0.45 * Math.sin(t * 0.0012 + phase[k]);
          let v = g * (0.34 + 0.5 * shim) + noise[k] * 0.04 * g;
          if (v < 0.018) continue;
          if (v > 1) v = 1;
          const a = (v * 0.6).toFixed(3);
          const cr = Math.round(150 + 86 * v);
          const cg = Math.round(166 + 74 * v);
          const cb = Math.round(206 + 46 * v);
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
