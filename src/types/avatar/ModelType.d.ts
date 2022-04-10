import * as BABYLON from 'babylonjs';

type Model = {
  bones: BABYLON.TransformNode[];
  originalBones: BABYLON.Quaternion[];
  scene: BABYLON.Scene;
};
export type { Model };
