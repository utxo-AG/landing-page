/* Sitemap of every built page except the 404 and the dev pages, with hreflang alternates from the route table.
   Dynamic routes ([slug]) are skipped by the glob and added from their data: the published articles, with lastmod. */
import { alternates, defaultLanguage } from '../i18n/routes.js';
import { articlePath, published } from '../content/articles.js';

const pages = import.meta.glob('./**/*.astro');

export function GET({ site }) {
  const url = (path) => new URL(path, site).href;
  const paths = Object.keys(pages)
    .map((file) => file.slice(1).replace(/\.astro$/, '').replace(/\/index$/, ''))
    .filter((path) => path && path !== '/404' && !path.startsWith('/dev/') && !path.includes('['))
    .sort();
  const entries = paths.map((path) => {
    const versions = alternates(path);
    const links = versions
      ? [...Object.entries(versions), ['x-default', versions[defaultLanguage]]].map(([lang, target]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${url(target)}"/>`).join('')
      : '';
    return `<url><loc>${url(path)}</loc>${links}</url>`;
  }).join('') + ['de', 'en'].flatMap(published).map((article) => `<url><loc>${url(articlePath(article))}</loc><lastmod>${article.modified ?? article.published}</lastmod></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
