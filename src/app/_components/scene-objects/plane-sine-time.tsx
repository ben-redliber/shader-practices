"use client";
import type { GLSL } from "@/types/types";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Vector2 } from "three";
import useScreenSize from "use-screen-size";

export default function PlaneSineTime({ fragment, vertex, wireframe }: GLSL) {
  const meshRef = useRef();
  const { height, width } = useScreenSize();
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_resolution: {
        value: new Vector2(width, height),
      },
    }),
    [],
  );

  useEffect(() => {
    meshRef.current.material.uniforms.u_resolution.value = new Vector2(
      width,
      height,
    );
  }, [width, height]);

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} scale={2}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        wireframe={wireframe}
        uniforms={uniforms}
        fragmentShader={fragment}
        vertexShader={vertex}
      />
    </mesh>
  );
}
