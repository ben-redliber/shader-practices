import type { SceneInput } from "@/types/types";

import Image from "next/image";
import Scene from "./_components/scene";

import sineFrag from "@/shaders/sinecurve/fragment.glsl";
import sineVert from "@/shaders/sinecurve/vertex.glsl";
import sphereNoiseFrag from "@/shaders/spherenoise/fragment.glsl";
import sphereNoiseVert from "@/shaders/spherenoise/vertex.glsl";
import planeGradientFrag from "@/shaders/planegradient/fragment.glsl";
import planeGradientVert from "@/shaders/planegradient/vertex.glsl";

export default function Home() {
  const defaultCanvas: SceneInput = {
    canvasName: "sine curve",
    fragment: sineFrag,
    vertex: sineVert,
    sceneObject: "plane-sine-time",
    wireframe: true,
    camPos: [0.1, 0.1, 0.1],
  };
  const canvasArrays: SceneInput[] = [
    {
      canvasName: "sphere noise",
      fragment: sphereNoiseFrag,
      vertex: sphereNoiseVert,
      sceneObject: "sphere-noise",
      wireframe: false,
      camPos: [1.0, 1.0, 1.5],
    },
    defaultCanvas,
    {
      canvasName: "sine curve solid",
      wireframe: false,
      camPos: [0.25, 0.5, 0.5],
    },
    {
      canvasName: "plane gradient",
      fragment: planeGradientFrag,
      vertex: planeGradientVert,
      wireframe: false,
      sceneObject: "plane-gradient",
      camPos: [0.25, 0.25, 0.25],
    },
    defaultCanvas,
    defaultCanvas,
  ];
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-6">
      <p className="text-[10vw] font-medium tracking-tighter">
        shaders practice.
      </p>
      <div className="w-full min-h-screen flex flex-wrap gap-4 justify-center">
        {canvasArrays.map((item, i) => (
          <Scene
            key={i + 1}
            canvasName={item.canvasName}
            canvasIndex={i + 1}
            sceneObject={item.sceneObject}
            wireframe={item.wireframe}
            fragment={item.fragment}
            vertex={item.vertex}
            camPos={item.camPos}
          />
        ))}
      </div>
    </main>
  );
}
