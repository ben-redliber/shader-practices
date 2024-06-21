"use client";
import type { GLSL } from "@/types/types";
import { useEffect, useMemo, useRef, useState } from "react";
import useScreenSize from "use-screen-size";
import { MathUtils, Vector2 } from "three";
import { useFrame } from "@react-three/fiber";

export default function SphereNoise({
  fragment,
  vertex,
  wireframe = true,
}: GLSL) {
  const { height, width } = useScreenSize();

  const meshRef = useRef();
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    [],
  );

  useEffect(() => {}, []);

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.u_time.value =
      0.4 * clock.getElapsedTime();

    meshRef.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      meshRef.current.material.uniforms.u_intensity.value,
      hover.current ? 0.9 : 0.15,
      0.05,
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={0.5}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        wireframe={wireframe}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms}
      />
    </mesh>
  );
}
