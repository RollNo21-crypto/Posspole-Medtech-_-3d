import React, { Suspense, lazy } from 'react';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollProgressIndicator } from './components/ui/ScrollProgressIndicator';
import { Navbar } from './components/layout/Navbar';
import { FloatingActionButton } from './components/ui/FloatingActionButton';
import { HeroSection } from './components/sections/HeroSection';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { SEOHead } from './components/SEO/SEOHead';
import { useScrollTriggerBatch } from './hooks/useOptimizedGSAP';

// Lazy load non-critical components
const MissionVisionSection = lazy(() => import('./components/sections/MissionVisionSection').then(module => ({ default: module.MissionVisionSection })));
const SolutionsSection = lazy(() => import('./components/sections/SolutionsSection').then(module => ({ default: module.SolutionsSection })));
const BenefitsSection = lazy(() => import('./components/sections/BenefitsSection').then(module => ({ default: module.BenefitsSection })));
const ServicesProductsSection = lazy(() => import('./components/sections/ServicesProductsSection').then(module => ({ default: module.ServicesProductsSection })));
const PartnersSection = lazy(() => import('./components/sections/PartnersSection').then(module => ({ default: module.PartnersSection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(module => ({ default: module.ContactSection })));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Use optimized scroll trigger batch for better performance
  useScrollTriggerBatch();

  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      const criticalImages = [
        '/assets/posspole.png',
        '/assets/aum logo.jpg'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    preloadResources();
  }, []);

  return (
    <HelmetProvider>
      <SEOHead />
      <div className="relative overflow-hidden">
        <Preloader minLoadingTime={1000} forceDisplay={true} onLoadingComplete={() => setIsLoading(false)} />
        {!isLoading && (
          <>
            <CustomCursor />
            <ScrollProgressIndicator />
            <Navbar />
            <main>
              <HeroSection />
              <Suspense fallback={<SectionLoader />}>
                <MissionVisionSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <BenefitsSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <PartnersSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ServicesProductsSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <SolutionsSection />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <ContactSection />
              </Suspense>
            </main>
            <FloatingActionButton />
            <Footer />
          </>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;