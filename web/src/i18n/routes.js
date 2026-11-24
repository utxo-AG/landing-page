/* Every page that exists in more than one language: route name -> path per language. Used for the language toggle and hreflang. */
export const routes = {
  home: { de: '/de', en: '/en' },
  about: { de: '/de/ueber-uns', en: '/en/about' },
  press: { de: '/de/presse', en: '/en/press' },
  imprint: { de: '/de/impressum', en: '/en/imprint' },
  privacy: { de: '/de/datenschutz', en: '/en/privacy' },
  terms: { de: '/de/agb', en: '/en/terms' },
  acceptableUse: { de: '/de/nutzungsrichtlinie', en: '/en/acceptable-use' },
  dpa: { de: '/de/avv', en: '/en/dpa' },
};

export const defaultLanguage = 'en';

export function alternates(pathname) {
  const path = pathname.replace(/\.html$/, '').replace(/\/$/, '');
  return Object.values(routes).find((entry) => Object.values(entry).includes(path)) ?? null;
}
