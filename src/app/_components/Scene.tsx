"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { useMemo, useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import useScreenSize from "use-screen-size";
import useMouse from "@react-hook/mouse-position";

import defaultFragment from "@/shaders/sinecurve/fragment.glsl";
import defaultVertex from "@/shaders/sinecurve/vertex.glsl";

import type { GLSL, SceneInput } from "@/types/types";
import SceneWrapper from "./scene-wrapper";
import PlaneSineTime from "./scene-objects/plane-sine-time";
import SphereNoise from "./scene-objects/sphere-noise";
import useMousePos from "@/hooks/use-mouse-pos";
import PlaneGradient from "./scene-objects/plane-gradient";
import SphereRefraction from "./scene-objects/sphere-refraction";
import SphereDispersion from "./scene-objects/sphere-dispersion";
import SceneCanvas from "./scene-canvas";

export default function Scene({
  canvasName = "untitled",
  canvasIndex = 999,
  fragment = defaultFragment,
  vertex = defaultVertex,
  wireframe = true,
  sceneObject = "plane-sine-time",
  camPos = [1.0, 1.0, 1.0],
}: SceneInput) {
  const { x: mouseX, y: mouseY } = useMousePos();

  return (
    <SceneWrapper
      canvasName={canvasName}
      canvasIndex={canvasIndex}
      sceneObject={sceneObject}
    >
      <SceneCanvas
        vertex={vertex}
        wireframe={wireframe}
        sceneObject={sceneObject}
        camPos={camPos}
        canvasName={canvasName}
        canvasIndex={canvasIndex}
        fragment={fragment}
      />
    </SceneWrapper>
  );
}
