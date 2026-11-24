const KEY = 'utxo_consent';
const MAX_AGE = 365 * 24 * 60 * 60 * 1000;

function read() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || 'null');
    return stored && Date.now() - stored.t < MAX_AGE ? stored.v : null;
  } catch {
    return null;
  }
}

function save(value) {
  try { localStorage.setItem(KEY, JSON.stringify({ v: value, t: Date.now() })); } catch { /* storage blocked: ask again next visit */ }
}

function loadAnalytics(id) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', id);
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.append(tag);
}

export function consent(banner) {
  const id = banner.dataset.consent;
  const openers = document.querySelectorAll('[data-consent-open]');
  if (!id) {
    openers.forEach((el) => { el.hidden = true; });
    return;
  }
  let loaded = false;
  const grant = () => { if (!loaded) { loaded = true; loadAnalytics(id); } };
  banner.querySelectorAll('[data-consent-set]').forEach((button) => button.addEventListener('click', () => {
    const value = button.dataset.consentSet;
    const revoked = read() === 'granted' && value === 'denied';
    save(value);
    banner.hidden = true;
    if (value === 'granted') grant();
    if (revoked) location.reload();
  }));
  openers.forEach((el) => el.addEventListener('click', () => { banner.hidden = false; }));
  const choice = read();
  if (choice === 'granted') grant();
  else if (choice === null) banner.hidden = false;
}
