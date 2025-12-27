import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import earthTexture from '@/assets/earth-texture.jpg';

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Load Earth texture from local asset
  const earthMap = useTexture(earthTexture);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.08;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group>
      {/* Main Earth sphere with texture */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={earthMap}
          roughness={1}
          metalness={0}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[2.08, 64, 64]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer atmosphere rim */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function EarthFallback() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial color="#1a4d7a" roughness={0.8} />
    </Sphere>
  );
}

export function Globe3D() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting for realistic Earth */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#4da6ff" />
        
        <Suspense fallback={<EarthFallback />}>
          <Earth />
        </Suspense>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
