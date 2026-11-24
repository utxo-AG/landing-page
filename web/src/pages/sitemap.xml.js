/* Sitemap of every built page except the 404 and the dev pages. */
const pages = import.meta.glob('./**/*.astro');

export function GET({ site }) {
  const paths = Object.keys(pages)
    .map((file) => file.slice(1).replace(/\.astro$/, '').replace(/\/index$/, ''))
    .filter((path) => path && path !== '/404' && !path.startsWith('/dev/'))
    .sort();
  const urls = paths.map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
