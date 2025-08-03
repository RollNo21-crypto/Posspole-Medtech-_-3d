// Advanced Content Optimization for Killer SEO
// This script enhances content for better search rankings

(function() {
  'use strict';

  // SEO Keywords and Semantic Terms
  const PRIMARY_KEYWORDS = [
    'healthcare technology',
    'medical technology',
    'posspole medtech',
    'healthcare solutions',
    'medical devices',
    'healthcare innovation',
    'digital health',
    'medical equipment'
  ];

  const SEMANTIC_KEYWORDS = [
    'telemedicine',
    'health informatics',
    'medical software',
    'patient care',
    'clinical solutions',
    'healthcare analytics',
    'medical imaging',
    'health monitoring',
    'diagnostic tools',
    'therapeutic devices',
    'healthcare compliance',
    'medical research',
    'biomedical engineering',
    'health technology assessment',
    'medical device regulation',
    'healthcare interoperability',
    'clinical decision support',
    'electronic health records',
    'medical data security',
    'healthcare automation'
  ];

  // Content Enhancement Functions
  function enhanceContentForSEO() {
    // Add semantic keywords to meta descriptions
    addSemanticMetaTags();
    
    // Enhance existing content with keyword variations
    enhanceTextContent();
    
    // Add contextual keywords to images
    enhanceImageAltText();
    
    // Create dynamic content snippets
    addDynamicContentSnippets();
    
    // Enhance internal linking
    enhanceInternalLinking();
  }

  function addSemanticMetaTags() {
    const semanticMeta = document.createElement('meta');
    semanticMeta.name = 'keywords';
    semanticMeta.content = [...PRIMARY_KEYWORDS, ...SEMANTIC_KEYWORDS].join(', ');
    document.head.appendChild(semanticMeta);

    // Add topic clusters meta
    const topicMeta = document.createElement('meta');
    topicMeta.name = 'topic-clusters';
    topicMeta.content = 'healthcare technology, medical innovation, digital health solutions, clinical technology, biomedical devices';
    document.head.appendChild(topicMeta);

    // Add content categories
    const categoryMeta = document.createElement('meta');
    categoryMeta.name = 'content-category';
    categoryMeta.content = 'Healthcare Technology, Medical Devices, Digital Health, Clinical Solutions';
    document.head.appendChild(categoryMeta);
  }

  function enhanceTextContent() {
    // Wait for React content to load
    setTimeout(() => {
      const textElements = document.querySelectorAll('h1, h2, h3, p, span, div');
      
      textElements.forEach(element => {
        if (element.textContent && element.textContent.length > 20) {
          // Add semantic variations to existing content
          let content = element.textContent;
          
          // Enhance healthcare-related terms
          if (content.toLowerCase().includes('healthcare') || content.toLowerCase().includes('medical')) {
            // Add invisible semantic keywords for search engines
            const semanticSpan = document.createElement('span');
            semanticSpan.style.display = 'none';
            semanticSpan.setAttribute('aria-hidden', 'true');
            semanticSpan.textContent = ' healthcare technology medical innovation digital health';
            element.appendChild(semanticSpan);
          }
        }
      });
    }, 2000);
  }

  function enhanceImageAltText() {
    setTimeout(() => {
      const images = document.querySelectorAll('img');
      
      images.forEach((img, index) => {
        if (!img.alt || img.alt.length < 10) {
          // Generate SEO-optimized alt text
          const altTexts = [
            'POSSPOLE MEDTECH healthcare technology solutions and medical innovation',
            'Advanced medical devices and healthcare technology by POSSPOLE MEDTECH',
            'Digital health solutions and medical equipment from POSSPOLE MEDTECH',
            'Healthcare innovation and medical technology development',
            'Clinical solutions and medical device technology',
            'Healthcare analytics and medical software solutions',
            'Biomedical engineering and healthcare technology advancement',
            'Medical research and healthcare technology integration'
          ];
          
          img.alt = altTexts[index % altTexts.length];
        }
        
        // Add title attribute for additional SEO value
        if (!img.title) {
          img.title = `POSSPOLE MEDTECH - ${img.alt}`;
        }
      });
    }, 1500);
  }

  function addDynamicContentSnippets() {
    // Create hidden content snippets for better keyword coverage
    const contentSnippets = [
      {
        title: 'Healthcare Technology Excellence',
        content: 'POSSPOLE MEDTECH delivers cutting-edge healthcare technology solutions, medical devices, and digital health innovations that transform patient care and clinical outcomes.'
      },
      {
        title: 'Medical Innovation Leadership',
        content: 'Leading healthcare technology company specializing in medical device development, clinical solutions, and healthcare analytics for improved patient outcomes.'
      },
      {
        title: 'Digital Health Solutions',
        content: 'Advanced telemedicine platforms, health informatics systems, and medical software solutions designed for modern healthcare environments.'
      },
      {
        title: 'Clinical Technology Integration',
        content: 'Seamless integration of medical technology, electronic health records, and clinical decision support systems for enhanced healthcare delivery.'
      }
    ];

    const snippetContainer = document.createElement('div');
    snippetContainer.style.display = 'none';
    snippetContainer.setAttribute('aria-hidden', 'true');
    snippetContainer.id = 'seo-content-snippets';

    contentSnippets.forEach(snippet => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h3>${snippet.title}</h3>
        <p>${snippet.content}</p>
      `;
      snippetContainer.appendChild(article);
    });

    document.body.appendChild(snippetContainer);
  }

  function enhanceInternalLinking() {
    setTimeout(() => {
      // Add contextual internal links
      const linkableTerms = {
        'healthcare technology': '#solutions',
        'medical devices': '#products',
        'digital health': '#innovation',
        'clinical solutions': '#services',
        'medical innovation': '#research',
        'patient care': '#solutions',
        'healthcare analytics': '#analytics',
        'telemedicine': '#telehealth'
      };

      const textNodes = getTextNodes(document.body);
      
      textNodes.forEach(node => {
        let content = node.textContent;
        let hasChanges = false;
        
        Object.keys(linkableTerms).forEach(term => {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          if (regex.test(content) && !node.parentElement.closest('a')) {
            content = content.replace(regex, `<a href="${linkableTerms[term]}" class="internal-link">${term}</a>`);
            hasChanges = true;
          }
        });
        
        if (hasChanges) {
          const wrapper = document.createElement('span');
          wrapper.innerHTML = content;
          node.parentElement.replaceChild(wrapper, node);
        }
      });
    }, 3000);
  }

  function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.textContent.trim().length > 10 && 
              !node.parentElement.closest('script, style, noscript')) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );
    
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    return textNodes;
  }

  // Content Freshness Signals
  function addContentFreshnessSignals() {
    // Add last modified date
    const lastModified = document.createElement('meta');
    lastModified.name = 'last-modified';
    lastModified.content = new Date().toISOString();
    document.head.appendChild(lastModified);

    // Add content update frequency
    const updateFreq = document.createElement('meta');
    updateFreq.name = 'content-update-frequency';
    updateFreq.content = 'weekly';
    document.head.appendChild(updateFreq);

    // Add content freshness score
    const freshnessScore = document.createElement('meta');
    freshnessScore.name = 'content-freshness-score';
    freshnessScore.content = '95';
    document.head.appendChild(freshnessScore);
  }

  // E-A-T Signals Enhancement
  function enhanceEATSignals() {
    // Add expertise signals
    const expertiseSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "POSSPOLE MEDTECH Expert Team",
      "jobTitle": "Healthcare Technology Specialists",
      "worksFor": {
        "@type": "Organization",
        "name": "POSSPOLE MEDTECH"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Medical Device Engineering"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Healthcare Technology Management"
        }
      ]
    };

    const expertiseScript = document.createElement('script');
    expertiseScript.type = 'application/ld+json';
    expertiseScript.textContent = JSON.stringify(expertiseSchema);
    document.head.appendChild(expertiseScript);
  }

  // Initialize all optimizations
  function initializeContentOptimization() {
    enhanceContentForSEO();
    addContentFreshnessSignals();
    enhanceEATSignals();
    
    // Track content optimization completion
    if (window.gtag) {
      gtag('event', 'content_optimization_complete', {
        event_category: 'SEO',
        event_label: 'POSSPOLE MEDTECH',
        value: 1
      });
    }
  }

  // Run optimization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContentOptimization);
  } else {
    initializeContentOptimization();
  }

  // Re-run optimization for dynamic content
  const observer = new MutationObserver((mutations) => {
    let shouldOptimize = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldOptimize = true;
      }
    });
    
    if (shouldOptimize) {
      setTimeout(enhanceTextContent, 500);
      setTimeout(enhanceImageAltText, 1000);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();