import {
  OrbitControls,
  useHelper,
  Sky,
  Cloud,
} from "@react-three/drei";
import { useRef } from "react";
import Fox from "./Fox.js";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { BlinkingCube } from "./OpenAI.js";
import TranslatingPlane from "./translating-plane/TranslatingPlane.js";


export default function Experience() {
  const model = useLoader(GLTFLoader, './TOP GUN_blend1.glb')

  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      {/* BACKGROUND & LIGHTING */}
      <color args={["Ivory"]} attach="background" />
      <OrbitControls makeDefault />
      <directionalLight
        ref={directionalLight}
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />
      <Sky
        distance={45000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Cloud
        opacity={0.5}
        speed={0.95} // Rotation speed
        width={10} // Width of the full cloud
        depth={1.5} // Z-dir depth
        segments={20} // Number of particles
      />

      {/* SPINNING CUBE */}
      <mesh ref={cube} castShadow position-y={3} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
        />
      </mesh>

      {/* SPHERE */}
      <mesh castShadow position-y={5} position-x={-6} scale={0.5}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
        />
      </mesh>

      {/* BASE PLANE */}
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={15}
      >
        <planeGeometry />
        <meshStandardMaterial color="teal" />
      </mesh>

      {/* JET MODEL */}
      <mesh castShadow position-y={0.31} position-x={-2}>
        <primitive object={model.scene} scale={5} />
      </mesh>

      {/* ANIMATED FOX MODEL */}
      <mesh castShadow position-y={-1} position-x={-3} scale={0.5}>
        <Fox /> 
      </mesh>

      {/* SHADER EXAMPLE */}
      <mesh position-y={-0.7} position-x={-3} scale={5}>
        <BlinkingCube/>
      </mesh>
      <mesh position-y={1} position-x={5} scale={1.5}>
        <TranslatingPlane/>
      </mesh>
    </>
  );
}
