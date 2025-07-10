import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import posspoleLogo from '/assets/posspolelogbg.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

 

  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} className="text-primary-400" />,
      content: <a href="mailto:letmein@posspole.com" className="hover:text-white transition-colors">letmein@posspole.com</a>
    },
    {
      icon: <Phone size={16} className="text-primary-400" />,
      content: <a href="tel:+918618145049" className="hover:text-white transition-colors">(+91)86181-45049</a>
    },
    {
      icon: <MapPin size={16} className="text-primary-400" />,
      content: <span>Krishi Bhavana, Hudson Circle, Bangalore - 560 002</span>
    }
  ];

  return (
    <footer className="bg-neutral-800 pt-16 pb-8 px-6 md:px-12 text-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Row 1: Logo and Description */}
        <div className="flex flex-wrap gap-12">
          <div className="w-full lg:w-1/2">
            <a href="#hero" className="flex items-center gap-3 text-2xl font-display font-bold text-white mb-4">
              <img 
                src={posspoleLogo} 
                alt="Posspole Medtech" 
                className="w-60 h-30 object-contain invert"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </a>
            <p className="text-neutral-400 mb-6 max-w-md">
              Advancing healthcare through innovative medical technology solutions and cutting-edge diagnostic tools.
            </p>
          </div>

          {/* Row 2: Contact Info and Links */}
          <div className="w-full lg:w-1/4">
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-neutral-300">
                  {item.icon}
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Copyright and Social Links */}
        <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-neutral-500 text-sm">
            © {currentYear} Posspole Medtech. All rights reserved.
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -3 }}
                aria-label={link.label}
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary-500 transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};