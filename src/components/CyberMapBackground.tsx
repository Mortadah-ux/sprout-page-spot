import { motion } from 'framer-motion';
import cyberMapImage from '@/assets/cyber-map-background.png';

/**
 * 3D Cyber Map Background for Portfolio page
 * Creates an immersive cybersecurity-themed backdrop
 */
export function CyberMapBackground() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden" style={{ zIndex: -5 }}>
      {/* Main 3D transformed map */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(15deg) translateZ(-50px)',
            transformOrigin: 'center center',
          }}
        >
          <img
            src={cyberMapImage}
            alt=""
            className="w-full h-full object-cover opacity-40"
            style={{
              filter: 'brightness(0.7) saturate(1.2)',
            }}
          />
        </div>
      </motion.div>

      {/* Animated scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber to-transparent"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ opacity: 0.6 }}
      />

      {/* Grid overlay for depth */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--cyber)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--cyber)/0.1)_1px,transparent_1px)] bg-[size:3rem_3rem]"
        style={{ opacity: 0.5 }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background))_70%,_hsl(var(--background))_100%)]" />

      {/* Top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Floating data points */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-cyber/60"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + (i * 0.3),
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
