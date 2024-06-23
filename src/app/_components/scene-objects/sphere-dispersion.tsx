"use client";
import type { GLSL } from "@/types/types";
import { range } from "@/utils";
import { useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BackSide, FrontSide, Vector2, Vector3 } from "three";
import useScreenSize from "use-screen-size";

export default function SphereDispersion({
  fragment,
  vertex,
  wireframe,
}: GLSL) {
  const sphereRef = useRef();
  const bgRef = useRef();

  const mainRenderTarget = useFBO();
  const backRenderTarget = useFBO();

  const { height, width } = useScreenSize();

  const uniforms = useMemo(
    () => ({
      u_iorRed: {
        value: 1.25,
      },
      u_iorGreen: {
        value: 1.28,
      },
      u_iorBlue: {
        value: 1.32,
      },
      u_texture: {
        value: null,
      },
      u_resolution: {
        value: new Vector2(
          window.innerWidth,
          window.innerHeight,
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
      },
      u_refractPower: {
        value: 0.5,
      },
      u_chromaticAberration: {
        value: 0.35,
      },
    }),
    [],
  );

  useFrame((state) => {
    const { gl, scene, camera } = state;

    sphereRef.current.visible = false;

    gl.setRenderTarget(backRenderTarget);
    gl.render(scene, camera);
    sphereRef.current.material.uniforms.u_texture.value =
      backRenderTarget.texture;
    sphereRef.current.material.side = BackSide;

    sphereRef.current.visible = true;

    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    sphereRef.current.material.uniforms.u_texture.value =
      mainRenderTarget.texture;
    sphereRef.current.material.side = FrontSide;

    gl.setRenderTarget(null);
    // sphereRef.current.visible = true;
  });

  return (
    <>
      <color attach={"background"} args={["black"]} />
      <group ref={bgRef} visible={false}>
        <mesh position={[-4, -3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[4, -3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[5, 3, -4]}>
          <icosahedronGeometry args={[2, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
      <mesh ref={sphereRef}>
        {/* <icosahedronGeometry args={[2.84, 20]} /> */}
        <torusGeometry args={[3, 1, 32, 100]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          wireframe={wireframe}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
}
