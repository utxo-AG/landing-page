export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function intro() {
  const overlay = document.querySelector('.intro');
  const mark = overlay.querySelector('img');
  const target = document.querySelector('.logo img');
  const done = () => { document.body.classList.add('is-ready'); overlay.remove(); };
  if (reduced) return done();
  const start = () => {
    const a = mark.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const move = mark.animate([
      { transform: 'none' },
      { transform: `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${b.width / a.width})` },
    ], { duration: 900, easing: 'cubic-bezier(.35,0,0,1)', fill: 'forwards' });
    overlay.animate([{ backgroundColor: 'var(--bg)' }, { backgroundColor: 'transparent' }], { duration: 700, delay: 200, fill: 'forwards' });
    document.body.classList.add('is-ready');
    move.finished.then(() => overlay.remove());
  };
  const ready = new Promise((resolve) => window.__sceneReady ? resolve() : document.addEventListener('scene-ready', resolve, { once: true }));
  Promise.all([ready, new Promise((r) => setTimeout(r, 700))]).then(start);
}

export function sequence() {
  const section = document.querySelector('[data-seq]');
  const status = section.querySelector('[data-flip]');
  const counters = section.querySelectorAll('[data-count]');
  let run = 0;
  let flip = 0;
  let playing = false;
  const play = () => {
    playing = true;
    section.classList.add('is-in');
    if (reduced) { section.classList.add('is-waiting'); return; }
    const current = ++run;
    status.textContent = 'läuft';
    status.classList.remove('st--wait');
    counters.forEach((el) => {
      const end = Number(el.dataset.count);
      const t0 = performance.now() + 900;
      const tick = (t) => {
        if (current !== run) return;
        const k = Math.min(1, Math.max(0, (t - t0) / 1400));
        el.firstChild.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      el.firstChild.textContent = '0';
      requestAnimationFrame(tick);
    });
    flip = setTimeout(() => { status.textContent = 'Ihre Freigabe'; status.classList.add('st--wait'); section.classList.add('is-waiting'); }, 3000);
  };
  const reset = () => {
    playing = false;
    run++;
    clearTimeout(flip);
    section.classList.remove('is-in', 'is-waiting');
  };
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !playing) play(); }, { threshold: 0.3 }).observe(section);
  if (!reduced) new IntersectionObserver(([e]) => { if (!e.isIntersecting && playing) reset(); }).observe(section);
}

export function reveal() {
  document.querySelectorAll('[data-reveal]').forEach((section) => {
    if (reduced) { section.classList.add('is-in'); return; }
    new IntersectionObserver(([e]) => { if (e.isIntersecting) section.classList.add('is-in'); }, { threshold: 0.25 }).observe(section);
    new IntersectionObserver(([e]) => { if (!e.isIntersecting) section.classList.remove('is-in'); }).observe(section);
  });
}

export function backdrop() {
  let queued = false;
  const update = () => {
    queued = false;
    const range = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--sp', range > 0 ? (scrollY / range).toFixed(4) : '0');
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

export function contactMenu() {
  const root = document.querySelector('[data-contact]');
  const button = root.querySelector('button');
  const menu = root.querySelector('.contact-menu');
  const set = (open) => { menu.hidden = !open; button.setAttribute('aria-expanded', String(open)); };
  button.addEventListener('click', () => set(menu.hidden));
  document.addEventListener('click', (e) => { if (!root.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); button.focus(); } });
}
