import type { SceneWrapperInput } from "@/types/types";
import Link from "next/link";
import React from "react";

import { canvasArrays } from "./canvas";

export default function SceneWrapper({
  canvasName,
  canvasIndex,
  children,
  sceneObject,
}: SceneWrapperInput) {
  return (
    <div className="w-full md:w-[30%] border-2 border-black flex flex-col gap-0 rounded-2xl h-[50vh]">
      <div className="flex p-3 flex-row justify-between items-end">
        <Link href={`shaders/${sceneObject}`}>
          <p className="text-2xl pl-4 font-bold">{canvasName}</p>
        </Link>
        <p className="text-sm font-extralight">#{canvasIndex}</p>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
