import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Globe3D } from './Globe3D';
import { Suspense } from 'react';

/**
 * 3D World Map Background Component
 * Displays an interactive rotating globe with network connections
 * Perfect for cybersecurity/SOC analyst theme
 */
export function WorldMapBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ff9f" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066ff" />
          
          {/* Stars in background */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          {/* The 3D Globe */}
          <Globe3D />
          
          {/* Allow user interaction (optional - can disable) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
