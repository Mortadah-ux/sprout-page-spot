import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Sphere, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

// Explosion particle system
function Explosion({ position, delay }: { position: THREE.Vector3; delay: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const [active, setActive] = useState(false);
  const startTime = useRef(0);

  const particles = useMemo(() => {
    const positions: number[] = [];
    const velocities: number[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      positions.push(0, 0, 0);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = 0.02 + Math.random() * 0.03;
      velocities.push(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.sin(phi) * Math.sin(theta) * speed,
        Math.cos(phi) * speed
      );
    }

    return {
      positions: new Float32Array(positions),
      velocities,
      count,
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (!active && time > delay) {
      setActive(true);
      startTime.current = time;
    }

    if (active && particlesRef.current) {
      const elapsed = time - startTime.current;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particles.count; i++) {
        const i3 = i * 3;
        positions[i3] = particles.velocities[i3] * elapsed * 50;
        positions[i3 + 1] = particles.velocities[i3 + 1] * elapsed * 50;
        positions[i3 + 2] = particles.velocities[i3 + 2] * elapsed * 50;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Reset explosion after 2 seconds
      if (elapsed > 2) {
        startTime.current = time;
        for (let i = 0; i < positions.length; i++) {
          positions[i] = 0;
        }
      }
    }
  });

  if (!active) return null;

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ff4400"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

// Alien laser beam
function LaserBeam({ startPos, endPos, delay }: { startPos: [number, number, number]; endPos: [number, number, number]; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const lineRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cycleTime = (time - delay) % 3;

    if (time > delay) {
      if (cycleTime < 0.5) {
        setVisible(true);
        setOpacity(Math.min(1, cycleTime * 4));
      } else if (cycleTime < 1) {
        setOpacity(Math.max(0, 1 - (cycleTime - 0.5) * 4));
      } else {
        setVisible(false);
        setOpacity(0);
      }
    }
  });

  if (!visible) return null;

  return (
    <Line
      ref={lineRef}
      points={[startPos, endPos]}
      color="#ff0066"
      lineWidth={2}
      transparent
      opacity={opacity}
    />
  );
}

// Alien ship
function AlienShip({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (time > delay && !visible) {
      setVisible(true);
    }

    if (meshRef.current && visible) {
      meshRef.current.rotation.y = time * 2;
      meshRef.current.position.y = position[1] + Math.sin(time * 3) * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group ref={meshRef} position={position}>
      {/* UFO body */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.3, 0.08, 16]} />
        <meshBasicMaterial color="#8800ff" transparent opacity={0.8} />
      </mesh>
      {/* UFO dome */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
      </mesh>
      {/* UFO glow */}
      <pointLight color="#8800ff" intensity={0.5} distance={2} />
    </group>
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const shieldRef = useRef<THREE.Mesh>(null);

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

  // Explosion positions on globe surface
  const explosionPositions = useMemo(() => [
    new THREE.Vector3(1.5, 1, 1),
    new THREE.Vector3(-1.2, 0.8, 1.2),
    new THREE.Vector3(0.5, -1.3, 1.5),
    new THREE.Vector3(-0.8, 1.5, 0.8),
    new THREE.Vector3(1.8, -0.5, 0.5),
  ], []);

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
    if (shieldRef.current) {
      shieldRef.current.rotation.y = time * 0.1;
      (shieldRef.current.material as THREE.MeshBasicMaterial).opacity = 
        0.05 + Math.sin(time * 5) * 0.03;
    }
  });

  return (
    <group>
      {/* Main globe sphere - dark with subtle glow */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.9} />
      </Sphere>

      {/* Wireframe overlay for cyber effect */}
      <Sphere ref={wireframeRef} args={[2.01, 32, 32]}>
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* Shield effect during attack */}
      <Sphere ref={shieldRef} args={[2.2, 32, 32]}>
        <meshBasicMaterial
          color="#00aaff"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
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
        <pointsMaterial size={0.03} color="#00ff88" transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.35, 64]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Alien ships */}
      <AlienShip position={[4, 2, -1]} delay={0.5} />
      <AlienShip position={[-3.5, 1.5, 1]} delay={1} />
      <AlienShip position={[3, -1.5, 2]} delay={1.5} />
      <AlienShip position={[-4, -1, -2]} delay={2} />

      {/* Laser beams from aliens to Earth */}
      <LaserBeam startPos={[4, 2, -1]} endPos={[1.5, 1, 0.5]} delay={1} />
      <LaserBeam startPos={[-3.5, 1.5, 1]} endPos={[-1, 0.8, 1.2]} delay={1.5} />
      <LaserBeam startPos={[3, -1.5, 2]} endPos={[0.8, -1, 1.5]} delay={2} />
      <LaserBeam startPos={[-4, -1, -2]} endPos={[-1.5, -0.5, -1]} delay={2.5} />

      {/* Explosions on Earth surface */}
      {explosionPositions.map((pos, i) => (
        <Explosion key={i} position={pos} delay={1.5 + i * 0.5} />
      ))}
    </group>
  );
}

export function Globe3D() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe />
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
