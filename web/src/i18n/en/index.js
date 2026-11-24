import site from './site.json';
import pages from './pages.json';

/* One dictionary per language: site.json plus one file per mockup, available as t.mockups['<file name>']. */
const files = import.meta.glob('./mockups/*.json', { eager: true, import: 'default' });
const mockups = Object.fromEntries(Object.entries(files).map(([path, data]) => [path.match(/([^/]+)\.json$/)[1], data]));

export default { ...site, pages, mockups };
