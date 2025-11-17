// Optimized Framer Motion configurations for better performance

// Reduce motion for users who prefer it
export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimized transition presets
export const transitions = {
  fast: {
    duration: 0.2,
    ease: 'easeOut'
  },
  normal: {
    duration: 0.3,
    ease: 'easeOut'
  },
  slow: {
    duration: 0.5,
    ease: 'easeOut'
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
};

// Optimized animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitions.normal
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transitions.normal
};

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
  transition: transitions.normal
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: transitions.fast
};

// Card flip animation - optimized
export const cardFlip = {
  front: {
    rotateY: 0,
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.4, ease: 'easeInOut' }
  }
};

// Hover animations - optimized (no scale for better performance)
export const hoverLift = {
  y: -5,
  transition: transitions.fast
};

export const hoverGlow = {
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  transition: transitions.fast
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

// Stagger children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.normal
  }
};

// Viewport configuration for better performance
export const viewportConfig = {
  once: true,
  margin: '-50px', // Start animation before element is fully in view
  amount: 0.3 // Trigger when 30% is visible
};

// Layout transition configuration
export const layoutTransition = {
  layout: true,
  transition: transitions.fast
};
