import '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import '@mediapipe/drawing_utils';
import { FaceDirection } from '@src/types/FaceDirectionType';
import { Model } from '@src/types/ModelType';
import * as BABYLON from 'babylonjs';
import * as Kalidokit from 'kalidokit';

const bornReset = (borns: BABYLON.TransformNode[], originalBorns: BABYLON.Quaternion[]) => {
  for (let i = 0; i < borns.length; i++) {
    if (!(borns[i] && originalBorns[i])) continue;
    borns[i].rotationQuaternion = originalBorns[i].clone();
  }
};

/**
 *
 * 회전하는데 있어서, '구면좌표계'검색해서 회전하는 방식?을 염두해야함
 *
 * @param transBorn 모델링
 * @param bornNum 모델링의 처음 시작하는 부분
 * @param kalidoRig 관절 회전 값의 오브젝트, xyz키를 가진 배열...?
 * @param direction 팔 좌우 방향
 */
const bornTurn = (transBorn: BABYLON.TransformNode[], bornNum: number, kalidoRig: Kalidokit.TPose, direction: number) => {
  const bornX: number[] = [];
  const bornY: number[] = [];
  const bornZ: number[] = [];
  if (direction === 0) {
    bornX[0] = kalidoRig.RightUpperArm.x;
    bornY[0] = kalidoRig.RightUpperArm.y;
    bornZ[0] = kalidoRig.RightUpperArm.z;
    bornX[1] = kalidoRig.RightLowerArm.x;
    bornY[1] = kalidoRig.RightLowerArm.y;
    bornZ[1] = kalidoRig.RightLowerArm.z;
    bornX[2] = kalidoRig.RightHand.x;
    bornY[2] = kalidoRig.RightHand.y;
    bornZ[2] = kalidoRig.RightHand.z;
  } else {
    bornX[0] = kalidoRig.LeftUpperArm.x;
    bornY[0] = kalidoRig.LeftUpperArm.y;
    bornZ[0] = kalidoRig.LeftUpperArm.z;
    bornX[1] = kalidoRig.LeftLowerArm.x;
    bornY[1] = kalidoRig.LeftLowerArm.y;
    bornZ[1] = kalidoRig.LeftLowerArm.z;
    bornX[2] = kalidoRig.LeftHand.x;
    bornY[2] = kalidoRig.LeftHand.y;
    bornZ[2] = kalidoRig.LeftHand.z;
  }
  if (bornX[0] && bornY[0] && bornZ[0]) {
    if (direction === 0) {
      transBorn[bornNum].rotate(new BABYLON.Vector3(1, 0, 0), bornZ[0] + (Math.PI - 0.5) / 2, 2);
      transBorn[bornNum].rotate(new BABYLON.Vector3(0, 1, 0), -bornY[0] + (Math.PI - 0.5) / 2, 2);
      transBorn[bornNum].rotate(new BABYLON.Vector3(0, 0, 1), bornX[0], 2);
    } else {
      transBorn[bornNum].rotate(new BABYLON.Vector3(1, 0, 0), -bornZ[0] + (Math.PI - 0.5) / 2, 2);
      transBorn[bornNum].rotate(new BABYLON.Vector3(0, 1, 0), -bornY[0] - (Math.PI - 0.5) / 2, 2);
      transBorn[bornNum].rotate(new BABYLON.Vector3(0, 0, 1), -bornX[0], 2);
    }
  }
  if (bornX[1] && bornY[1] && bornZ[1]) {
    if (direction === 0) {
      transBorn[bornNum - 1].rotate(new BABYLON.Vector3(1, 0, 0), bornZ[1] * 2, 2);
    } else {
      transBorn[bornNum - 1].rotate(new BABYLON.Vector3(1, 0, 0), -bornZ[1] * 2, 2);
    }
    // transBorn[bornNum-1].rotate(new BABYLON.Vector3(0,1,0),bornY[1],2)
    // transBorn[bornNum-1].rotate(new BABYLON.Vector3(0,0,1),bornX[1],2)
  }
};

const faceTurn = (transBorn: BABYLON.TransformNode[], faceFront: number, faceLeft: number, faceRight: number) => {
  const avg = (faceLeft + faceRight) / 2;
  transBorn[7].rotate(new BABYLON.Vector3(0, 1, 0), -(Math.atan2(avg, faceFront) - Math.PI / 4) * 10, 2);
};

export const setBorn = (userBorns: Model, peerId: string, poseRig: Kalidokit.TPose, faceRig: FaceDirection<'left' | 'center' | 'right', number>) => {
  // const userBorns = model[peerId];
  // AVATAR 적절하게 가공하는 곳
  bornReset(userBorns.borns, userBorns.originalBorns);
  bornTurn(userBorns.borns, 15, poseRig, 0);
  bornTurn(userBorns.borns, 11, poseRig, 1);
  faceTurn(userBorns.borns, faceRig.center, faceRig.left, faceRig.right);
  userBorns.scene.render();
};
