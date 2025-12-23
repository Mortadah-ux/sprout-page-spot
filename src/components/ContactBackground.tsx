import contactBg from '@/assets/contact-background.jpg';

export function ContactBackground() {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden" style={{ zIndex: -5 }}>
      {/* Main background image with 3D perspective */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center',
        }}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${contactBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotateX(2deg) scale(1.1)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Animated scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 150, 255, 0.03) 2px, rgba(0, 150, 255, 0.03) 4px)',
          animation: 'scanMove 8s linear infinite',
        }}
      />

      {/* Horizontal scanning beam */}
      <div 
        className="absolute left-0 right-0 h-1 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 150, 255, 0.5), transparent)',
          boxShadow: '0 0 20px rgba(0, 150, 255, 0.5)',
          animation: 'beamScan 4s ease-in-out infinite',
        }}
      />

      {/* Floating security nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: 'rgba(0, 180, 255, 0.6)',
              boxShadow: '0 0 15px rgba(0, 180, 255, 0.8)',
              animation: `nodePulse ${2 + (i * 0.3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 150, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 150, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 20, 0.7) 100%)',
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/40 pointer-events-none" />

      <style>{`
        @keyframes scanMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
        @keyframes beamScan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 100%; }
        }
        @keyframes nodePulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.5); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
