import { useEffect } from 'react';
import { NAME, OG_IMAGE, SITE_URL } from '../config/site';

/**
 * Document metadata without a library.
 *
 * This used to use react-helmet-async, whose peer range stops at React 18
 * while this project runs React 19 — the install fails outright. React 19 can
 * hoist <title>/<meta> rendered in a component, but index.html already ships
 * static tags for crawlers, and hoisting alongside them yields two <title>
 * elements. Updating the existing tags in place avoids both problems.
 */

const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const SEO = ({
  title = `${NAME} | Product, Data & Digital Strategy`,
  description = 'Portfolio of Abhijith P — MBA (IIM Udaipur), digital transformation strategist and MLOps engineer.',
  url = SITE_URL,
  image = OG_IMAGE,
}) => {
  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', NAME);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertCanonical(url);
  }, [title, description, url, image]);

  return null;
};

export default SEO;
