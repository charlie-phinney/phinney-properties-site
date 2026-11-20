/* Font pairings: shared by the site theme (src/data/theme.ts) and the
   build-time font fetcher (scripts/vendor-fonts.mjs). `serif` is the
   heading stack, `sans` the body stack. `googleFamilies` are the
   `family=` params for the Google Fonts css2 URL. */
const HANKEN = 'Hanken+Grotesk:wght@400;500;600;700';
const hanken = "'Hanken Grotesk', system-ui, -apple-system, sans-serif";

export const fontPairings = {
  young: {
    label: 'Young Serif + Hanken (classic, trustworthy)',
    serif: "'Young Serif', Georgia, serif", sans: hanken,
    googleFamilies: ['Young+Serif', HANKEN],
  },
  hanken: {
    label: 'Hanken Grotesk (clean, modern)',
    serif: hanken, sans: hanken,
    googleFamilies: [HANKEN],
  },
  schibsted: {
    label: 'Schibsted Grotesk (crisp, confident)',
    serif: "'Schibsted Grotesk', system-ui, sans-serif",
    sans: "'Schibsted Grotesk', system-ui, sans-serif",
    googleFamilies: ['Schibsted+Grotesk:wght@400;500;600;700'],
  },
  caslon: {
    label: 'Libre Caslon + Work Sans (established, bookish)',
    serif: "'Libre Caslon Text', Georgia, serif", sans: "'Work Sans', system-ui, sans-serif",
    googleFamilies: ['Libre+Caslon+Text:wght@400;700', 'Work+Sans:wght@400;500;600;700'],
  },
  gloock: {
    label: 'Gloock + Figtree (bold, friendly)',
    serif: "'Gloock', Georgia, serif", sans: "'Figtree', system-ui, sans-serif",
    googleFamilies: ['Gloock', 'Figtree:wght@400;500;600;700'],
  },
  zilla: {
    label: 'Zilla Slab + Karla (sturdy, neighborly)',
    serif: "'Zilla Slab', Georgia, serif", sans: "'Karla', system-ui, sans-serif",
    googleFamilies: ['Zilla+Slab:wght@500;600;700', 'Karla:wght@400;500;600;700'],
  },
};

export const DEFAULT_PAIRING = 'young';

export const googleCssUrl = (pairing) =>
  `https://fonts.googleapis.com/css2?${pairing.googleFamilies
    .map((f) => `family=${f}`)
    .join('&')}&display=swap`;
