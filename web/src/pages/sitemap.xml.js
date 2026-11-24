/* Sitemap of every built page except the 404 and the dev pages, with hreflang alternates from the route table. */
import { alternates, defaultLanguage } from '../i18n/routes.js';

const pages = import.meta.glob('./**/*.astro');

export function GET({ site }) {
  const url = (path) => new URL(path, site).href;
  const paths = Object.keys(pages)
    .map((file) => file.slice(1).replace(/\.astro$/, '').replace(/\/index$/, ''))
    .filter((path) => path && path !== '/404' && !path.startsWith('/dev/'))
    .sort();
  const entries = paths.map((path) => {
    const versions = alternates(path);
    const links = versions
      ? [...Object.entries(versions), ['x-default', versions[defaultLanguage]]].map(([lang, target]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${url(target)}"/>`).join('')
      : '';
    return `<url><loc>${url(path)}</loc>${links}</url>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
