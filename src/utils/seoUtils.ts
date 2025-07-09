// SEO utility functions

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;
};

export const generateRobotsTxt = (sitemapUrl: string): string => {
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}/sitemap.xml`;
};

// Meta description generator
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength - 3).trim() + '...';
};

// Keywords generator
export const generateKeywords = (baseKeywords: string[], additionalKeywords: string[] = []): string => {
  const allKeywords = [...baseKeywords, ...additionalKeywords];
  return allKeywords.join(', ');
};

// Structured data generators
export const generateOrganizationSchema = (data: {
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint?: any;
  address?: any;
  sameAs?: string[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...data
  };
};

export const generateWebsiteSchema = (data: {
  name: string;
  url: string;
  description: string;
  publisher: any;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    ...data
  };
};

export const generateServiceSchema = (data: {
  name: string;
  description: string;
  provider: any;
  serviceType: string;
  areaServed?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    ...data
  };
};

// URL slug generator
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Open Graph image URL generator
export const generateOGImageUrl = (title: string, baseUrl: string): string => {
  const encodedTitle = encodeURIComponent(title);
  return `${baseUrl}/api/og?title=${encodedTitle}`;
};

// Canonical URL generator
export const generateCanonicalUrl = (baseUrl: string, path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};