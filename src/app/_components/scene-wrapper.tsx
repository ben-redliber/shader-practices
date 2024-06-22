import type { SceneWrapperInput } from "@/types/types";
import React from "react";

// interface SceneWrapperInput extends SceneInfo {
//   children: React.ReactNode;
// }

export default function SceneWrapper({
  canvasName,
  canvasIndex,
  children,
}: SceneWrapperInput) {
  return (
    <div className="w-full md:w-[30%] border-2 border-black flex flex-col gap-0 rounded-2xl h-[50vh]">
      <div className="flex p-3 flex-row justify-between items-end">
        <p className="text-2xl pl-4 font-bold">{canvasName}</p>
        <p className="text-sm font-extralight">#{canvasIndex}</p>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
