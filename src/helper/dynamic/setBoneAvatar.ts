import { FaceDirection } from '@src/types/avatar/FaceDirectionType';
import { Model } from '@src/types/avatar/ModelType';
import * as BABYLON from 'babylonjs';
import * as Kalidokit from 'kalidokit';

const boneReset = (bones: BABYLON.TransformNode[], originalBones: BABYLON.Quaternion[]) => {
  for (let i = 0; i < bones.length; i++) {
    if (!(bones[i] && originalBones[i])) continue;
    bones[i].rotationQuaternion = originalBones[i].clone();
  }
};

/**
 *
 * 회전하는데 있어서, '구면좌표계'검색해서 회전하는 방식?을 염두해야함
 *
 * @param transBone 모델링
 * @param boneNum 모델링의 처음 시작하는 부분
 * @param kalidoRig 관절 회전 값의 오브젝트, xyz키를 가진 배열...?
 * @param direction 팔 좌우 방향, 0=== 사람기준 왼손
 */
const boneTurn = (transBone: BABYLON.TransformNode[], boneNum: number, kalidoRig: Kalidokit.TPose, direction: number) => {
  const boneX: number[] = [];
  const boneY: number[] = [];
  const boneZ: number[] = [];
  if (direction === 0) {
    boneX[0] = kalidoRig.RightUpperArm.x;
    boneY[0] = kalidoRig.RightUpperArm.y;
    boneZ[0] = kalidoRig.RightUpperArm.z;
    boneX[1] = kalidoRig.RightLowerArm.x;
    boneY[1] = kalidoRig.RightLowerArm.y;
    boneZ[1] = kalidoRig.RightLowerArm.z;
    boneX[2] = kalidoRig.RightHand.x;
    boneY[2] = kalidoRig.RightHand.y;
    boneZ[2] = kalidoRig.RightHand.z;
  } else {
    boneX[0] = kalidoRig.LeftUpperArm.x;
    boneY[0] = kalidoRig.LeftUpperArm.y;
    boneZ[0] = kalidoRig.LeftUpperArm.z;
    boneX[1] = kalidoRig.LeftLowerArm.x;
    boneY[1] = kalidoRig.LeftLowerArm.y;
    boneZ[1] = kalidoRig.LeftLowerArm.z;
    boneX[2] = kalidoRig.LeftHand.x;
    boneY[2] = kalidoRig.LeftHand.y;
    boneZ[2] = kalidoRig.LeftHand.z;
  }
  if (boneX[0] && boneY[0] && boneZ[0]) {
    if (direction === 0) {
      transBone[boneNum].rotate(new BABYLON.Vector3(1, 0, 0), boneZ[0] + (Math.PI - 0.5) / 2, 2);
      transBone[boneNum].rotate(new BABYLON.Vector3(0, 1, 0), -boneY[0] + (Math.PI - 0.5) / 2, 2);
      transBone[boneNum].rotate(new BABYLON.Vector3(0, 0, 1), boneX[0], 2);
    } else {
      transBone[boneNum].rotate(new BABYLON.Vector3(1, 0, 0), -boneZ[0] + (Math.PI - 0.5) / 2, 2);
      transBone[boneNum].rotate(new BABYLON.Vector3(0, 1, 0), -boneY[0] - (Math.PI - 0.5) / 2, 2);
      transBone[boneNum].rotate(new BABYLON.Vector3(0, 0, 1), -boneX[0], 2);
    }
  }
  if (boneX[1] && boneY[1] && boneZ[1]) {
    if (direction === 0) {
      transBone[boneNum - 1].rotate(new BABYLON.Vector3(1, 0, 0), boneZ[1] * 2, 2);
    } else {
      transBone[boneNum - 1].rotate(new BABYLON.Vector3(1, 0, 0), -boneZ[1] * 2, 2);
    }
  }
  if (boneX[2] && boneY[2] && boneZ[2]) {
    if (direction === 0) {
      transBone[boneNum - 2].rotate(new BABYLON.Vector3(1, 0, 0), (boneZ[2] - Math.PI / 4) / 3, 2);
    } else {
      transBone[boneNum - 2].rotate(new BABYLON.Vector3(1, 0, 0), -(boneZ[2] + Math.PI / 4) / 3, 2);
    }
  }
};

const faceTurn = (transBone: BABYLON.TransformNode[], faceFront: number, faceLeft: number, faceRight: number) => {
  const avg = (faceLeft + faceRight) / 2;
  transBone[12].rotate(new BABYLON.Vector3(0, 1, 0), -(Math.atan2(avg, faceFront) - Math.PI / 4) * 10, 2);
};

export const setBone = (userBones: Model, poseRig: Kalidokit.TPose, faceRig: FaceDirection<'left' | 'center' | 'right', number>) => {
  // const userBones = model[peerId];
  // AVATAR 적절하게 가공하는 곳
  boneReset(userBones.bones, userBones.originalBones);
  boneTurn(userBones.bones, 22, poseRig, 0);
  boneTurn(userBones.bones, 17, poseRig, 1);
  faceTurn(userBones.bones, faceRig.center, faceRig.left, faceRig.right);
  userBones.scene.render();
};
