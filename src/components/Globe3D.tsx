import { useRef, Suspense, useMemo, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Sphere, Stars, useTexture, shaderMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import earthTexture from '@/assets/earth-texture.jpg';
import cloudsTexture from '@/assets/earth-clouds.jpg';
import nightTexture from '@/assets/earth-night.jpg';
import moonTexture from '@/assets/moon-texture.jpg';

// Custom shader material for day/night with city lights
const EarthMaterial = shaderMaterial(
  {
    dayMap: null,
    nightMap: null,
    sunDirection: new THREE.Vector3(1, 0.3, 0.5),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D dayMap;
    uniform sampler2D nightMap;
    uniform vec3 sunDirection;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 sunDir = normalize(sunDirection);
      float intensity = dot(vNormal, sunDir);
      
      vec4 dayColor = texture2D(dayMap, vUv);
      vec4 nightColor = texture2D(nightMap, vUv);
      
      // Boost the night lights significantly for brightness
      nightColor.rgb *= 2.5;
      
      // Smooth transition between day and night
      float mixFactor = smoothstep(-0.2, 0.3, intensity);
      
      // Blend day and night textures
      vec4 finalColor = mix(nightColor, dayColor, mixFactor);
      
      // Add extra glow to city lights on night side
      float nightIntensity = 1.0 - mixFactor;
      finalColor.rgb += nightColor.rgb * nightIntensity * 0.5;
      
      gl_FragColor = finalColor;
    }
  `
);

extend({ EarthMaterial });

// Type declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      earthMaterial: any;
    }
  }
}

// Shooting star component
function ShootingStar({ delay }: { delay: number }) {
  const lineRef = useRef<any>(null);
  const [active, setActive] = useState(false);
  const progressRef = useRef(0);
  const startTimeRef = useRef(0);
  
  // Random start and end positions for each shooting star
  const trajectory = useMemo(() => {
    const startX = (Math.random() - 0.5) * 80;
    const startY = 20 + Math.random() * 30;
    const startZ = -30 - Math.random() * 20;
    
    const endX = startX + (Math.random() - 0.5) * 40;
    const endY = startY - 30 - Math.random() * 20;
    const endZ = startZ + 10;
    
    return {
      start: new THREE.Vector3(startX, startY, startZ),
      end: new THREE.Vector3(endX, endY, endZ),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Trigger shooting star periodically with delay offset
    const cycleTime = 8; // seconds between each shooting star cycle
    const currentCycle = Math.floor((time + delay) / cycleTime);
    const cycleProgress = ((time + delay) % cycleTime) / cycleTime;
    
    if (cycleProgress < 0.15) { // Active for 15% of cycle (about 1.2 seconds)
      if (!active) {
        setActive(true);
        startTimeRef.current = time;
      }
      progressRef.current = cycleProgress / 0.15;
    } else {
      if (active) setActive(false);
    }
  });

  if (!active) return null;

  // Create trail effect with fading points
  const trailLength = 8;
  const points: THREE.Vector3[] = [];
  
  for (let i = 0; i < trailLength; i++) {
    const t = Math.max(0, progressRef.current - (i * 0.03));
    const point = new THREE.Vector3().lerpVectors(trajectory.start, trajectory.end, t);
    points.push(point);
  }

  return (
    <Line
      ref={lineRef}
      points={points}
      color="#ffffff"
      lineWidth={2}
      transparent
      opacity={0.8}
    />
  );
}

function ShootingStars() {
  // Create multiple shooting stars with different delays
  const stars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: i * 1.6, // Stagger the delays
    }));
  }, []);

  return (
    <group>
      {stars.map((star) => (
        <ShootingStar key={star.id} delay={star.delay} />
      ))}
    </group>
  );
}

// Sun with lens flare effect
function Sun() {
  const sunPosition = new THREE.Vector3(50, 15, 25);
  const flareRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Subtle pulsing effect on the flares
    if (flareRef.current) {
      const time = state.clock.getElapsedTime();
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      flareRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={sunPosition.toArray()}>
      {/* Sun core - bright white/yellow */}
      <Sphere args={[3, 32, 32]}>
        <meshBasicMaterial color="#fff8e7" />
      </Sphere>
      
      {/* Inner glow */}
      <Sphere args={[4, 32, 32]}>
        <meshBasicMaterial
          color="#ffdd44"
          transparent
          opacity={0.6}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[6, 32, 32]}>
        <meshBasicMaterial
          color="#ffaa22"
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Corona */}
      <Sphere args={[10, 32, 32]}>
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Lens flare elements */}
      <group ref={flareRef}>
        {/* Main flare streaks */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[40, 1.5]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[40, 1.5]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <planeGeometry args={[45, 1]} />
          <meshBasicMaterial
            color="#ffeecc"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[45, 1]} />
          <meshBasicMaterial
            color="#ffeecc"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Hexagonal flare artifacts */}
        <mesh position={[-15, -5, 0]}>
          <circleGeometry args={[2, 6]} />
          <meshBasicMaterial
            color="#44aaff"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[-25, -8, 0]}>
          <circleGeometry args={[1.5, 6]} />
          <meshBasicMaterial
            color="#ff66aa"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[-35, -12, 0]}>
          <circleGeometry args={[3, 32]} />
          <meshBasicMaterial
            color="#66ffaa"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

// Asteroid belt between Earth and Sun
function AsteroidBelt() {
  const beltRef = useRef<THREE.Group>(null);
  
  // Generate asteroid data once
  const asteroids = useMemo(() => {
    const count = 80;
    const asteroidData = [];
    
    for (let i = 0; i < count; i++) {
      // Random angle around the belt
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      // Distance from center (between Earth at ~2 and Sun at ~50)
      const radius = 12 + Math.random() * 8;
      // Slight vertical variation
      const yOffset = (Math.random() - 0.5) * 2;
      // Random size
      const size = 0.05 + Math.random() * 0.15;
      // Random rotation speeds
      const rotationSpeed = 0.5 + Math.random() * 2;
      // Random color variation (gray to brown)
      const colorValue = 0.3 + Math.random() * 0.3;
      
      asteroidData.push({
        id: i,
        angle,
        radius,
        yOffset,
        size,
        rotationSpeed,
        orbitSpeed: 0.02 + Math.random() * 0.03,
        color: new THREE.Color(colorValue, colorValue * 0.9, colorValue * 0.8),
        shape: Math.floor(Math.random() * 3), // 0: dodeca, 1: icosa, 2: octa
      });
    }
    
    return asteroidData;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (beltRef.current) {
      // Slowly rotate the entire belt
      beltRef.current.rotation.y = time * 0.01;
    }
  });

  return (
    <group ref={beltRef} rotation={[0.1, 0, 0.05]}>
      {asteroids.map((asteroid) => (
        <Asteroid key={asteroid.id} data={asteroid} />
      ))}
    </group>
  );
}

function Asteroid({ data }: { data: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const position = useMemo(() => {
    const x = Math.cos(data.angle) * data.radius;
    const z = Math.sin(data.angle) * data.radius;
    return new THREE.Vector3(x, data.yOffset, z);
  }, [data]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Individual asteroid rotation
      meshRef.current.rotation.x = time * data.rotationSpeed;
      meshRef.current.rotation.y = time * data.rotationSpeed * 0.7;
      
      // Orbit movement
      const orbitAngle = data.angle + time * data.orbitSpeed;
      meshRef.current.position.x = Math.cos(orbitAngle) * data.radius;
      meshRef.current.position.z = Math.sin(orbitAngle) * data.radius;
    }
  });

  // Different geometry based on shape type for variety
  const geometry = useMemo(() => {
    switch (data.shape) {
      case 0:
        return <dodecahedronGeometry args={[data.size, 0]} />;
      case 1:
        return <icosahedronGeometry args={[data.size, 0]} />;
      default:
        return <octahedronGeometry args={[data.size, 0]} />;
    }
  }, [data.shape, data.size]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial
        color={data.color}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

function Moon() {
  const moonRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);
  const moonMap = useTexture(moonTexture);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Moon orbits around Earth
    if (moonRef.current) {
      moonRef.current.rotation.y = time * 0.15;
    }
    // Moon rotates slowly on its axis
    if (moonMeshRef.current) {
      moonMeshRef.current.rotation.y = time * 0.05;
    }
  });

  // Moon is about 1/4 Earth's size, orbiting at a scaled distance
  return (
    <group ref={moonRef}>
      <Sphere ref={moonMeshRef} args={[0.5, 32, 32]} position={[5, 0.5, 0]}>
        <meshStandardMaterial map={moonMap} roughness={0.9} />
      </Sphere>
    </group>
  );
}

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Load Earth textures from local assets
  const earthMap = useTexture(earthTexture);
  const cloudsMap = useTexture(cloudsTexture);
  const nightMap = useTexture(nightTexture);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.08;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.1;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = time * 0.05;
    }
  });

  // Earth's axial tilt is approximately 23.5 degrees
  const axialTilt = (23.5 * Math.PI) / 180;

  return (
    <group rotation={[axialTilt, 0, 0]}>
      {/* Main Earth sphere with day/night shader */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <earthMaterial
          ref={materialRef}
          dayMap={earthMap}
          nightMap={nightMap}
          sunDirection={[1, 0.3, 0.5]}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmosphere glow - brighter */}
      <Sphere ref={atmosphereRef} args={[2.08, 64, 64]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer atmosphere rim */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.06}
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#4da6ff" />
        
        <Suspense fallback={<EarthFallback />}>
          <Earth />
          <Moon />
          <Sun />
          <AsteroidBelt />
        </Suspense>
        <ShootingStars />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}