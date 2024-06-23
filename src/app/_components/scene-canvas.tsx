"use client";

import type { SceneInput } from "@/types/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import PlaneSineTime from "./scene-objects/plane-sine-time";
import SphereNoise from "./scene-objects/sphere-noise";
import PlaneGradient from "./scene-objects/plane-gradient";
import SphereRefraction from "./scene-objects/sphere-refraction";
import SphereDispersion from "./scene-objects/sphere-dispersion";
import SphereDispersionVanilla from "./scene-objects/sphere-dispersion-vanilla";

export default function SceneCanvas({
  canvasName,
  canvasIndex,
  fragment,
  vertex,
  wireframe,
  sceneObject,
  camPos = [0, 0, 0],
}: SceneInput) {
  console.log(camPos);
  return (
    <Canvas
      className="h-full w-full rounded-b-xl"
      camera={{ position: new Vector3(camPos[0], camPos[1], camPos[2]) }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.0} />
      {/* <directionalLight color="red" position={[0, 5, 2]} /> */}
      {(() => {
        switch (sceneObject) {
          case "plane-sine-time":
            return (
              <PlaneSineTime
                fragment={fragment}
                vertex={vertex}
                wireframe={wireframe}
              />
            );
          case "sphere-noise":
            return (
              <SphereNoise
                fragment={fragment}
                vertex={vertex}
                wireframe={wireframe}
              />
            );
          case "plane-gradient":
            return (
              <PlaneGradient
                fragment={fragment}
                vertex={vertex}
                wireframe={wireframe}
              />
            );
          case "sphere-refraction":
            return (
              <SphereRefraction
                fragment={fragment}
                vertex={vertex}
                wireframe={wireframe}
              />
            );
          case "sphere-dispersion":
            return (
              <SphereDispersion
                fragment={fragment}
                vertex={vertex}
                wireframe={wireframe}
              />
            );
          case "vanilla-dispersion":
            return <SphereDispersionVanilla />;
          default:
            return (
              <PlaneSineTime
                fragment={fragment}
                vertex={vertex}
                wireframe={wireframe}
              />
            );
        }
      })()}
      <OrbitControls />
    </Canvas>
  );
}
