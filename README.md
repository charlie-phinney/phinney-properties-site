# Phinney Properties (phinneyproperties.com)

Static one-page site (Astro + Tailwind) with a visual editor (TinaCMS) at `/admin`.

## Editing

Go to `https://phinneyproperties.com/admin`, log in, change anything, Save. The live site updates in about 3 minutes. Photos upload there too.

## Developers

```bash
npm install
npm run dev     # http://localhost:4321
npm run cms     # same, with the editor running locally
```

- Content: `src/data/site.json` (written by `/admin`); shaped in `src/data/site.ts`.
- Editor fields: `tina/config.ts`. A schema change must not merge while someone is saving in `/admin`.
- Look & Feel presets: `src/data/theme.ts`, `src/data/font-pairings.mjs`.
- Deploy: `.github/workflows/deploy.yml` (GitHub Pages). Needs repo secrets `TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN`, and `RESEND_API_KEY` for the failure email.
- Change requests typed into `/admin` become GitHub issues (`change-request.yml`).
