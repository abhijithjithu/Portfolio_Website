import process from 'node:process';

/**
 * The public origin, with a trailing slash. Social crawlers need absolute
 * URLs, so this is resolved once at build time and shared by vite.config.js
 * (which bakes it into index.html and the bundle as VITE_SITE_URL) and the
 * postbuild step (per-project pages, sitemap, robots).
 *
 *  1. SITE_URL — set this in Vercel (Project → Settings → Environment
 *     Variables) once a custom domain is attached.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — provided by Vercel on every build;
 *     the project's production domain (e.g. my-site.vercel.app).
 *  3. localhost — plain `npm run dev` / `npm run build` on a laptop.
 */
const raw =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:5173';

export const siteUrl = `${raw.replace(/\/+$/, '')}/`;
