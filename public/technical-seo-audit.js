// Technical SEO Audit and Optimization Script
// Comprehensive technical SEO checker and fixer for killer rankings

(function() {
  'use strict';

  const TECHNICAL_SEO_CONFIG = {
    domain: 'medtech.posspole.com',
    protocol: 'https',
    primaryKeyword: 'healthcare technology',
    targetLoadTime: 2000, // 2 seconds
    minContentLength: 300,
    maxTitleLength: 60,
    maxDescriptionLength: 160
  };

  class TechnicalSEOAuditor {
    constructor() {
      this.issues = [];
      this.fixes = [];
      this.score = 100;
    }

    // Run comprehensive technical SEO audit
    async runAudit() {
      console.log('🔍 Starting Technical SEO Audit...');
      
      this.auditMetaTags();
      this.auditHeadingStructure();
      this.auditImages();
      this.auditInternalLinks();
      this.auditPageSpeed();
      this.auditMobileOptimization();
      this.auditStructuredData();
      this.auditCanonicalTags();
      this.auditSocialTags();
      this.auditSecurityHeaders();
      this.auditContentQuality();
      this.auditCoreWebVitals();
      
      await this.generateReport();
      this.implementFixes();
      
      console.log(`✅ Technical SEO Audit Complete. Score: ${this.score}/100`);
      return {
        score: this.score,
        issues: this.issues,
        fixes: this.fixes
      };
    }

    auditMetaTags() {
      const title = document.querySelector('title');
      const description = document.querySelector('meta[name="description"]');
      const keywords = document.querySelector('meta[name="keywords"]');
      const viewport = document.querySelector('meta[name="viewport"]');
      const charset = document.querySelector('meta[charset]');

      // Title tag audit
      if (!title || !title.textContent.trim()) {
        this.addIssue('Missing title tag', 'critical');
        this.addFix('Add title tag with primary keyword');
      } else if (title.textContent.length > TECHNICAL_SEO_CONFIG.maxTitleLength) {
        this.addIssue('Title tag too long', 'warning');
        this.addFix('Shorten title tag to under 60 characters');
      } else if (!title.textContent.toLowerCase().includes(TECHNICAL_SEO_CONFIG.primaryKeyword)) {
        this.addIssue('Title missing primary keyword', 'warning');
        this.addFix('Include primary keyword in title tag');
      }

      // Meta description audit
      if (!description || !description.content.trim()) {
        this.addIssue('Missing meta description', 'critical');
        this.addFix('Add compelling meta description with primary keyword');
      } else if (description.content.length > TECHNICAL_SEO_CONFIG.maxDescriptionLength) {
        this.addIssue('Meta description too long', 'warning');
        this.addFix('Shorten meta description to under 160 characters');
      }

      // Essential meta tags
      if (!viewport) {
        this.addIssue('Missing viewport meta tag', 'critical');
        this.addFix('Add viewport meta tag for mobile optimization');
      }

      if (!charset) {
        this.addIssue('Missing charset declaration', 'warning');
        this.addFix('Add UTF-8 charset declaration');
      }
    }

    auditHeadingStructure() {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const h1Tags = document.querySelectorAll('h1');

      if (h1Tags.length === 0) {
        this.addIssue('Missing H1 tag', 'critical');
        this.addFix('Add H1 tag with primary keyword');
      } else if (h1Tags.length > 1) {
        this.addIssue('Multiple H1 tags found', 'warning');
        this.addFix('Use only one H1 tag per page');
      }

      // Check heading hierarchy
      let previousLevel = 0;
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > previousLevel + 1 && previousLevel !== 0) {
          this.addIssue('Broken heading hierarchy', 'warning');
          this.addFix('Fix heading hierarchy (don\'t skip levels)');
        }
        previousLevel = level;
      });

      // Check for empty headings
      headings.forEach(heading => {
        if (!heading.textContent.trim()) {
          this.addIssue('Empty heading tag found', 'warning');
          this.addFix('Add descriptive text to all heading tags');
        }
      });
    }

    auditImages() {
      const images = document.querySelectorAll('img');
      let missingAlt = 0;
      let missingTitle = 0;
      let oversizedImages = 0;

      images.forEach(img => {
        // Alt text audit
        if (!img.alt || img.alt.trim() === '') {
          missingAlt++;
        }

        // Title attribute audit
        if (!img.title || img.title.trim() === '') {
          missingTitle++;
        }

        // Image size audit
        if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
          oversizedImages++;
        }

        // Lazy loading audit
        if (!img.loading || img.loading !== 'lazy') {
          img.loading = 'lazy';
        }
      });

      if (missingAlt > 0) {
        this.addIssue(`${missingAlt} images missing alt text`, 'critical');
        this.addFix('Add descriptive alt text to all images');
      }

      if (missingTitle > 0) {
        this.addIssue(`${missingTitle} images missing title attribute`, 'warning');
        this.addFix('Add title attributes to images for better SEO');
      }

      if (oversizedImages > 0) {
        this.addIssue(`${oversizedImages} oversized images found`, 'warning');
        this.addFix('Optimize image sizes for faster loading');
      }
    }

    auditInternalLinks() {
      const links = document.querySelectorAll('a[href]');
      let internalLinks = 0;
      let externalLinks = 0;
      let brokenLinks = 0;
      let noFollowLinks = 0;

      links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#') || href.startsWith('/') || href.includes(TECHNICAL_SEO_CONFIG.domain)) {
          internalLinks++;
          
          // Check for missing title attributes on internal links
          if (!link.title) {
            link.title = link.textContent.trim() || 'Internal link';
          }
        } else if (href.startsWith('http')) {
          externalLinks++;
          
          // Add rel="noopener" to external links for security
          if (!link.rel || !link.rel.includes('noopener')) {
            link.rel = (link.rel || '') + ' noopener';
          }
        }

        // Check for rel="nofollow"
        if (link.rel && link.rel.includes('nofollow')) {
          noFollowLinks++;
        }

        // Check for empty link text
        if (!link.textContent.trim() && !link.querySelector('img')) {
          this.addIssue('Empty link text found', 'warning');
          this.addFix('Add descriptive text to all links');
        }
      });

      if (internalLinks < 3) {
        this.addIssue('Insufficient internal linking', 'warning');
        this.addFix('Add more internal links to improve site structure');
      }
    }

    auditPageSpeed() {
      // Check for render-blocking resources
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');

      if (scripts.length > 0) {
        this.addIssue('Render-blocking JavaScript found', 'warning');
        this.addFix('Add async or defer attributes to non-critical scripts');
      }

      // Check for missing resource hints
      const dnsPreconnect = document.querySelector('link[rel="preconnect"]');
      const dnsPrefetch = document.querySelector('link[rel="dns-prefetch"]');

      if (!dnsPreconnect && !dnsPrefetch) {
        this.addIssue('Missing resource hints', 'info');
        this.addFix('Add DNS prefetch and preconnect hints');
      }

      // Performance timing audit
      if ('performance' in window && 'timing' in performance) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        if (loadTime > TECHNICAL_SEO_CONFIG.targetLoadTime) {
          this.addIssue(`Page load time: ${loadTime}ms (target: ${TECHNICAL_SEO_CONFIG.targetLoadTime}ms)`, 'warning');
          this.addFix('Optimize page load speed');
        }
      }
    }

    auditMobileOptimization() {
      const viewport = document.querySelector('meta[name="viewport"]');
      
      if (!viewport || !viewport.content.includes('width=device-width')) {
        this.addIssue('Not mobile-optimized', 'critical');
        this.addFix('Add proper viewport meta tag');
      }

      // Check for mobile-friendly font sizes
      const smallText = document.querySelectorAll('*');
      let smallFontCount = 0;
      
      smallText.forEach(element => {
        const fontSize = window.getComputedStyle(element).fontSize;
        if (fontSize && parseInt(fontSize) < 12) {
          smallFontCount++;
        }
      });

      if (smallFontCount > 0) {
        this.addIssue(`${smallFontCount} elements with small font size`, 'warning');
        this.addFix('Increase font sizes for better mobile readability');
      }
    }

    auditStructuredData() {
      const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
      
      if (jsonLdScripts.length === 0) {
        this.addIssue('No structured data found', 'warning');
        this.addFix('Add JSON-LD structured data');
      } else {
        // Validate JSON-LD syntax
        jsonLdScripts.forEach(script => {
          try {
            JSON.parse(script.textContent);
          } catch (e) {
            this.addIssue('Invalid JSON-LD syntax', 'critical');
            this.addFix('Fix JSON-LD syntax errors');
          }
        });
      }
    }

    auditCanonicalTags() {
      const canonical = document.querySelector('link[rel="canonical"]');
      
      if (!canonical) {
        this.addIssue('Missing canonical tag', 'warning');
        this.addFix('Add canonical tag to prevent duplicate content');
      } else if (!canonical.href.startsWith('https://')) {
        this.addIssue('Canonical URL not using HTTPS', 'warning');
        this.addFix('Update canonical URL to use HTTPS');
      }
    }

    auditSocialTags() {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const twitterCard = document.querySelector('meta[name="twitter:card"]');

      if (!ogTitle) {
        this.addIssue('Missing Open Graph title', 'info');
        this.addFix('Add Open Graph meta tags');
      }

      if (!ogDescription) {
        this.addIssue('Missing Open Graph description', 'info');
        this.addFix('Add Open Graph description');
      }

      if (!ogImage) {
        this.addIssue('Missing Open Graph image', 'info');
        this.addFix('Add Open Graph image');
      }

      if (!twitterCard) {
        this.addIssue('Missing Twitter Card', 'info');
        this.addFix('Add Twitter Card meta tags');
      }
    }

    auditSecurityHeaders() {
      // Check for HTTPS
      if (location.protocol !== 'https:') {
        this.addIssue('Not using HTTPS', 'critical');
        this.addFix('Implement HTTPS with SSL certificate');
      }

      // Check for security-related meta tags
      const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (!csp) {
        this.addIssue('Missing Content Security Policy', 'info');
        this.addFix('Add Content Security Policy header');
      }
    }

    auditContentQuality() {
      const textContent = document.body.textContent || '';
      const wordCount = textContent.trim().split(/\s+/).length;

      if (wordCount < TECHNICAL_SEO_CONFIG.minContentLength) {
        this.addIssue(`Insufficient content: ${wordCount} words (minimum: ${TECHNICAL_SEO_CONFIG.minContentLength})`, 'warning');
        this.addFix('Add more high-quality, relevant content');
      }

      // Check keyword density
      const keywordCount = (textContent.toLowerCase().match(new RegExp(TECHNICAL_SEO_CONFIG.primaryKeyword, 'g')) || []).length;
      const keywordDensity = (keywordCount / wordCount) * 100;

      if (keywordDensity < 0.5) {
        this.addIssue(`Low keyword density: ${keywordDensity.toFixed(2)}%`, 'info');
        this.addFix('Increase primary keyword usage naturally');
      } else if (keywordDensity > 3) {
        this.addIssue(`High keyword density: ${keywordDensity.toFixed(2)}%`, 'warning');
        this.addFix('Reduce keyword stuffing');
      }
    }

    auditCoreWebVitals() {
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry.startTime > 2500) {
            this.addIssue(`Poor LCP: ${lastEntry.startTime.toFixed(0)}ms`, 'warning');
            this.addFix('Optimize Largest Contentful Paint');
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift (CLS)
        new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          if (clsValue > 0.1) {
            this.addIssue(`Poor CLS: ${clsValue.toFixed(3)}`, 'warning');
            this.addFix('Reduce Cumulative Layout Shift');
          }
        }).observe({ entryTypes: ['layout-shift'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.processingStart - entry.startTime > 100) {
              this.addIssue(`Poor FID: ${(entry.processingStart - entry.startTime).toFixed(0)}ms`, 'warning');
              this.addFix('Optimize First Input Delay');
            }
          }
        }).observe({ entryTypes: ['first-input'] });
      }
    }

    addIssue(message, severity) {
      this.issues.push({ message, severity, timestamp: new Date().toISOString() });
      
      // Deduct points based on severity
      switch (severity) {
        case 'critical':
          this.score -= 15;
          break;
        case 'warning':
          this.score -= 5;
          break;
        case 'info':
          this.score -= 1;
          break;
      }
      
      this.score = Math.max(0, this.score);
    }

    addFix(description) {
      this.fixes.push({ description, timestamp: new Date().toISOString() });
    }

    async generateReport() {
      const report = {
        domain: TECHNICAL_SEO_CONFIG.domain,
        auditDate: new Date().toISOString(),
        score: this.score,
        grade: this.getGrade(),
        issues: this.issues,
        fixes: this.fixes,
        recommendations: this.getRecommendations()
      };

      // Store report in localStorage for debugging
      localStorage.setItem('technicalSEOReport', JSON.stringify(report, null, 2));
      
      console.log('📊 Technical SEO Report:', report);
      return report;
    }

    getGrade() {
      if (this.score >= 90) return 'A+';
      if (this.score >= 80) return 'A';
      if (this.score >= 70) return 'B';
      if (this.score >= 60) return 'C';
      if (this.score >= 50) return 'D';
      return 'F';
    }

    getRecommendations() {
      const recommendations = [];
      
      if (this.score < 70) {
        recommendations.push('Focus on fixing critical issues first');
        recommendations.push('Implement proper meta tags and heading structure');
        recommendations.push('Optimize images and page speed');
      }
      
      if (this.score < 85) {
        recommendations.push('Add more structured data markup');
        recommendations.push('Improve internal linking strategy');
        recommendations.push('Enhance mobile optimization');
      }
      
      recommendations.push('Monitor Core Web Vitals regularly');
      recommendations.push('Keep content fresh and relevant');
      recommendations.push('Build high-quality backlinks');
      
      return recommendations;
    }

    implementFixes() {
      // Auto-implement some basic fixes
      this.fixMissingAltText();
      this.fixLazyLoading();
      this.fixExternalLinks();
      this.addMissingMetaTags();
    }

    fixMissingAltText() {
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach((img, index) => {
        img.alt = `POSSPOLE MEDTECH healthcare technology image ${index + 1}`;
      });
    }

    fixLazyLoading() {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        img.loading = 'lazy';
      });
    }

    fixExternalLinks() {
      const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + TECHNICAL_SEO_CONFIG.domain + '"])');
      externalLinks.forEach(link => {
        if (!link.rel || !link.rel.includes('noopener')) {
          link.rel = (link.rel || '') + ' noopener';
        }
      });
    }

    addMissingMetaTags() {
      // Add missing robots meta if not present
      if (!document.querySelector('meta[name="robots"]')) {
        const robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        robotsMeta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
        document.head.appendChild(robotsMeta);
      }

      // Add missing author meta if not present
      if (!document.querySelector('meta[name="author"]')) {
        const authorMeta = document.createElement('meta');
        authorMeta.name = 'author';
        authorMeta.content = 'POSSPOLE MEDTECH';
        document.head.appendChild(authorMeta);
      }
    }
  }

  // Initialize Technical SEO Audit
  function initTechnicalSEOAudit() {
    const auditor = new TechnicalSEOAuditor();
    
    // Run audit after page load
    if (document.readyState === 'complete') {
      setTimeout(() => auditor.runAudit(), 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => auditor.runAudit(), 1000);
      });
    }

    // Track audit completion
    if (window.gtag) {
      gtag('event', 'technical_seo_audit_complete', {
        event_category: 'SEO',
        event_label: 'POSSPOLE MEDTECH',
        value: 1
      });
    }
  }

  // Start the audit
  initTechnicalSEOAudit();

})();