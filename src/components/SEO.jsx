import { Helmet } from 'react-helmet-async';
import { NAME, OG_IMAGE, SITE_URL } from '../config/site';

/**
 * Defaults come from config/site rather than the example.com placeholders
 * this shipped with — every case study was emitting an og:image pointing at
 * https://example.com/social-preview.jpg.
 */
const SEO = ({
  title = `${NAME} | Product, Data & Digital Strategy`,
  description = 'Portfolio of Abhijith P — MBA (IIM Udaipur), digital transformation strategist and MLOps engineer.',
  url = SITE_URL,
  image = OG_IMAGE,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content={NAME} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Helmet>
);

export default SEO;
