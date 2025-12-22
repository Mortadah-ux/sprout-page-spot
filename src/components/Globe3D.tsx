import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points on globe surface for "locations"
  const points = useMemo(() => {
    const positions: number[] = [];
    const count = 200;
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const x = 2.02 * Math.cos(theta) * Math.sin(phi);
      const y = 2.02 * Math.sin(theta) * Math.sin(phi);
      const z = 2.02 * Math.cos(phi);
      
      positions.push(x, y, z);
    }
    
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = time * 0.05;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group>
      {/* Main globe sphere - dark with subtle glow */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshBasicMaterial
          color="#0a0a0a"
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Wireframe overlay for cyber effect */}
      <Sphere ref={wireframeRef} args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
      
      {/* Glowing points on surface */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#00ff88"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.35, 64]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function Globe3D() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe />
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
      </Canvas>
    </div>
  );
}
