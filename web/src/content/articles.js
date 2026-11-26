import list from './articles.json';
import team from './team.json';

/*
  Articles of the knowledge section ("Wissen"). articles.json is the single source: one entry per article and language,
  { lang, slug, author (name as in team.json), service (service id it supports), title, heading, description, lede,
    published (YYYY-MM-DD, the real first publication; null = draft: not built, not linked), modified (YYYY-MM-DD, only after a real content change) }.
  The body is content/articles/<lang>/<slug>.html (grammar: components/Prose.astro, first block p.tp-answer).
*/
const bodies = import.meta.glob('./articles/*/*.html', { eager: true, query: '?raw', import: 'default' });

export const sectionPath = { de: '/de/wissen', en: '/en/insights' };

export const published = (lang) => list
  .filter((article) => article.lang === lang && article.published)
  .sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug));

export const forService = (lang, service) => published(lang).filter((article) => article.service === service);

export const articlePath = (article) => `${sectionPath[article.lang]}/${article.slug}`;

export const body = (article) => bodies[`./articles/${article.lang}/${article.slug}.html`];

export const author = (article) => team.find((member) => member.name === article.author);
