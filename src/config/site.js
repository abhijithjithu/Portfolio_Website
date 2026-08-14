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

/** Absolute, and deliberately not derived from BASE_URL — social crawlers reject relative URLs. */
export const SITE_URL = 'https://abhijithjithu.github.io/Portfolio_Website/';

/**
 * Points at the real portrait because it exists. The previous value referenced
 * an og-preview.jpg that was never created, so every shared link rendered a
 * blank card. A purpose-built 1200×630 image would be better — drop one in
 * public/assets and repoint this.
 */
export const OG_IMAGE = `${SITE_URL}assets/profile.jpg`;

/**
 * Resolves a public/ path against Vite's base so it survives the
 * GitHub Pages sub-path deploy. Every asset URL in JSX goes through here;
 * a bare "/assets/..." works in dev and 404s in production.
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`;

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
