import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Text, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCrypto = ({ position, color, symbol, rotation = [0, 0, 0] }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[0.8, 0.8, 0.8]} rotation={rotation}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Box>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
    </group>
  );
};

const AnimatedTorus = () => {
  const torusRef = useRef();
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Torus ref={torusRef} args={[2, 0.5, 16, 100]} position={[0, 0, -5]}>
      <meshStandardMaterial color="#00b4db" wireframe />
    </Torus>
  );
};

const Scene3D = ({ cryptoData }) => {
  const cryptoPositions = useMemo(() => [
    { pos: [-3, 2, 0], color: '#f7931a', symbol: 'BTC' },
    { pos: [3, 1, 0], color: '#627eea', symbol: 'ETH' },
    { pos: [-2, -1, 1], color: '#14f195', symbol: 'SOL' },
    { pos: [2, -2, -1], color: '#c2a633', symbol: 'DOGE' }
  ], []);

  return (
    <div className="scene-3d">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e94560" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        
        <AnimatedTorus />
        
        {cryptoPositions.map((crypto, index) => (
          <FloatingCrypto
            key={index}
            position={crypto.pos}
            color={crypto.color}
            symbol={crypto.symbol}
          />
        ))}
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;