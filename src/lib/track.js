import { track } from '@vercel/analytics';

/**
 * Custom events for Vercel Web Analytics.
 *
 * Page views are recorded automatically by <Analytics /> in App.jsx, but the
 * résumé is a PDF opened in a new tab, so it never counts as a page view.
 * This records each click instead, tagged with where on the site it came from
 * (hero, contact, footer), so the dashboard shows which placement works.
 *
 * Custom events show up under Analytics → Events in the Vercel dashboard.
 * They are a no-op in local dev and wherever analytics is not enabled.
 */
export const trackResumeDownload = (placement) => {
  try {
    track('Resume download', { placement });
  } catch {
    // Analytics must never break a link.
  }
};
