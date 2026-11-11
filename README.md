# Portfolio

Personal portfolio of Abhijith P. React 19 + Vite + Tailwind, deployed on Vercel.

## Develop

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build, then `scripts/postbuild.mjs` (per-project pages, `404.html`, `sitemap.xml`, `robots.txt`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run images` | Regenerate responsive WebP files from `assets-src/` |

## Content

- All copy, projects and case studies live in `src/data.js`.
- Identity, links and navigation live in `src/config/site.js`.
- Images: drop the full-size original in `assets-src/`, reference it in
  `data.js` as `/assets/<file>`, and run `npm run images`. Commit the
  generated files in `public/assets/` and `src/lib/images.json`.

## Deploy (Vercel)

Pushes to `main` deploy automatically. Optional environment variables
(Project → Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Public origin, e.g. `https://example.com`. Only needed with a custom domain; otherwise the Vercel production domain is used. |
| `VITE_WEB3FORMS_KEY` | Access key from web3forms.com. Makes the contact form deliver to your inbox instead of opening a mail client. |

Web Analytics and Speed Insights are wired in and start reporting once
enabled for the project in the Vercel dashboard.
