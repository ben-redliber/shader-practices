"use client";
import type { GLSL } from "@/types/types";
import { range } from "@/utils";
import { useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector2 } from "three";
import useScreenSize from "use-screen-size";
export default function SphereRefraction({
  fragment,
  vertex,
  wireframe,
}: GLSL) {
  const icoMeshRef = useRef();
  const bgRef = useRef();
  const { height, width } = useScreenSize();

  // This is our main render target where we'll render and store the scene as a texture
  const mainRenderTarget = useFBO();

  // multiplied the width and height vec2 with the smaller between window's DPR or 2.0. Some devices have DPR higher than 2 and might cause artifacts.
  const uniforms = useMemo(
    () => ({
      u_texture: {
        value: null,
      },
      u_resolution: {
        value: new Vector2(
          window.innerWidth,
          window.innerHeight,
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2.0)),
      },
    }),
    [],
  );

  useFrame((state) => {
    const { gl, scene, camera } = state;

    // These 3 lines hide the mesh and take a screenshot of the things BEHIND the mesh that will be used as texture
    icoMeshRef.current.visible = false;
    gl.setRenderTarget(mainRenderTarget);
    // Renders the scene WITHOUT the icomesh into the FBO
    gl.render(scene, camera);

    // Pass the texture data of the rendered scene WITHOUT the icomesh into shader's data'
    icoMeshRef.current.material.uniforms.u_texture.value =
      mainRenderTarget.texture;

    // No longer need to render to that FBO
    gl.setRenderTarget(null);
    // Show the mesh once again
    icoMeshRef.current.visible = true;
  });

  const columns = range(-20.0, 20.0, 2.5);
  const rows = range(-20.0, 20.0, 2.5);

  return (
    <>
      <color attach={"background"} args={["red"]} />
      <group ref={bgRef}>
        {columns.map((col, i) =>
          rows.map((row, j) => (
            <mesh position={[col, row, -4]}>
              <icosahedronGeometry args={[0.333, 8]} />
              <meshStandardMaterial color="white" />
            </mesh>
          )),
        )}
      </group>
      <group ref={bgRef}>
        {columns.map((col, i) =>
          rows.map((row, j) => (
            <mesh position={[row, col, 4]}>
              <icosahedronGeometry args={[0.333, 8]} />
              <meshStandardMaterial color="white" />
            </mesh>
          )),
        )}
      </group>
      <mesh ref={icoMeshRef}>
        <icosahedronGeometry args={[2.84, 10]} />
        <shaderMaterial
          fragmentShader={fragment}
          vertexShader={vertex}
          wireframe={wireframe}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
}
