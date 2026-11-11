import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { siteUrl } from './scripts/site-url.mjs'

// https://vite.dev/config/
export default defineConfig({
  // Vercel serves the site from the domain root, so no sub-path base.
  base: '/',
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
  plugins: [react()],
})
