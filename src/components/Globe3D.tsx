import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated 3D Globe with connection lines
 * Represents global network connectivity for cybersecurity theme
 */
export function Globe3D() {
  const globeRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);
  
  // Generate random connection points on sphere surface
  const connections = useMemo(() => {
    const points: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = [];
    const numConnections = 30;
    
    for (let i = 0; i < numConnections; i++) {
      // Random points on sphere surface
      const phi1 = Math.random() * Math.PI * 2;
      const theta1 = Math.random() * Math.PI;
      const phi2 = Math.random() * Math.PI * 2;
      const theta2 = Math.random() * Math.PI;
      
      const radius = 2.05; // Slightly larger than globe
      
      const start = new THREE.Vector3(
        radius * Math.sin(theta1) * Math.cos(phi1),
        radius * Math.cos(theta1),
        radius * Math.sin(theta1) * Math.sin(phi1)
      );
      
      const end = new THREE.Vector3(
        radius * Math.sin(theta2) * Math.cos(phi2),
        radius * Math.cos(theta2),
        radius * Math.sin(theta2) * Math.sin(phi2)
      );
      
      points.push({ start, end });
    }
    
    return points;
  }, []);

  // Create dots/markers on the globe
  const markers = useMemo(() => {
    const markerPoints: THREE.Vector3[] = [];
    const numMarkers = 50;
    const radius = 2.02;
    
    for (let i = 0; i < numMarkers; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      markerPoints.push(
        new THREE.Vector3(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.cos(theta),
          radius * Math.sin(theta) * Math.sin(phi)
        )
      );
    }
    
    return markerPoints;
  }, []);

  // Animate rotation
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#0a0a0a"
          attach="material"
          distort={0.1}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
          emissive="#00ff9f"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#00ff9f"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Connection lines */}
      <group ref={linesRef}>
        {connections.map((connection, i) => {
          // Create curved line between points
          const curve = new THREE.QuadraticBezierCurve3(
            connection.start,
            new THREE.Vector3(
              (connection.start.x + connection.end.x) / 2,
              (connection.start.y + connection.end.y) / 2 + 1,
              (connection.start.z + connection.end.z) / 2
            ),
            connection.end
          );
          
          const points = curve.getPoints(50);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          
          return (
            <line key={i} geometry={lineGeometry}>
              <lineBasicMaterial
                color="#00ff9f"
                transparent
                opacity={0.3}
                linewidth={1}
              />
            </line>
          );
        })}
      </group>

      {/* Marker dots */}
      {markers.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#00ff9f" />
        </mesh>
      ))}

      {/* Outer glow ring */}
      <Sphere args={[2.3, 64, 64]}>
        <meshBasicMaterial
          color="#00ff9f"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}
