import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe } from 'lucide-react';

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
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, companyLogo, companyLogoImage, category, shortDescription, gradientColors, delay }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group relative h-80 w-full cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className={`relative h-full w-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side - Gradient Background */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ background: gradientColors }}>
            <div className="absolute top-4 left-4">
              <div className="w-28 h-28 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center p-2 shadow-xl border border-white/30 mb-4">
                <img 
                  src={companyLogoImage} 
                  alt={companyLogo}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <Globe className="w-16 h-16 text-gray-600 hidden" />
              </div>
              <div className="text-left max-w-xs">
                <h4 className="text-xl font-black text-white/100 mb-2 tracking-wide">{companyLogo}</h4>
                <p className="text-sm text-white/95 italic mb-2">{category}</p>
                <p className="text-xs text-white/85 leading-relaxed">{shortDescription}</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              {/* <h3 className="text-xl font-bold mb-2">{title}</h3> */}
            </div>
          </div>
        </div>

        {/* Back Side - Company Details */}
         <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="h-full w-full rounded-xl bg-gradient-to-br from-white via-gray-50 to-white p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col backdrop-blur-sm">
               {/* Logo at top left and company name at top right */}
               <div className="flex items-start justify-between mb-4">
                 <div className="w-14 h-14 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center p-2 overflow-hidden">
                   <img 
                     src={companyLogoImage} 
                     alt={companyLogo}
                     className="w-full h-full object-contain"
                     onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.style.display = 'none';
                       target.nextElementSibling?.classList.remove('hidden');
                     }}
                   />
                   <Globe className="w-8 h-8 text-blue-600 hidden" />
                 </div>
                 <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 text-sm font-semibold rounded-xl shadow-sm">
                   {companyLogo}
                 </div>
               </div>
              
              {/* Spacing */}
              <div className="mb-4"></div>
              
              {/* Title */}
              <h4 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight">
                {title}
              </h4>
              
              {/* Spacing */}
              <div className="mb-3"></div>
              
              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed flex-grow font-medium">
                {description}
              </p>
              

            </div>
          </div>
      </div>
    </motion.div>
  );
};

export const ServicesProductsSection = () => {
  const products = [
    {
      title: "Navigation and Imaging of Cancer",
      description: "In collaboration with Navigation Sciences, POSSPOLE brings advanced cancer detection and precision removal technology to India, making early diagnosis and treatment more accessible.",
      companyLogo: "Navigation Sciences",
      companyLogoImage: navigationScienceLogo,
      category: "Medical Imaging",
      shortDescription: "Advanced cancer detection and precision removal technology",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.1,
    },
    {
      title: "Cervical Cancer Screening Kit",
      description: "In collaboration with IOTA,  POSSPOLE is advancing MStrip—a non-invasive cervical cancer screening strip attached to sanitary napkins—expanding access through medical networks and digital outreach.",
      companyLogo: "POSSPOLE",
      companyLogoImage: posspoleLogo,
      category: "Cancer Screening",
      shortDescription: "Non-invasive cervical cancer screening technology",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.2,
    },
    {
      title: "Human Token",
      description: "In collaboration with Deep Holistics,  POSSPOLE brings Human Token—an advanced genomic analysis service offering personalized health insights and dedicated doctor support—to those seeking optimized wellness.",
      companyLogo: "Deep Holistics",
      companyLogoImage: deepHolisticsLogo,
      category: "Genomic Analysis",
      shortDescription: "Personalized health insights through genomic analysis",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.3,
    },
    {
      title: "AI Steth",
      description: "Aisteth is an AI-powered smart stethoscope that enhances diagnostics by accurately detecting and predicting cardio-respiratory conditions for earlier, more precise care.",
      companyLogo: "AiSteth",
      companyLogoImage: aistethLogo,
      category: "AI Diagnostics",
      shortDescription: "AI-powered smart stethoscope for enhanced diagnostics",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.4,
    },
    {
      title: "MayaMD",
      description: "MayaMD is an AI-powered digital health assistant that streamlines care with symptom checking, triage, and clinical support—boosting efficiency, reducing ER visits, and enhancing patient engagement.",
      companyLogo: "MayaMD",
      companyLogoImage: mayamdLogo,
      category: "Digital Health",
      shortDescription: "AI-powered digital health assistant for streamlined care",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.5,
    },
    {
      title: "Manentia.ai",
      description: "Manentia.ai is an AI-powered imaging platform that detects critical conditions like cancer and strokes with precision, offering predictive analytics and seamless hospital integration for faster, more accurate diagnostics.",
      companyLogo: "Manentia.ai",
      companyLogoImage: manentiaLogo,
      category: "AI Imaging",
      shortDescription: "AI-powered imaging platform for critical condition detection",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.6,
    },
    {
      title: "3D Bioprinting",
      description: "POSSPOLE is advancing 3D bioprinting technology that creates living tissues for drug testing, personalized medicine, and future organ transplantation.",
      companyLogo: "PossPole",
      companyLogoImage: posspoleLogo,
      category: "Bioprinting",
      shortDescription: "3D bioprinting technology for living tissue creation",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.7,
    },
    {
      title: "AUM Voice Prosthesis",
      description: "AUM Voice Prosthesis is an innovative, one-size-fits-all solution combining traditional craftsmanship and advanced surgical tools with a robust support ecosystem to make voice restoration more accessible and inclusive.",
      companyLogo: "AUM",
      companyLogoImage: aumLogo,
      category: "Voice Restoration",
      shortDescription: "Innovative voice prosthesis for accessible restoration",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.8,
    },
    {
      title: "Advanced Wheelchair",
      description: "Ostrich Elan's next-gen wheelchair offers stair-climbing, 30 kmph speed, and portability—redefining mobility and independence for people with disabilities.",
      companyLogo: "Ostrich Elan",
      companyLogoImage: ostrichLogo,
      category: "Mobility Solutions",
      shortDescription: "Next-gen wheelchair with stair-climbing capabilities",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 0.9,
    },
    {
      title: "CotWheel Chair",
      description: "The Cotwheel Chair is a remote-controlled wheelchair-to-cot device that enhances comfort and independence for individuals with limited mobility in care or home settings.",
      companyLogo: "PossPole",
      companyLogoImage: posspoleLogo,
      category: "Assistive Technology",
      shortDescription: "Remote-controlled wheelchair-to-cot transformation device",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 1.0,
    },
    {
      title: "Ventlyff",
      description: "Ventlyff is an AI-powered ventilator that personalizes respiratory support in real time, optimizing critical care for ICU and emergency patients.",
      companyLogo: "PossPole",
      companyLogoImage: posspoleLogo,
      category: "Critical Care",
      shortDescription: "AI-powered ventilator for personalized respiratory support",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 1.1,
    },
    {
      title: "Longevity",
      description: "In collaboration with Decode Age,  POSSPOLE offers personalized health supplements that promote longevity, reduce aging effects, and enhance overall vitality.",
      companyLogo: "Decode Age",
      companyLogoImage: decodeageLogo,
      category: "Longevity & Wellness",
      shortDescription: "Personalized health supplements for longevity and vitality",
      gradientColors: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      delay: 1.2,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title.toUpperCase()}
              description={product.description}
              companyLogo={product.companyLogo}
              companyLogoImage={product.companyLogoImage}
              category={product.category}
              shortDescription={product.shortDescription}
              gradientColors={product.gradientColors}
              delay={product.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};