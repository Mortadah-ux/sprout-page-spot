import { motion } from 'framer-motion';
import aboutBgImage from '@/assets/about-background.png';

/**
 * 3D Cyber Background for About page
 * Creates an immersive cybersecurity-themed backdrop with code and binary effects
 */
export function AboutBackground() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden" style={{ zIndex: -5 }}>
      {/* Main 3D transformed image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(10deg) rotateY(-5deg) translateZ(-30px)',
            transformOrigin: 'center center',
          }}
          animate={{
            rotateY: [-5, 5, -5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src={aboutBgImage}
            alt=""
            className="w-full h-full object-cover opacity-35"
            style={{
              filter: 'brightness(0.6) saturate(1.3) hue-rotate(-10deg)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Animated scan line effect - horizontal */}
      <motion.div
        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyber to-transparent"
        initial={{ top: '-5%' }}
        animate={{ top: '105%' }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ opacity: 0.5, boxShadow: '0 0 20px hsl(var(--cyber))' }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent"
        initial={{ left: '-5%' }}
        animate={{ left: '105%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
        style={{ opacity: 0.3, boxShadow: '0 0 15px hsl(var(--primary))' }}
      />

      {/* Matrix-style binary rain overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyber text-xs font-mono whitespace-nowrap"
            style={{
              left: `${i * 8 + 2}%`,
              writingMode: 'vertical-rl',
            }}
            initial={{ top: '-100%' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          >
            {Array(30).fill(null).map(() => Math.round(Math.random())).join('')}
          </motion.div>
        ))}
      </div>

      {/* Grid overlay for depth */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background)/0.7)_50%,_hsl(var(--background))_100%)]" />

      {/* Top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent" />

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* Floating pulse nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${20 + (i * 12)}%`,
            top: `${25 + (i % 2) * 35}%`,
            width: '4px',
            height: '4px',
            background: `hsl(var(--${i % 2 === 0 ? 'cyber' : 'primary'}))`,
            boxShadow: `0 0 10px hsl(var(--${i % 2 === 0 ? 'cyber' : 'primary'}))`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 2.5 + (i * 0.3),
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}
