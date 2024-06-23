import type { SceneInput } from "@/types/types";

import Image from "next/image";
import Scene from "./_components/scene";

import { canvasArrays } from "./_components/canvas";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-6">
      <p className="text-[12vw] font-medium tracking-tighter">
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
