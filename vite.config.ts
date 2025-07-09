import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src')
    }
  },
  build: {
    // Enable source maps for better debugging in development
    sourcemap: process?.env?.NODE_ENV === 'development',
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // Animation libraries
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'animations';
          }
          // 3D and UI libraries
          if (id.includes('@react-three') || id.includes('three') || id.includes('lucide-react')) {
            return 'ui-3d';
          }
          // SEO and utilities
          if (id.includes('react-helmet') || id.includes('clsx') || id.includes('tailwind')) {
            return 'utilities';
          }
          // Lottie animations
          if (id.includes('@lottiefiles') || id.includes('lottie')) {
            return 'lottie';
          }
          // Node modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Optimize for production
    minify: 'esbuild', // Use esbuild for faster builds
    target: 'esnext',
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096 // Inline assets smaller than 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion', 
      'gsap',
      'gsap/ScrollTrigger',
      'react-helmet-async',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@lottiefiles/dotlottie-react',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    // Force optimization of these packages
    force: true
  },
  // Server configuration for development
  server: {
    port: 3000,
    host: true, // Allow external connections
    open: true,
    cors: true
  },
  // Preview configuration
  preview: {
    port: 4173,
    host: true,
    open: true
  },
  // Define global constants
  define: {
    __DEV__: JSON.stringify(process?.env?.NODE_ENV === 'development')
  }
});