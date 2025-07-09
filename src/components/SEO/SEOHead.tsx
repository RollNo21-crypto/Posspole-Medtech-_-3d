import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig, getFullImageUrl, getCanonicalUrl } from '../../config/seoConfig';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  pageKey?: keyof typeof seoConfig.pages;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = seoConfig.defaultTitle,
  description = seoConfig.defaultDescription,
  keywords = seoConfig.defaultKeywords,
  image = seoConfig.defaultImage,
  url = seoConfig.siteUrl,
  type = 'website',
  author = seoConfig.company.name,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  pageKey
}) => {
  // Use page-specific data if pageKey is provided
  const pageData = pageKey ? seoConfig.pages[pageKey] : null;
  const finalTitle = pageData?.title || title;
  const finalDescription = pageData?.description || description;
  const finalKeywords = pageData?.keywords || keywords;
  const finalUrl = pageData ? `${seoConfig.siteUrl}${pageData.path}` : url;
  
  const fullTitle = finalTitle.includes(seoConfig.siteName) ? finalTitle : `${finalTitle} | ${seoConfig.siteName}`;
  const fullImageUrl = getFullImageUrl(image);
  const canonicalUrl = getCanonicalUrl(finalUrl.replace(seoConfig.siteUrl, ''));

  const structuredData = {
    ...seoConfig.structuredData.organization,
    description: finalDescription,
    url: finalUrl,
    logo: fullImageUrl,
    keywords: finalKeywords
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seoConfig.siteUrl
      }
    ]
  };
  
  const websiteStructuredData = {
    ...seoConfig.structuredData.website,
    description: finalDescription,
    url: finalUrl
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#4f46e5" />
      <meta name="msapplication-TileColor" content="#4f46e5" />
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(seoConfig.structuredData.medicalOrganization)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Helmet>
  );
};