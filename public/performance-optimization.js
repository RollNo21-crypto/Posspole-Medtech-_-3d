// POSSPOLE MEDTECH - Performance Optimization for Killer SEO
// Core Web Vitals Enhancement Script

(function() {
  'use strict';
  
  // Critical Resource Hints
  function addResourceHints() {
    const head = document.head;
    
    // DNS Prefetch for external domains
    const dnsPrefetchDomains = [
      'googletagmanager.com',
      'analytics.google.com',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'stats.g.doubleclick.net'
    ];
    
    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      head.appendChild(link);
    });
    
    // Preconnect to critical domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    });
  }
  
  // Preload Critical Resources
  function preloadCriticalResources() {
    const head = document.head;
    
    // Preload critical CSS
    const criticalCSS = [
      '/src/index.css'
    ];
    
    criticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = function() { this.rel = 'stylesheet'; };
      head.appendChild(link);
    });
    
    // Preload critical images
    const criticalImages = [
      '/assets/posspole.png',
      '/assets/posspolelogbg.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      head.appendChild(link);
    });
  }
  
  // Lazy Loading Enhancement
  function enhanceLazyLoading() {
    // Native lazy loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
    
    // Intersection Observer for advanced lazy loading
    if ('IntersectionObserver' in window) {
      const lazyElements = document.querySelectorAll('[data-lazy]');
      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.removeAttribute('data-src');
            }
            if (element.dataset.srcset) {
              element.srcset = element.dataset.srcset;
              element.removeAttribute('data-srcset');
            }
            element.removeAttribute('data-lazy');
            lazyObserver.unobserve(element);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      lazyElements.forEach(element => {
        lazyObserver.observe(element);
      });
    }
  }
  
  // Core Web Vitals Optimization
  function optimizeCoreWebVitals() {
    // Largest Contentful Paint (LCP) optimization
    const lcpElements = document.querySelectorAll('img, video, [style*="background-image"]');
    lcpElements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.setAttribute('fetchpriority', 'high');
      }
    });
    
    // Cumulative Layout Shift (CLS) prevention
    const mediaElements = document.querySelectorAll('img, video, iframe');
    mediaElements.forEach(element => {
      if (!element.hasAttribute('width') || !element.hasAttribute('height')) {
        element.style.aspectRatio = '16/9'; // Default aspect ratio
      }
    });
    
    // First Input Delay (FID) optimization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Defer non-critical JavaScript
        const nonCriticalScripts = document.querySelectorAll('script[data-defer]');
        nonCriticalScripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.src = script.src;
          newScript.async = true;
          document.head.appendChild(newScript);
        });
      });
    }
  }
  
  // Service Worker Registration for Caching
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }
  
  // Critical CSS Inlining
  function inlineCriticalCSS() {
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .hero-section { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .logo { max-width: 200px; height: auto; }
      .loading { opacity: 0; transition: opacity 0.3s ease; }
      .loaded { opacity: 1; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }
  
  // Performance Monitoring
  function monitorPerformance() {
    if ('PerformanceObserver' in window) {
      // Monitor LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        // Send to analytics if needed
        if (window.gtag) {
          gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime),
            event_category: 'Performance'
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Monitor FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
          if (window.gtag) {
            gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Performance'
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      
      // Monitor CLS
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
        if (window.gtag) {
          gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Performance'
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  // Initialize all optimizations
  function initializeOptimizations() {
    // Run immediately
    inlineCriticalCSS();
    addResourceHints();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        enhanceLazyLoading();
        optimizeCoreWebVitals();
        monitorPerformance();
      });
    } else {
      preloadCriticalResources();
      enhanceLazyLoading();
      optimizeCoreWebVitals();
      monitorPerformance();
    }
    
    // Run when window is loaded
    window.addEventListener('load', () => {
      registerServiceWorker();
      
      // Mark page as loaded for CSS transitions
      document.body.classList.add('loaded');
      
      // Remove loading states
      const loadingElements = document.querySelectorAll('.loading');
      loadingElements.forEach(element => {
        element.classList.remove('loading');
        element.classList.add('loaded');
      });
    });
  }
  
  // Start optimization
  initializeOptimizations();
  
})();

// SEO Performance Tracking
window.POSSPOLE_SEO = {
  trackPageView: function(page) {
    if (window.gtag) {
      gtag('config', 'G-XWVFH7WPQG', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'dimension1': 'POSSPOLE MEDTECH',
          'dimension2': 'Healthcare Technology',
          'dimension3': 'Medical Innovation'
        }
      });
    }
  },
  
  trackEngagement: function(action, category) {
    if (window.gtag) {
      gtag('event', action, {
        event_category: category || 'Engagement',
        event_label: 'POSSPOLE MEDTECH',
        value: 1
      });
    }
  }
};

// Auto-track page view
if (document.readyState === 'complete') {
  window.POSSPOLE_SEO.trackPageView();
} else {
  window.addEventListener('load', () => {
    window.POSSPOLE_SEO.trackPageView();
  });
}