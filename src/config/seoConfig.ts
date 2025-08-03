// SEO Configuration for POSSPOLE MEDTECH

export const seoConfig = {
  // Default site information
  siteName: 'POSSPOLE MEDTECH',
  siteUrl: 'https://medtech.posspole.com',
  defaultTitle: 'POSSPOLE MEDTECH - Revolutionizing Healthcare Technology',
  defaultDescription: 'POSSPOLE MEDTECH is pioneering cutting-edge healthcare technologies to create a unified vision for global health, bringing together science, data, and human expertise.',
  defaultKeywords: 'posspole, posspolemedtech, POSSPOLE MEDTECH, posspole medtech, posspole healthcare, healthcare technology, medical innovation, AI healthcare, digital health, medical devices, healthcare solutions, telemedicine, health tech, medical AI, healthcare analytics',
  defaultImage: '/assets/posspole.png',
  twitterHandle: '@posspolemedtech', // Update when available
  
  // Company information
  company: {
    name: 'POSSPOLE MEDTECH',
    description: 'Pioneering cutting-edge healthcare technologies for global health transformation',
    foundingYear: '2024',
    industry: 'Healthcare Technology',
    location: 'India',
    email: 'contact@medtech.posspole.com', // Update with actual email
    phone: '+91-XXXXXXXXXX', // Update with actual phone
  },
  
  // Page-specific SEO data
  pages: {
    home: {
      title: 'POSSPOLE MEDTECH - Revolutionizing Healthcare Technology',
      description: 'POSSPOLE MEDTECH is pioneering cutting-edge healthcare technologies to create a unified vision for global health, bringing together science, data, and human expertise.',
      keywords: 'posspole, posspolemedtech, POSSPOLE MEDTECH, posspole medtech, posspole healthcare, healthcare technology, medical innovation, AI healthcare, digital health, medical devices, healthcare solutions, telemedicine, health tech, medical AI, healthcare analytics',
      path: '/',
    },
    solutions: {
      title: 'Healthcare Solutions | POSSPOLE MEDTECH',
      description: 'Discover our innovative healthcare solutions designed to transform medical practices and improve patient outcomes through cutting-edge technology.',
      keywords: 'posspole solutions, posspolemedtech solutions, healthcare solutions, medical technology, digital health solutions, AI medical devices, healthcare innovation, medical software',
      path: '/#solutions',
    },
    services: {
      title: 'Healthcare Services | POSSPOLE MEDTECH',
      description: 'Comprehensive healthcare services and products designed to revolutionize medical care and enhance patient experiences.',
      keywords: 'posspole services, posspolemedtech services, healthcare services, medical services, telemedicine, digital health services, medical consultation, healthcare products',
      path: '/#services',
    },
    partners: {
      title: 'Our Partners | POSSPOLE MEDTECH',
      description: 'Meet our trusted partners in healthcare innovation. Together, we are building the future of medical technology.',
      keywords: 'posspole partners, posspolemedtech partners, healthcare partners, medical technology partners, healthcare collaboration, medical innovation partners',
      path: '/#partners',
    },
    contact: {
      title: 'Contact Us | POSSPOLE MEDTECH',
      description: 'Get in touch with POSSPOLE MEDTECH to learn more about our healthcare solutions and how we can transform your medical practice.',
      keywords: 'contact posspole, contact posspolemedtech, contact POSSPOLE MEDTECH, healthcare consultation, medical technology inquiry, healthcare solutions contact',
      path: '/#contact',
    },
  },
  
  // Structured data templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'POSSPOLE MEDTECH',
      url: 'https://medtech.posspole.com',
      logo: 'https://medtech.posspole.com/assets/posspole.png',
      description: 'POSSPOLE MEDTECH is pioneering cutting-edge healthcare technologies to create a unified vision for global health, bringing together science, data, and human expertise.',
      foundingDate: '2024',
      industry: 'Healthcare Technology',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      sameAs: [
        // Add social media URLs when available
        // 'https://www.linkedin.com/company/posspole-medtech',
        // 'https://twitter.com/posspolemedtech',
        // 'https://www.facebook.com/posspolemedtech'
      ],
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'POSSPOLE MEDTECH',
      url: 'https://medtech.posspole.com',
      description: 'POSSPOLE MEDTECH is pioneering cutting-edge healthcare technologies to create a unified vision for global health, bringing together science, data, and human expertise.',
      publisher: {
        '@type': 'Organization',
        name: 'POSSPOLE MEDTECH',
      },
    },
    medicalOrganization: {
      '@context': 'https://schema.org',
      '@type': 'MedicalOrganization',
      name: 'POSSPOLE MEDTECH',
      url: 'https://medtech.posspole.com',
      description: 'Healthcare technology company specializing in innovative medical solutions',
      medicalSpecialty: 'Healthcare Technology',
    },
  },
  
  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'POSSPOLE MEDTECH',
  },
  
  // Twitter defaults
  twitter: {
    cardType: 'summary_large_image',
    site: '@posspolemedtech', // Update when available
  },
  
  // Additional meta tags
  additionalMetaTags: [
    {
      name: 'application-name',
      content: 'POSSPOLE MEDTECH',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'POSSPOLE MEDTECH',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml',
    },
    {
      name: 'msapplication-TileColor',
      content: '#4f46e5',
    },
    {
      name: 'theme-color',
      content: '#4f46e5',
    },
  ],
};

// Helper function to get page-specific SEO data
export const getPageSEO = (pageKey: keyof typeof seoConfig.pages) => {
  const pageData = seoConfig.pages[pageKey];
  if (!pageData) {
    return {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: seoConfig.defaultKeywords,
      url: seoConfig.siteUrl,
    };
  }
  
  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    url: `${seoConfig.siteUrl}${pageData.path}`,
  };
};

// Helper function to generate full image URL
export const getFullImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${seoConfig.siteUrl}${imagePath}`;
};

// Helper function to generate canonical URL
export const getCanonicalUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
};