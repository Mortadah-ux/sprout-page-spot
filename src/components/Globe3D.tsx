import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Sphere, Stars, useTexture, shaderMaterial } from '@react-three/drei';
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
        </Suspense>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}