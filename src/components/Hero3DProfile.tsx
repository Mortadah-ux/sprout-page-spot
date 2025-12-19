import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import profilePhoto from '@/assets/profile-photo.jpg';

const certBadges = [
  { label: 'SECURITY+', position: 'right', top: '15%' },
  { label: 'NETWORK+', position: 'left', top: '30%' },
  { label: 'SPLUNK', position: 'right', top: '45%' },
  { label: 'AZURE', position: 'left', top: '60%' },
  { label: 'GOOGLE', position: 'right', top: '75%' },
];

/**
 * 3D Animated Profile Card with cybersecurity theme
 * Features mouse-tracking 3D tilt effect and floating animation
 */
export function Hero3DProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative w-full max-w-md mx-auto"
      style={{ perspective: '1000px' }}
    >
      {/* Floating cyber particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyber/60"
            initial={{ 
              x: Math.random() * 300 - 150,
              y: Math.random() * 400 - 200,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -15, 15, -15],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut'
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + (i % 4) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* 3D Card Container */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-pointer"
      >
        {/* Glow effect behind the image */}
        <motion.div
          className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyber/30 via-cyber/50 to-cyber/30 blur-xl"
          animate={{
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Hexagon frame border */}
        <div 
          className="relative p-1 rounded-2xl bg-gradient-to-br from-cyber via-cyber/50 to-transparent"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Profile Image - with transparent background blend */}
          <div className="relative overflow-hidden rounded-xl bg-transparent">
            <motion.img
              src={profilePhoto}
              alt="Mortadah Jaballah"
              className="w-full aspect-[3/4] object-cover object-top mix-blend-luminosity opacity-90"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Transparent overlay for see-through effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber/20 via-transparent to-background/30 mix-blend-overlay" />
            
            {/* Scan line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber/10 to-transparent"
              animate={{
                y: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ height: '30%' }}
            />

            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--cyber) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--cyber) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Bottom gradient overlay - now transparent */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/50 to-transparent" />
          </div>
        </div>

        {/* Floating certification badges */}
        {certBadges.map((badge, index) => (
          <motion.div
            key={badge.label}
            className={`absolute px-3 py-1.5 rounded bg-background/90 border border-cyber/50 text-xs font-mono text-cyber whitespace-nowrap ${
              badge.position === 'right' ? '-right-4' : '-left-4'
            }`}
            style={{ 
              transform: 'translateZ(40px)',
              top: badge.top,
            }}
            animate={{
              y: [0, badge.position === 'right' ? -5 : 5, 0],
            }}
            transition={{
              duration: 2 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          >
            {badge.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
