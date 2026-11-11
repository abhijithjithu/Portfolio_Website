import { defineConfig } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'

/**
 * The public origin, with a trailing slash. Social crawlers need absolute
 * URLs, so this is resolved once at build time and baked into index.html
 * and the bundle as VITE_SITE_URL.
 *
 *  1. SITE_URL — set this in Vercel (Project → Settings → Environment
 *     Variables) once a custom domain is attached.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — provided by Vercel on every build;
 *     the project's production domain (e.g. my-site.vercel.app).
 *  3. localhost — plain `npm run dev` / `npm run build` on a laptop.
 */
const siteUrl = (() => {
  const raw =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:5173'
  return `${raw.replace(/\/+$/, '')}/`
})()

// https://vite.dev/config/
export default defineConfig({
  // Vercel serves the site from the domain root, so no sub-path base.
  base: '/',
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
  plugins: [react()],
})
