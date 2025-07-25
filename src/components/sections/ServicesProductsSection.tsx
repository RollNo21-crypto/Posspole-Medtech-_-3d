import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, X, ExternalLink } from 'lucide-react';

// Import company logos
import navigationScienceLogo from '/assets/navigation science.png';
import deepHolisticsLogo from '/assets/deep holistics.jpg';
import aistethLogo from '/assets/aisteth.png';
import mayamdLogo from '/assets/mayamd.png';
import manentiaLogo from '/assets/manentia_ai_logo.jpeg';
import aumLogo from '/assets/aum logo.jpg';
import ostrichLogo from '/assets/ostrichlogo.jpeg';
import decodeageLogo from '/assets/decodeage logo.jpeg';
import posspoleLogo from '/assets/posspole.png';

interface ProductCardProps {
  title: string;
  description: string;
  companyLogo: string;
  companyLogoImage: string;
  category: string;
  shortDescription: string;
  gradientColors: string;
  delay: number;
  onKnowMore: () => void;
}

interface ProductModalProps {
  product: {
    title: string;
    description: string;
    companyLogo: string;
    companyLogoImage: string;
    category: string;
    shortDescription: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 bg-white rounded-2xl shadow-2xl z-[100000] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Modal Content */}
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg">
                    <img 
                      src={product.companyLogoImage} 
                      alt={product.companyLogo}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <Globe className="w-10 h-10 text-gray-600 hidden" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">{product.companyLogo}</span>
                      <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">{product.category}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                      <img 
                        src={product.companyLogoImage} 
                        alt={product.companyLogo}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <Globe className="w-6 h-6 text-gray-600 hidden" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.companyLogo}</p>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ title, description, companyLogo, companyLogoImage, category, shortDescription, gradientColors, delay, onKnowMore }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '50px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.3, delay: delay * 0.05 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Card Content */}
      <div className="p-6 text-center">
        {/* Logo - Centered */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
            <img 
              src={companyLogoImage} 
              alt={companyLogo}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <Globe className="w-12 h-12 text-purple-600 hidden" />
          </div>
        </div>
        
        {/* Company Name - Below Logo */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{companyLogo}</h3>
        
        {/* Category */}
        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full mb-4">
          {category}
        </span>
        
        {/* Short Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {shortDescription}
        </p>
        
        {/* Know More Button */}
        <button
          onClick={onKnowMore}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Know More
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export const ServicesProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<{
    title: string;
    description: string;
    companyLogo: string;
    companyLogoImage: string;
    category: string;
    shortDescription: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKnowMore = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const products = [
    {
      title: "Navigation and Imaging of Cancer",
      description: "In collaboration with Navigation Sciences, POSSPOLE brings advanced cancer detection and precision removal technology to India, making early diagnosis and treatment more accessible.",
      companyLogo: "Navigation Sciences",
      companyLogoImage: navigationScienceLogo,
      category: "Medical Imaging",
      shortDescription: "Advanced cancer detection and precision removal technology",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 1,
    },
    {
      title: "Cervical Cancer Screening Kit",
      description: "In collaboration with IOTA,  POSSPOLE is advancing MStrip—a non-invasive cervical cancer screening strip attached to sanitary napkins—expanding access through medical networks and digital outreach.",
      companyLogo: "POSSPOLE MedTech",
      companyLogoImage: posspoleLogo,
      category: "Cancer Screening",
      shortDescription: "Non-invasive cervical cancer screening technology",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 2,
    },
    {
      title: "Human Token",
      description: "In collaboration with Deep Holistics,  POSSPOLE brings Human Token—an advanced genomic analysis service offering personalized health insights and dedicated doctor support—to those seeking optimized wellness.",
      companyLogo: "Deep Holistics",
      companyLogoImage: deepHolisticsLogo,
      category: "Genomic Analysis",
      shortDescription: "Personalized health insights through genomic analysis",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 3,
    },
    {
      title: "AI Steth",
      description: "Aisteth is an AI-powered smart stethoscope that enhances diagnostics by accurately detecting and predicting cardio-respiratory conditions for earlier, more precise care.",
      companyLogo: "AiSteth",
      companyLogoImage: aistethLogo,
      category: "AI Diagnostics",
      shortDescription: "AI-powered smart stethoscope for enhanced diagnostics",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 4,
    },
    {
      title: "MayaMD",
      description: "MayaMD is an AI-powered digital health assistant that streamlines care with symptom checking, triage, and clinical support—boosting efficiency, reducing ER visits, and enhancing patient engagement.",
      companyLogo: "MayaMD",
      companyLogoImage: mayamdLogo,
      category: "Digital Health",
      shortDescription: "AI-powered digital health assistant for streamlined care",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 5,
    },
    {
      title: "Manentia.ai",
      description: "Manentia.ai is an AI-powered imaging platform that detects critical conditions like cancer and strokes with precision, offering predictive analytics and seamless hospital integration for faster, more accurate diagnostics.",
      companyLogo: "Manentia.ai",
      companyLogoImage: manentiaLogo,
      category: "AI Imaging",
      shortDescription: "AI-powered imaging platform for critical condition detection",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 6,
    },
    {
      title: "3D Bioprinting",
      description: "POSSPOLE is advancing 3D bioprinting technology that creates living tissues for drug testing, personalized medicine, and future organ transplantation.",
      companyLogo: "POSSPOLE MedTech",
      companyLogoImage: posspoleLogo,
      category: "Bioprinting",
      shortDescription: "3D bioprinting technology for living tissue creation",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 7,
    },
    {
      title: "AUM Voice Prosthesis",
      description: "AUM Voice Prosthesis is an innovative, one-size-fits-all solution combining traditional craftsmanship and advanced surgical tools with a robust support ecosystem to make voice restoration more accessible and inclusive.",
      companyLogo: "AUM",
      companyLogoImage: aumLogo,
      category: "Voice Restoration",
      shortDescription: "Innovative voice prosthesis for accessible restoration",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 8,
    },
    {
      title: "Advanced Wheelchair",
      description: "Ostrich Elan's next-gen wheelchair offers stair-climbing, 30 kmph speed, and portability—redefining mobility and independence for people with disabilities.",
      companyLogo: "Ostrich Elan",
      companyLogoImage: ostrichLogo,
      category: "Mobility Solutions",
      shortDescription: "Next-gen wheelchair with stair-climbing capabilities",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 9,
    },
    {
      title: "CotWheel Chair",
      description: "The Cotwheel Chair is a remote-controlled wheelchair-to-cot device that enhances comfort and independence for individuals with limited mobility in care or home settings.",
      companyLogo: "POSSPOLE MedTech",
      companyLogoImage: posspoleLogo,
      category: "Assistive Technology",
      shortDescription: "Remote-controlled wheelchair-to-cot transformation device",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 10,
    },
    {
      title: "Ventlyff",
      description: "Ventlyff is an AI-powered ventilator that personalizes respiratory support in real time, optimizing critical care for ICU and emergency patients.",
      companyLogo: "POSSPOLE MedTech",
      companyLogoImage: posspoleLogo,
      category: "Critical Care",
      shortDescription: "AI-powered ventilator for personalized respiratory support",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 11,
    },
    {
      title: "Longevity",
      description: "In collaboration with Decode Age,  POSSPOLE offers personalized health supplements that promote longevity, reduce aging effects, and enhance overall vitality.",
      companyLogo: "Decode Age",
      companyLogoImage: decodeageLogo,
      category: "Longevity & Wellness",
      shortDescription: "Personalized health supplements for longevity and vitality",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 12,
    },
  ];

  return (
    <section id="services-products" className="py-20 md:py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white opacity-80"></div>
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%236d28d9\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'      
      }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-100 border border-primary-200 rounded-full text-primary-700 inline-block mb-4"
          >
             Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6"
          >
            Our Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-neutral-600 text-lg"
          >
            Our comprehensive suite of healthcare technology solutions designed to transform 
            patient care, streamline operations, and drive innovation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              companyLogo={product.companyLogo}
              companyLogoImage={product.companyLogoImage}
              category={product.category}
              shortDescription={product.shortDescription}
              gradientColors={product.gradientColors}
              delay={product.delay}
              onKnowMore={() => handleKnowMore(product)}
            />
          ))}
        </div>
        
        {/* Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
};