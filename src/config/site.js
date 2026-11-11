/**
 * Single source of truth for identity, links and navigation.
 *
 * These constants used to be exported from App.jsx, which meant leaf
 * components imported from the app root just to get an email address.
 */

export const NAME = 'Abhijith P';
export const ROLE = 'Product, Data & Digital Strategy';

export const CONTACT_EMAIL = 'jithuabhijith999@gmail.com';
export const CONTACT_PHONE = '+91 7306902848';
export const LINKEDIN_URL = 'https://linkedin.com/in/abhijithp99';
export const GITHUB_URL = 'https://github.com/abhijithjithu';

/**
 * Absolute origin with a trailing slash — social crawlers reject relative
 * URLs. Resolved at build time in vite.config.js (SITE_URL env var, else the
 * Vercel production domain, else localhost).
 */
export const SITE_URL = import.meta.env.VITE_SITE_URL;

/** Purpose-built 1200x630 card in public/assets. */
export const OG_IMAGE = `${SITE_URL}assets/og-preview.png`;

/**
 * Resolves a public/ path against Vite's base. The site is served from
 * the domain root on Vercel, so this is a no-op today, but routing every
 * asset URL through here keeps a sub-path deploy a one-line change.
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;

/**
 * Web3Forms access key. Get one free at https://web3forms.com (no account
 * needed — it is emailed to you) and paste it here.
 *
 * While this is empty the contact form falls back to opening a mail client,
 * and says so. That fallback silently does nothing on machines with no mail
 * client configured, which is why a real endpoint is worth the two minutes.
 */
export const CONTACT_FORM_KEY = '';
export const CONTACT_FORM_ENDPOINT = 'https://api.web3forms.com/submit';

export const RESUME = '/assets/resume.pdf';
export const PROFILE_PHOTO = '/assets/profile.jpg';

/**
 * Drives both the header links and the active-section observer.
 * Keeping one list means a section can never be navigable but
 * untracked — which is how `education` silently lost its highlight before.
 */
export const NAV = [
  { id: 'positioning', label: 'About' },
  { id: 'background', label: 'Background' },
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
];
