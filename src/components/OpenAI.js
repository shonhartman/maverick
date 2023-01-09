import * as React from "react";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const fragmentShader = `
    uniform float u_time;

    void main() {
        gl_FragColor = vec4(abs(sin(u_time)),0.0,3.0,30.2);
    }
`;

const vertexShader = `void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 10.0);
    modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;
  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
  }`;

export const BlinkingCube = () => {
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime() * 2;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
