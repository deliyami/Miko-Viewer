import * as BABYLON from "babylonjs";

type Model = {
  borns: BABYLON.TransformNode[];
  originalBorns: BABYLON.Quaternion[];
  scene: BABYLON.Scene;
};
export type { Model };
