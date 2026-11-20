/* THEME PRESETS (the "Look & Feel" controls in /admin).
   Every option is a hand-tuned, contrast-checked preset, so any choice
   still looks right and stays readable. Base.astro turns the picks into
   CSS variables that global.css and tailwind read. OKLCH throughout.

   Roles: bg (page), surface (alternating band), ink (text), muted
   (secondary text), primary (brand color: buttons, links), primary-deep
   (dark brand ground: hero, footer; white text sits on it), primary-tint
   (pale brand wash), pop (warm accent), pop-deep (accent as text on
   light), line (hairlines). */
import data from './site.json';
import { fontPairings, DEFAULT_PAIRING } from './font-pairings.mjs';
export { fontPairings };

type Palette = Record<
  | 'bg' | 'surface' | 'ink' | 'muted'
  | 'primary' | 'primary-deep' | 'primary-tint'
  | 'pop' | 'pop-deep' | 'line',
  string
>;

export const palettes: Record<string, { label: string; colors: Palette }> = {
  evergreen: {
    label: 'Evergreen & Copper (steady, Minnesota)',
    colors: {
      bg: 'oklch(1 0 0)', surface: 'oklch(0.967 0.008 150)',
      ink: 'oklch(0.21 0.022 152)', muted: 'oklch(0.43 0.022 152)',
      primary: 'oklch(0.40 0.085 150)', 'primary-deep': 'oklch(0.255 0.05 152)',
      'primary-tint': 'oklch(0.94 0.028 150)', pop: 'oklch(0.76 0.115 58)',
      'pop-deep': 'oklch(0.52 0.115 50)', line: 'oklch(0.90 0.008 150)',
    },
  },
  lake: {
    label: 'Lake Blue & Sand (calm, classic)',
    colors: {
      bg: 'oklch(1 0 0)', surface: 'oklch(0.967 0.008 245)',
      ink: 'oklch(0.21 0.025 250)', muted: 'oklch(0.43 0.025 250)',
      primary: 'oklch(0.42 0.105 250)', 'primary-deep': 'oklch(0.25 0.06 252)',
      'primary-tint': 'oklch(0.94 0.028 245)', pop: 'oklch(0.80 0.09 80)',
      'pop-deep': 'oklch(0.52 0.09 72)', line: 'oklch(0.90 0.008 245)',
    },
  },
  graphite: {
    label: 'Graphite & Amber (modern, quiet)',
    colors: {
      bg: 'oklch(1 0 0)', surface: 'oklch(0.965 0.003 260)',
      ink: 'oklch(0.20 0.008 260)', muted: 'oklch(0.43 0.01 260)',
      primary: 'oklch(0.33 0.015 260)', 'primary-deep': 'oklch(0.22 0.012 260)',
      'primary-tint': 'oklch(0.94 0.006 260)', pop: 'oklch(0.79 0.135 75)',
      'pop-deep': 'oklch(0.53 0.115 68)', line: 'oklch(0.90 0.004 260)',
    },
  },
  brick: {
    label: 'Brick & Cream (warm, established)',
    colors: {
      bg: 'oklch(1 0 0)', surface: 'oklch(0.967 0.01 40)',
      ink: 'oklch(0.22 0.025 35)', muted: 'oklch(0.43 0.028 35)',
      primary: 'oklch(0.44 0.13 30)', 'primary-deep': 'oklch(0.27 0.07 30)',
      'primary-tint': 'oklch(0.94 0.03 38)', pop: 'oklch(0.80 0.10 85)',
      'pop-deep': 'oklch(0.52 0.10 78)', line: 'oklch(0.90 0.01 40)',
    },
  },
  teal: {
    label: 'Northwoods Teal & Clay (fresh, friendly)',
    colors: {
      bg: 'oklch(1 0 0)', surface: 'oklch(0.967 0.009 200)',
      ink: 'oklch(0.21 0.024 205)', muted: 'oklch(0.43 0.024 205)',
      primary: 'oklch(0.42 0.075 200)', 'primary-deep': 'oklch(0.26 0.045 205)',
      'primary-tint': 'oklch(0.94 0.028 198)', pop: 'oklch(0.74 0.12 45)',
      'pop-deep': 'oklch(0.52 0.12 40)', line: 'oklch(0.90 0.008 200)',
    },
  },
  plum: {
    label: 'Plum & Gold (rich, refined)',
    colors: {
      bg: 'oklch(1 0 0)', surface: 'oklch(0.967 0.009 330)',
      ink: 'oklch(0.22 0.028 325)', muted: 'oklch(0.43 0.028 325)',
      primary: 'oklch(0.40 0.105 328)', 'primary-deep': 'oklch(0.25 0.06 328)',
      'primary-tint': 'oklch(0.94 0.028 330)', pop: 'oklch(0.80 0.115 88)',
      'pop-deep': 'oklch(0.52 0.10 80)', line: 'oklch(0.90 0.008 330)',
    },
  },
};

export const textSizes: Record<string, { label: string; rootPercent: number }> = {
  small: { label: 'Compact', rootPercent: 93.75 },
  medium: { label: 'Standard', rootPercent: 100 },
  large: { label: 'Large (easier to read)', rootPercent: 106.25 },
};

const pick = <T>(map: Record<string, T>, key: unknown, fallback: string): T =>
  (typeof key === 'string' && map[key]) || map[fallback];

const d = data as { colorTheme?: string; fontPairing?: string; textSize?: string };

const activePalette = pick(palettes, d.colorTheme, 'evergreen');
const activeFonts = pick(fontPairings, d.fontPairing, DEFAULT_PAIRING);
const activeSize = pick(textSizes, d.textSize, 'medium');

export const theme = {
  // CSS variables carry BARE CHANNELS ("0.21 0.022 152") so opacity
  // utilities like bg-bg/80 compile.
  colors: Object.fromEntries(
    Object.entries(activePalette.colors).map(([role, v]) => [
      role,
      v.replace(/^oklch\(/, '').replace(/\)$/, ''),
    ])
  ) as Palette,
  fonts: activeFonts,
  rootPercent: activeSize.rootPercent,
};

export const themeOptions = {
  colorTheme: Object.entries(palettes).map(([value, p]) => ({ value, label: p.label })),
  fontPairing: Object.entries(fontPairings).map(([value, f]) => ({ value, label: f.label })),
  textSize: Object.entries(textSizes).map(([value, s]) => ({ value, label: s.label })),
};
