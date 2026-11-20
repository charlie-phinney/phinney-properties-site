/* Shapes src/data/site.json (edited in /admin) for the page. Everything
   here is defensive: a blank field, a deleted item, or an odd paste in the
   editor must never break the layout. */
import raw from './site.json';

const d = raw as Record<string, any>;
const str = (v: unknown, fallback = ''): string =>
  typeof v === 'string' && v.trim() ? v.trim() : fallback;
const lines = (v: unknown): string[] =>
  str(v).split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
const paragraphs = (v: unknown): string[] =>
  str(v).split(/\r?\n\s*\r?\n/).map((p) => p.replace(/\s*\r?\n\s*/g, ' ').trim()).filter(Boolean);
type Item = { title: string; text: string };
const items = (v: unknown): Item[] =>
  (Array.isArray(v) ? v : [])
    .map((i) => ({ title: str(i?.title), text: str(i?.text) }))
    .filter((i) => i.title);
// Only same-site image paths or https URLs are ever rendered.
const img = (v: unknown): string => {
  const s = str(v);
  return /^\/images\/[^"'<>\s]+$/.test(s) || /^https:\/\/[^"'<>\s]+$/.test(s) ? s : '';
};
const href = (v: unknown): string => {
  const s = str(v);
  return /^https?:\/\/[^"'<>\s]+$/.test(s) ? s : '';
};

export const SECTION_IDS = ['why', 'about', 'homes', 'services', 'process', 'area', 'rentals', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

const rentals = (Array.isArray(d.rentals) ? d.rentals : [])
  .map((r: any) => ({
    title: str(r?.title),
    details: str(r?.details),
    price: str(r?.price),
    image: img(r?.image),
    href: href(r?.href),
  }))
  .filter((r: { title: string }) => r.title);

const homes = (Array.isArray(d.homes) ? d.homes : [])
  .map((h: any) => ({ image: img(h?.image), caption: str(h?.caption) }))
  .filter((h: { image: string }) => h.image);

const content = {
  brand: str(d.brand, 'Phinney Properties'),
  heroHeadline: str(d.heroHeadline, 'Property management that feels personal.'),
  heroSub: str(d.heroSub),
  heroButton: str(d.heroButton, 'Get in touch'),
  heroImage: img(d.heroImage),
  heroImageAlt: str(d.heroImageAlt),
  why: items(d.why),
  aboutHeading: str(d.aboutHeading, 'About us'),
  aboutParagraphs: paragraphs(d.aboutText),
  aboutImage: img(d.aboutImage),
  homesHeading: str(d.homesHeading, 'Homes we look after'),
  homes,
  servicesHeading: str(d.servicesHeading, 'Services'),
  services: items(d.services),
  processHeading: str(d.processHeading, 'How it works'),
  process: items(d.process),
  areaHeading: str(d.areaHeading, 'Where we work'),
  areaPlaces: lines(d.areaText),
  areaNote: str(d.areaNote),
  rentalsHeading: str(d.rentalsHeading, 'Homes for rent'),
  rentals,
  contactHeading: str(d.contactHeading, 'Get in touch'),
  contactIntro: str(d.contactIntro),
  contactEmail: /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(str(d.contactEmail)) ? str(d.contactEmail) : '',
  contactPhone: str(d.contactPhone),
  formEndpoint: /^https:\/\/[^"'<>\s]+$/.test(str(d.formEndpoint)) ? str(d.formEndpoint) : '',
};

// A section with nothing in it never renders, whatever the switch says.
const hasContent: Record<SectionId, boolean> = {
  why: content.why.length > 0,
  about: content.aboutParagraphs.length > 0,
  homes: content.homes.length > 0,
  services: content.services.length > 0,
  process: content.process.length > 0,
  area: content.areaPlaces.length > 0,
  rentals: content.rentals.length > 0,
  contact: true,
};

// Order + visibility from /admin. Unknown ids are ignored, duplicates
// collapse to the first, and anything missing from the list is appended
// (shown) so a new section can never silently vanish.
const seen = new Set<string>();
const ordered: { id: SectionId; show: boolean }[] = [];
for (const s of Array.isArray(d.sections) ? d.sections : []) {
  const id = s?.id as SectionId;
  if (!SECTION_IDS.includes(id) || seen.has(id)) continue;
  seen.add(id);
  ordered.push({ id, show: s?.show !== false });
}
for (const id of SECTION_IDS) if (!seen.has(id)) ordered.push({ id, show: id !== 'rentals' });

export const sections: SectionId[] = ordered.filter((s) => s.show && hasContent[s.id]).map((s) => s.id);
export const site = content;

const NAV_LABELS: Partial<Record<SectionId, string>> = {
  services: 'Services',
  about: 'About',
  area: 'Service area',
  rentals: 'Rentals',
};
export const navLinks = sections
  .filter((id) => NAV_LABELS[id])
  .map((id) => ({ href: `#${id}`, label: NAV_LABELS[id] as string }));
