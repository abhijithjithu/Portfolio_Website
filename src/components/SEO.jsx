import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = 'Portfolio | Enterprise Strategist & Tech Lead',
    description = 'A mapping of my enterprise-scale implementations, entrepreneurial ventures, and strategic digital transformations. Explore case studies and technical expertise.',
    name = 'Portfolio',
    type = 'website',
    image = 'https://example.com/social-preview.jpg', // Placeholder for actual deployed URL
    url = 'https://example.com/'
}) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />

            {/* Open Graph tags for Facebook, LinkedIn, etc */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
