// Prefixes root-relative paths with the site's base path. The base is "/"
// on the real domain; it is only set while the site is served from the
// temporary GitHub address (repo variable SITE_BASE).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (p?: string) =>
  p && p.startsWith('/') && !p.startsWith('//') ? base + p : p;
