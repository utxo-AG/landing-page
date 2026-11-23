/*
  Header panels (contact menu, main menu). Markup contract:
  [data-disclosure] > button[aria-controls] + panel[hidden]; optional [data-close] inside the panel.
  Only one panel is open at a time; outside click, Escape, focus leaving, a link click or [data-close] closes it.
  data-disclosure="modal" marks a panel that covers the screen on phones (scroll lock via .is-modal-open).
*/
export function disclosures() {
  const all = [...document.querySelectorAll('[data-disclosure]')].map((root) => {
    const button = root.querySelector('button[aria-controls]');
    return { root, button, panel: document.getElementById(button.getAttribute('aria-controls')) };
  });
  const set = (entry, open) => {
    entry.panel.hidden = !open;
    entry.button.setAttribute('aria-expanded', String(open));
    if (entry.root.dataset.disclosure === 'modal') document.documentElement.classList.toggle('is-modal-open', open);
  };
  const closeAll = (except) => all.forEach((entry) => { if (entry !== except && !entry.panel.hidden) set(entry, false); });

  all.forEach((entry) => {
    entry.button.addEventListener('click', () => { closeAll(entry); set(entry, entry.panel.hidden); });
    entry.panel.addEventListener('click', (e) => { if (e.target.closest('a, [data-close]')) set(entry, false); });
    entry.root.addEventListener('focusout', (e) => { if (e.relatedTarget && !entry.root.contains(e.relatedTarget)) set(entry, false); });
  });
  document.addEventListener('click', (e) => { if (!all.some((entry) => entry.root.contains(e.target))) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = all.find((entry) => !entry.panel.hidden);
    if (open) { set(open, false); open.button.focus(); }
  });
}
