import { canvasArrays } from "@/app/_components/canvas";
import SceneCanvas from "@/app/_components/scene-canvas";
import { SceneInput } from "@/types/types";

export default function Page({ params }: { params: { shader: string } }) {
  const canvasData: SceneInput | undefined = canvasArrays.find(
    (item) => item.sceneObject === params.shader,
  );
  const {
    canvasName,
    canvasIndex,
    fragment,
    vertex,
    wireframe,
    sceneObject,
    camPos,
  } = canvasData!;

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-6">
      <div className="h-[100vh] w-[100vw]">
        <SceneCanvas
          vertex={vertex}
          wireframe={wireframe}
          sceneObject={sceneObject}
          camPos={camPos}
          canvasName={canvasName}
          canvasIndex={canvasIndex}
          fragment={fragment}
        />
      </div>
    </main>
  );
}
