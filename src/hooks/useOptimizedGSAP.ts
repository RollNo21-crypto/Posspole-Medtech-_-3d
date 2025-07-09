import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
}

export const useOptimizedGSAP = () => {
  const animationsRef = useRef<gsap.core.Timeline[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Optimized fade in animation
  const fadeIn = (
    elements: string | HTMLElement | HTMLElement[],
    config: AnimationConfig = {}
  ) => {
    const {
      delay = 0,
      duration = 0.6,
      ease = 'power2.out',
      start = 'top 80%',
      toggleActions = 'play none none none',
      once = true
    } = config;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: config.trigger || elements,
        start,
        toggleActions,
        once
      }
    });

    tl.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        ease,
        delay,
        stagger: 0.1
      }
    );

    animationsRef.current.push(tl);
    if (tl.scrollTrigger) {
      scrollTriggersRef.current.push(tl.scrollTrigger);
    }

    return tl;
  };

  // Optimized slide in animation
  const slideIn = (
    elements: string | HTMLElement | HTMLElement[],
    direction: 'left' | 'right' | 'up' | 'down' = 'up',
    config: AnimationConfig = {}
  ) => {
    const {
      delay = 0,
      duration = 0.8,
      ease = 'power3.out',
      start = 'top 75%',
      toggleActions = 'play none none none',
      once = true
    } = config;

    const getInitialPosition = () => {
      switch (direction) {
        case 'left': return { x: -50, y: 0 };
        case 'right': return { x: 50, y: 0 };
        case 'up': return { x: 0, y: 50 };
        case 'down': return { x: 0, y: -50 };
        default: return { x: 0, y: 50 };
      }
    };

    const initial = getInitialPosition();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: config.trigger || elements,
        start,
        toggleActions,
        once
      }
    });

    tl.fromTo(
      elements,
      {
        opacity: 0,
        ...initial
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        ease,
        delay,
        stagger: 0.15
      }
    );

    animationsRef.current.push(tl);
    if (tl.scrollTrigger) {
      scrollTriggersRef.current.push(tl.scrollTrigger);
    }

    return tl;
  };

  // Cleanup function
  const cleanup = useCallback(() => {
    animationsRef.current.forEach(animation => {
      if (animation && typeof animation.kill === 'function') {
        animation.kill();
      }
    });
    scrollTriggersRef.current.forEach(trigger => {
      if (trigger && typeof trigger.kill === 'function') {
        trigger.kill();
      }
    });
    animationsRef.current = [];
    scrollTriggersRef.current = [];
  }, []);

  // Auto cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    fadeIn,
    slideIn,
    cleanup,
    gsap,
    ScrollTrigger
  };
};

// Performance-optimized scroll trigger setup
export const useScrollTriggerBatch = () => {
  useEffect(() => {
    // Batch scroll trigger updates for better performance
    ScrollTrigger.batch('.animate-on-scroll', {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            overwrite: 'auto'
          }
        );
      },
      once: true,
      start: 'top 80%'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger && trigger.vars && (trigger.vars as any).batch) {
          trigger.kill();
        }
      });
    };
  }, []);
};