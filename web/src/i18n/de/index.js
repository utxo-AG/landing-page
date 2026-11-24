import site from './site.json';
import pages from './pages.json';

/* One dictionary per language: site.json plus one file per mockup, available as t.mockups['<file name>']. */
const files = import.meta.glob('./mockups/*.json', { eager: true, import: 'default' });
const mockups = Object.fromEntries(Object.entries(files).map(([path, data]) => [path.match(/([^/]+)\.json$/)[1], data]));

/* services/<service id>.json holds the content of that service's detail page: t.servicePages['<service id>'] */
const serviceFiles = import.meta.glob('./services/*.json', { eager: true, import: 'default' });
const servicePages = Object.fromEntries(Object.entries(serviceFiles).map(([path, data]) => [path.match(/([^/]+)\.json$/)[1], data]));

export default { ...site, pages, mockups, servicePages };
