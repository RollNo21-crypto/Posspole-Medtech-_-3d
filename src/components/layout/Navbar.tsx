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

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#mission-vision' },
    { label: 'Solutions', href: '#benefits' },
    { label: 'Services', href: '#solutions' },
    { label: 'Products', href: '#services-products' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-neutral-200/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-6 py-4 md:py-5 md:px-12 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center gap-3 text-2xl font-display font-bold text-neutral-900"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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

            {/* Desktop Nav */}
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

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-neutral-900 z-[60] p-3 hover:bg-primary-500/20 rounded-xl transition-colors relative"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X size={26} className="text-black" />
              ) : (
                <Menu size={26} className="text-neutral-900" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay (outside header) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-screen h-screen z-[500] bg-white overflow-y-auto px-6 py-6"
          >
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-neutral-100 transition"
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-black" />
              </motion.button>
            </div>

            {/* Logo + Brand */}
            <div className="flex items-center gap-4 mb-8">
              <div>
              <img
                src={posspoleLogo}
                alt="Posspole Medtech"
                className="w-60 h-30 object-contain rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              
            </div>
            {/* <div className="mt-2">
                <p className="text-sm text-neutral-500">Healthcare Innovation</p>
            </div> */}
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-neutral-100 hover:bg-primary-100 text-neutral-800 font-medium transition-all"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
