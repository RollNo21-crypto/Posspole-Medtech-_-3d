import React from 'react';
import { motion } from 'framer-motion';

// Import partner logos
import partner1 from '/assetpartners/1.png';
import partner2 from '/assetpartners/2.png';
import partner3 from '/assetpartners/3.png';
import partner4 from '/assetpartners/4.png';
import partner5 from '/assetpartners/5.png';
import partner6 from '/assetpartners/6.png';
import partner7 from '/assetpartners/7.png';
import partner8 from '/assetpartners/8.png';
import partner9 from '/assetpartners/9.png';
import partner10 from '/assetpartners/10.png';
import partner11 from '/assetpartners/11.png';
import partner12 from '/assetpartners/12.png';
import partner13 from '/assetpartners/13.png';
import partner14 from '/assetpartners/14.png';
import partner15 from '/assetpartners/15.png';
import partner16 from '/assetpartners/16.png';

// Partner logo component
const PartnerLogo: React.FC<{ name: string; logo: string }> = ({ name, logo }) => {
  return (
    <div className="flex items-center justify-center px-4 py-4">
      <div className="bg-white rounded-xl p-4 h-20 w-40 flex items-center justify-center group transition-all duration-300 hover:bg-neutral-100 hover:shadow-md border border-neutral-200">
        <img 
          src={logo} 
          alt={name} 
          className="max-h-70 max-w-48 object-contain transition-all duration-300 group-hover:scale-115"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
};

// Continuous scrolling marquee component
const InfiniteMarquee: React.FC<{ direction?: 'left' | 'right'; speed?: number; children: React.ReactNode }> = ({ 
  direction = 'left', 
  speed = 40, 
  children 
}) => {
  const marqueeVariants = {
    animate: {
      x: direction === 'left' ? [0, -1920] : [-1920, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 1920 / speed,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        {children}
        {children} {/* Duplicate to ensure continuous scrolling */}
      </motion.div>
    </div>
  );
};

export const PartnersSection = () => {
  const partners = [
    {name:"Partner 1",logo:partner1},
    { name: "Partner 2", logo: partner2 },
    { name: "Partner 3", logo: partner3 },
    { name: "Partner 4", logo: partner4 },
    { name: "Partner 5", logo: partner5 },
    { name: "Partner 6", logo: partner6 },
    { name: "Partner 7", logo: partner7 },
    { name: "Partner 8", logo: partner8 },
    { name: "Partner 9", logo: partner9 },
    { name: "Partner 10", logo: partner10 },
    { name: "Partner 11", logo: partner11 },
    { name: "Partner 12", logo: partner12 },
    { name: "Partner 13", logo: partner13 },
    { name: "Partner 14", logo: partner14 },
    { name: "Partner 15", logo: partner15 },
    { name: "Partner 16", logo: partner16 },
  ];

  return (
    <section id="partners" className="py-16 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white opacity-80"></div>
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%236d28d9\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-20 mb-8">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-on-scroll">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-100 border border-primary-200 rounded-full text-primary-700 inline-block mb-4 hover:bg-primary-200 transition-colors duration-300"
          >
            Trusted By
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6"
          >
            Our Partners
          </motion.h2>
        </div>
      </div>

      <div className="relative z-20 py-4 ">
        <InfiniteMarquee speed={30}>
          {partners.map((partner, index) => (
            <PartnerLogo key={index} name={partner.name} logo={partner.logo} />
          ))}
        </InfiniteMarquee>
      </div>

      <div className="relative z-20 py-4 mt-4">
        <InfiniteMarquee direction="right" speed={20}>
          {[...partners].reverse().map((partner, index) => (
            <PartnerLogo key={index} name={partner.name} logo={partner.logo} />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};