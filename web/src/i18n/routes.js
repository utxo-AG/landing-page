/* Every page that exists in more than one language: route name -> path per language. Used for the language toggle and hreflang.
   The six service detail pages use the service id as route name. */
export const routes = {
  home: { de: '/de', en: '/en' },
  about: { de: '/de/ueber-uns', en: '/en/about' },
  press: { de: '/de/presse', en: '/en/press' },
  imprint: { de: '/de/impressum', en: '/en/imprint' },
  privacy: { de: '/de/datenschutz', en: '/en/privacy' },
  terms: { de: '/de/agb', en: '/en/terms' },
  acceptableUse: { de: '/de/nutzungsrichtlinie', en: '/en/acceptable-use' },
  dpa: { de: '/de/avv', en: '/en/dpa' },
  'software-development': { de: '/de/software-development', en: '/en/software-development' },
  'agent-factories': { de: '/de/agent-factories', en: '/en/agent-factories' },
  'managed-agents': { de: '/de/managed-agents', en: '/en/managed-agents' },
  'agentic-coworker': { de: '/de/agentic-coworker', en: '/en/agentic-coworker' },
  'ki-automationen': { de: '/de/ki-automationen', en: '/en/ai-automation' },
  'ai-adoption': { de: '/de/ai-adoption', en: '/en/ai-adoption' },
};

export const defaultLanguage = 'en';

export function alternates(pathname) {
  const path = pathname.replace(/\.html$/, '').replace(/\/$/, '');
  return Object.values(routes).find((entry) => Object.values(entry).includes(path)) ?? null;
}
