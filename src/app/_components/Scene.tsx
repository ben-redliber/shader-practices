"use client";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(0.0, 0.3, 1.0, 1.0);
  }
`;
const vertexShader = `
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
  }
`;

export default function Scene({
  canvasName = "untitled",
}: {
  canvasName?: string;
}) {
  return (
    <div className="w-[30%] border-2 border-black flex flex-col gap-0 rounded-2xl h-[50vh]">
      <p className="text-2xl p-3">{canvasName}</p>
      <div className="w-full h-full">
        <Canvas
          className="h-full w-full rounded-b-xl"
          camera={{ position: [0.25, 1.0, 1.0] }}
        >
          <OrbitControls />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Object />
        </Canvas>
      </div>
    </div>
  );
}

function Object() {
  const meshRef = useRef();
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        wireframe
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}
