import sineFrag from "@/shaders/sinecurve/fragment.glsl";
import sineVert from "@/shaders/sinecurve/vertex.glsl";
import sphereNoiseFrag from "@/shaders/spherenoise/fragment.glsl";
import sphereNoiseVert from "@/shaders/spherenoise/vertex.glsl";
import planeGradientFrag from "@/shaders/planegradient/fragment.glsl";
import planeGradientVert from "@/shaders/planegradient/vertex.glsl";
import sphereRefractionFrag from "@/shaders/refraction/fragment.glsl";
import sphereRefractionVert from "@/shaders/refraction/vertex.glsl";
import sphereDispersionFrag from "@/shaders/dispersion/fragment.glsl";
import sphereDispersionVert from "@/shaders/dispersion/vertex.glsl";
import vanillaDispFrag from "@/shaders/dispersion-vanilla/fragment.glsl";
import vanillaDispVert from "@/shaders/dispersion-vanilla/vertex.glsl";

import type { SceneInput } from "@/types/types";

const defaultCanvas: SceneInput = {
  canvasName: "sine curve",
  fragment: sineFrag,
  vertex: sineVert,
  sceneObject: "plane-sine-time",
  wireframe: true,
  camPos: [0.1, 0.1, 0.1],
};

export const canvasArrays: SceneInput[] = [
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
    sceneObject: "plane-sine-time",
  },
  {
    canvasName: "plane gradient",
    fragment: planeGradientFrag,
    vertex: planeGradientVert,
    wireframe: false,
    sceneObject: "plane-gradient",
    camPos: [0.25, 0.25, 0.25],
  },
  {
    canvasName: "sphere refraction ior 1.025",
    fragment: sphereRefractionFrag,
    vertex: sphereRefractionVert,
    wireframe: false,
    sceneObject: "sphere-refraction",
    camPos: [0, 0, 12],
  },
  {
    canvasName: "sphere dispersion ior 0.5",
    fragment: sphereDispersionFrag,
    vertex: sphereDispersionVert,
    wireframe: false,
    sceneObject: "sphere-dispersion",
    camPos: [4, -2, 7],
  },
  {
    canvasName: "sphere vanilla ior 0.5",
    fragment: vanillaDispFrag,
    vertex: vanillaDispVert,
    wireframe: false,
    sceneObject: "vanilla-dispersion",
    camPos: [4, -2, 7],
  },
];
