import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import posspoleLogo from '/assets/posspolelogbg.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#mission-vision' },
    { label: 'Solutions', href: '#benefits' },
    { label: 'Services', href: '#solutions' },
    { label: 'Products', href: '#services-products' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-neutral-200/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="container mx-auto px-6 py-4 md:py-5 md:px-12">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#hero" 
            className="flex items-center gap-3 text-2xl font-display font-bold text-neutral-900"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src={posspoleLogo} 
              alt="Posspole Medtech Logo" 
              className="w-60 h-30 object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-black hover:text-primary-700 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all hover:after:w-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-7 rounded-xl font-medium transition-all shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 hover:translate-y-0.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Tablet/Mobile Navigation Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-neutral-900 z-50 p-3 hover:bg-primary-500/20 rounded-xl transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.button>
        </div>

        {/* Tablet/Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Sliding Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <h3 className="text-xl font-bold text-neutral-900">Menu</h3>
                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={24} className="text-neutral-600" />
                    </motion.button>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="flex-1 px-6 py-4 overflow-y-auto">
                    <div className="space-y-2">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <a
                            href={link.href}
                            className="flex items-center text-lg font-medium text-neutral-700 hover:text-primary-700 hover:bg-primary-50 py-3 px-4 rounded-lg transition-all group"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-primary-100 text-primary-700 text-sm group-hover:bg-primary-200 transition-colors">
                              {index + 1}
                            </span>
                            {link.label}
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer CTA */}
                  <div className="p-6 border-t border-neutral-200">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <a
                        href="#contact"
                        className="block bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl text-center font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Get Started
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};