/*
  Header panels (contact options, menu). Markup contract:
  [data-disclosure] > button[aria-controls="<panel id>"]; the panel ([hidden], optional [data-close] inside)
  may live anywhere in the page, e.g. inside the hero stage (components/Panels.astro).
  Only one panel is open at a time. It closes on Escape, on any click outside the header buttons
  (a click inside the panel included: links navigate, everything else just closes), when focus leaves
  the header actions and the panel, and when its stage ([data-stage]) scrolls more than half out of view.
  A panel that covers the screen (position: fixed) locks page scroll via .is-modal-open and takes the focus.
  Every change is announced with a "disclosure" event on document ({ panel, open }).
*/
export function disclosures() {
  const all = [...document.querySelectorAll('[data-disclosure]')].map((root) => {
    const button = root.querySelector('button[aria-controls]');
    return { root, button, panel: document.getElementById(button.getAttribute('aria-controls')) };
  });
  const set = (entry, open) => {
    if (entry.panel.hidden === !open) return;
    entry.panel.hidden = !open;
    entry.button.setAttribute('aria-expanded', String(open));
    const modal = open && getComputedStyle(entry.panel).position === 'fixed';
    document.documentElement.classList.toggle('is-modal-open', modal);
    if (modal) entry.panel.querySelector('[data-close]')?.focus();
    document.dispatchEvent(new CustomEvent('disclosure', { detail: { panel: entry.panel, open } }));
  };
  const closeAll = (except) => all.forEach((entry) => { if (entry !== except) set(entry, false); });

  all.forEach((entry) => {
    const zone = entry.root.parentElement;
    const leaves = (e) => { if (e.relatedTarget && !zone.contains(e.relatedTarget) && !entry.panel.contains(e.relatedTarget)) set(entry, false); };
    entry.button.addEventListener('click', () => { closeAll(entry); set(entry, entry.panel.hidden); });
    zone.addEventListener('focusout', leaves);
    entry.panel.addEventListener('focusout', leaves);
    const stage = entry.panel.closest('[data-stage]');
    if (stage) new IntersectionObserver(([e]) => { if (e.intersectionRatio < 0.5) set(entry, false); }, { threshold: 0.5 }).observe(stage);
  });
  document.addEventListener('click', (e) => { if (!all.some((entry) => entry.root.contains(e.target))) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = all.find((entry) => !entry.panel.hidden);
    if (open) { set(open, false); open.button.focus(); }
  });
}
