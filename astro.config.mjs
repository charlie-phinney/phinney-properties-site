import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Static site — builds to ./dist, deployed by GitHub Actions to GitHub Pages.
// Live at the custom domain phinneyproperties.com (GitHub Pages + public/CNAME).
export default defineConfig({
  site: 'https://phinneyproperties.com',
  integrations: [tailwind()],
});
