"use client";
import useMousePos from "@/hooks/use-mouse-pos";
import type { GLSL } from "@/types/types";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Color, Vector2 } from "three";
import useScreenSize from "use-screen-size";

export default function PlaneGradient({
  fragment,
  vertex,
  wireframe = false,
}: GLSL) {
  const meshRef = useRef();
  const { x, y } = useMousePos();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color("#d83c2b"),
      },
      u_colorA: { value: new Color("#f7edb1") },
      u_colorB: { value: new Color("#f0ef9c") },
    }),
    [],
  );

  useFrame((state) => {
    const { clock } = state;

    meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
    meshRef.current.material.uniforms.u_mouse.value = new Vector2(x, y);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms}
        wireframe={wireframe}
      />
    </mesh>
  );
}
