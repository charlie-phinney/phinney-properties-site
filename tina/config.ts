import { defineConfig } from 'tinacms';

const branch = process.env.GITHUB_BRANCH || process.env.HEAD || 'main';

// Reusable "title + one line" list (reasons, services, steps).
const pointList = (name: string, label: string, description: string, itemWord: string) => ({
  type: 'object' as const,
  name,
  label,
  description,
  list: true,
  ui: { itemProps: (i: any) => ({ label: i?.title || `New ${itemWord}` }) },
  fields: [
    { type: 'string' as const, name: 'title', label: 'Title', description: 'A few words.' },
    {
      type: 'string' as const,
      name: 'text',
      label: 'One line about it (optional)',
      ui: { component: 'textarea' },
    },
  ],
});

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: { outputFolder: 'admin', publicFolder: 'public' },
  // Uploaded photos live in the repo under public/images. HEIC (iPhone
  // default) is left out of the picker; CI also converts any that slip in.
  media: {
    tina: { mediaRoot: 'images', publicFolder: 'public' },
    accept: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  },

  schema: {
    collections: [
      {
        name: 'site',
        label: 'Website Content',
        path: 'src/data',
        format: 'json',
        match: { include: 'site' },
        ui: { allowedActions: { create: false, delete: false }, global: true },
        // Fields run top to bottom in the same order as the page. Anything
        // marked optional can be left blank and simply will not show.
        fields: [
          {
            type: 'string',
            name: 'changeRequest',
            label: "✨ Want a change you can't make below? Ask here",
            description:
              "Describe anything you'd like changed that these controls don't let you do, then hit Save. It goes straight to Charlie. Clear this box once it's done. (After any Save, the live site updates in about 3 minutes.)",
            ui: { component: 'textarea' },
          },

          // ===== Look & Feel =====
          {
            type: 'string',
            name: 'colorTheme',
            label: '🎨 Color theme',
            description: 'Sets the colors across the whole site.',
            options: [
              { value: 'evergreen', label: 'Evergreen & Copper (steady, Minnesota)' },
              { value: 'lake', label: 'Lake Blue & Sand (calm, classic)' },
              { value: 'graphite', label: 'Graphite & Amber (modern, quiet)' },
              { value: 'brick', label: 'Brick & Cream (warm, established)' },
              { value: 'teal', label: 'Northwoods Teal & Clay (fresh, friendly)' },
              { value: 'plum', label: 'Plum & Gold (rich, refined)' },
            ],
          },
          {
            type: 'string',
            name: 'fontPairing',
            label: '✍️ Fonts',
            description: 'The lettering style for headings and text.',
            options: [
              { value: 'young', label: 'Young Serif + Hanken (classic, trustworthy)' },
              { value: 'hanken', label: 'Hanken Grotesk (clean, modern)' },
              { value: 'schibsted', label: 'Schibsted Grotesk (crisp, confident)' },
              { value: 'caslon', label: 'Libre Caslon + Work Sans (established, bookish)' },
              { value: 'gloock', label: 'Gloock + Figtree (bold, friendly)' },
              { value: 'zilla', label: 'Zilla Slab + Karla (sturdy, neighborly)' },
            ],
          },
          {
            type: 'string',
            name: 'textSize',
            label: '🔠 Text size',
            description: 'Make everything a little smaller or bigger, all at once.',
            options: [
              { value: 'small', label: 'Compact' },
              { value: 'medium', label: 'Standard' },
              { value: 'large', label: 'Large (easier to read)' },
            ],
          },

          // ===== Sections: order + show/hide =====
          {
            type: 'object',
            name: 'sections',
            label: '🧩 Sections (drag to reorder, switch to show or hide)',
            description:
              'The top banner always comes first. Everything else follows this order. A section with nothing in it stays hidden on its own.',
            list: true,
            ui: {
              itemProps: (i: any) => {
                const names: Record<string, string> = {
                  why: 'Three reasons',
                  about: 'About',
                  homes: 'Photos of your homes',
                  services: 'Services',
                  process: 'How it works',
                  area: 'Service area',
                  rentals: 'Homes for rent',
                  contact: 'Contact form',
                };
                return { label: `${names[i?.id] || 'Section'}${i?.show === false ? ' (hidden)' : ''}` };
              },
            },
            fields: [
              {
                type: 'string',
                name: 'id',
                label: 'Section',
                options: [
                  { value: 'why', label: 'Three reasons' },
                  { value: 'about', label: 'About' },
                  { value: 'homes', label: 'Photos of your homes' },
                  { value: 'services', label: 'Services' },
                  { value: 'process', label: 'How it works' },
                  { value: 'area', label: 'Service area' },
                  { value: 'rentals', label: 'Homes for rent' },
                  { value: 'contact', label: 'Contact form' },
                ],
              },
              { type: 'boolean', name: 'show', label: 'Show on page' },
            ],
          },

          // ===== Top banner =====
          { type: 'string', name: 'brand', label: 'Business name', description: 'Shown in the top bar and the footer.' },
          { type: 'string', name: 'heroHeadline', label: 'Top banner: big headline' },
          {
            type: 'string',
            name: 'heroSub',
            label: 'Top banner: sentence under the headline',
            ui: { component: 'textarea' },
          },
          { type: 'string', name: 'heroButton', label: 'Button text', description: 'The button that jumps to the contact form.' },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Top banner: photo',
            description: 'A wide photo of one of your homes works best. Leave empty for a plain color banner.',
          },
          {
            type: 'string',
            name: 'heroImageAlt',
            label: 'Top banner: describe the photo (optional)',
            description: 'One sentence for people who cannot see the photo.',
          },

          // ===== Three reasons =====
          pointList('why', 'Three reasons to choose you', 'Shown in a row under the banner. Three works best.', 'reason'),

          // ===== About =====
          { type: 'string', name: 'aboutHeading', label: 'About: heading' },
          {
            type: 'string',
            name: 'aboutText',
            label: 'About: your story',
            description: 'Leave a blank line between paragraphs.',
            ui: { component: 'textarea' },
          },
          { type: 'image', name: 'aboutImage', label: 'About: photo (optional)' },

          // ===== Photos of your homes =====
          { type: 'string', name: 'homesHeading', label: 'Photos of your homes: heading' },
          {
            type: 'object',
            name: 'homes',
            label: 'Photos of your homes',
            description: 'One professional photo per home, showing the outside. Add every home you look after, or leave this section off. To show it, also switch on "Photos of your homes" in Sections above.',
            list: true,
            ui: { itemProps: (i: any) => ({ label: i?.caption || 'New photo' }) },
            fields: [
              { type: 'image', name: 'image', label: 'Photo' },
              { type: 'string', name: 'caption', label: 'Where it is', description: 'Town and state only, e.g. Edina, Minnesota.' },
            ],
          },

          // ===== Services =====
          { type: 'string', name: 'servicesHeading', label: 'Services: heading' },
          pointList('services', 'Services', 'What you take care of for owners.', 'service'),

          // ===== How it works =====
          { type: 'string', name: 'processHeading', label: 'How it works: heading' },
          pointList('process', 'How it works: steps', 'Shown numbered, in this order.', 'step'),

          // ===== Service area =====
          { type: 'string', name: 'areaHeading', label: 'Service area: heading' },
          {
            type: 'string',
            name: 'areaText',
            label: 'Service area: towns',
            description: 'One town per line.',
            ui: { component: 'textarea' },
          },
          { type: 'string', name: 'areaNote', label: 'Service area: short note (optional)' },

          // ===== Homes for rent =====
          { type: 'string', name: 'rentalsHeading', label: 'Homes for rent: heading' },
          {
            type: 'object',
            name: 'rentals',
            label: 'Homes for rent',
            description:
              'Add a home when one is available. To show this section, also switch on "Homes for rent" in Sections above.',
            list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title || 'New home' }) },
            fields: [
              { type: 'string', name: 'title', label: 'Name or address', description: 'e.g. 2 bedroom duplex in Edina.' },
              { type: 'string', name: 'price', label: 'Rent (optional)', description: 'e.g. $1,950 a month.' },
              { type: 'string', name: 'details', label: 'Details (optional)', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Photo (optional)' },
              {
                type: 'string',
                name: 'href',
                label: 'Link to the full listing (optional)',
                description: 'Paste the full web address, starting with https://',
              },
            ],
          },

          // ===== Contact =====
          { type: 'string', name: 'contactHeading', label: 'Contact: heading' },
          { type: 'string', name: 'contactIntro', label: 'Contact: sentence under the heading (optional)', ui: { component: 'textarea' } },
          {
            type: 'string',
            name: 'contactPhone',
            label: 'Phone number to show (optional)',
            description: 'Leave blank to keep your number off the site.',
          },
          {
            type: 'string',
            name: 'contactEmail',
            label: 'Email that receives messages',
            description: 'Not shown on the page. Messages from the contact form go here.',
          },
          {
            type: 'string',
            name: 'formEndpoint',
            label: 'Form delivery link (set up by Charlie, leave as is)',
          },
        ],
      },
    ],
  },
});
