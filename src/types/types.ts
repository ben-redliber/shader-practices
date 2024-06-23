interface GLSL {
  fragment?: string;
  vertex?: string;
  wireframe?: boolean;
}

interface SceneInfo {
  canvasName: string;
  canvasIndex?: number;
}

interface SceneInput extends GLSL, SceneInfo {
  // children: React.ReactNode;
  sceneObject?: string;
  camPos?: number[];
}

interface SceneWrapperInput extends SceneInfo {
  children: React.ReactNode;
  sceneObject?: string;
}

export type { GLSL, SceneInfo, SceneInput, SceneWrapperInput };
