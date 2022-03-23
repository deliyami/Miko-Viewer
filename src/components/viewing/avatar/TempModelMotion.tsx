import '@mediapipe/camera_utils';
import * as cam from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import '@mediapipe/drawing_utils';
import { Pose, Results } from '@mediapipe/pose';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { FaceDirection } from '@src/types/FaceDirectionType';
import { Model } from '@src/types/ModelType';
import * as BABYLON from 'babylonjs';
import * as Kalidokit from 'kalidokit';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { model } from './GlobalModel';
import { motion } from './GlobalMotion';

const bornReset = (borns: BABYLON.TransformNode[], originalBorns: BABYLON.Quaternion[]) => {
  for (let i = 0; i < borns.length; i++) {
    if (!(borns[i] && originalBorns[i])) continue;
    borns[i].rotationQuaternion = originalBorns[i].clone();
  }
};

/**
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

const setBorn = (model: { [peerId: string]: Model }, peerId: string, poseRig: Kalidokit.TPose, faceRig: FaceDirection<'left' | 'center' | 'right', number>) => {
  const userBorns = model[peerId];
  // AVATAR 적절하게 가공하는 곳
  bornReset(userBorns.borns, userBorns.originalBorns);
  bornTurn(userBorns.borns, 15, poseRig, 0);
  bornTurn(userBorns.borns, 11, poseRig, 1);
  faceTurn(userBorns.borns, faceRig.center, faceRig.left, faceRig.right);
  userBorns.scene.render();
};

const TempModelMotion: FC<{ mediaStream: MediaStream }> = ({ mediaStream }) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const countRef = useRef<number>(0);
  const camera = useRef<cam.Camera | null>(null);
  const [peers, setPeers] = useRecoilState(peerDataListState);
  const [peerChange, setPeerChange] = useState(false);
  const poseRef = useRef<Pose>(null);

  const user = useUser();
  const myPeerId = 'kirari';

  // AVATAR mediapipe 데이터가 적절하게 나오는 곳
  const onResults = useCallback(
    (results: Results) => {
      if (
        model &&
        model.kirari &&
        model.kirari.borns &&
        model.kirari.originalBorns &&
        model.kirari.scene &&
        results &&
        results.poseLandmarks &&
        results.poseWorldLandmarks &&
        results.segmentationMask
      ) {
        const poseRig = Kalidokit.Pose.solve(results.poseWorldLandmarks, results.poseLandmarks, {
          runtime: 'mediapipe',
          video: webcamRef?.current,
          enableLegs: false,
        });
        const faceRig = {
          center: results.poseLandmarks[0].x,
          left: results.poseLandmarks[7].x,
          right: results.poseLandmarks[8].x,
        };
        // AVATAR 적절하게 render 호출하는 메소드
        setBorn(model, myPeerId, poseRig, faceRig);
        countRef.current += 1;
        if (peers && countRef.current % 5 === 0) {
          countRef.current = 0;
          // const data: ChatMotionInterface = {
          //   sender: user.data.name,
          //   motion: { pose: poseRig, face: faceRig },
          // };
          // sendToAllPeers(peers, { type: 'motion', data });
        }
        const anotherPeerId = motion.sender;
        for (const peerId in model) {
          if (peerId === anotherPeerId && peerId !== 'kirari') {
            setBorn(model, peerId, motion.motion.pose, motion.motion.face);
          }
        }
      }
    },
    [peers, user.data],
  );
  function setupMediapipe() {
    const pose = new Pose({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    poseRef.current = pose;
    //   let pose = new Holistic({locateFile: (file) => {
    //     return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.4.1633559476/${file}`;
    // }});
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);
    if (webcamRef.current && webcamRef.current) {
      camera.current = new cam.Camera(webcamRef?.current, {
        onFrame: async () => {
          if (webcamRef.current) await pose.send({ image: webcamRef.current });
        },
        width: 320,
        height: 240,
      });
      camera.current.start();
    }
    setPeerChange(true);
    return () => {
      camera.current?.stop();
      webcamRef.current = null;
      camera.current = null;
    };
  }
  useEffect(() => {
    if (mediaStream) {
      const videoCurr = webcamRef.current;
      if (!videoCurr) return;
      const video = videoCurr! as HTMLVideoElement;
      if (!video.srcObject) {
        video.srcObject = mediaStream;
        setupMediapipe();
      }
    }
  }, [mediaStream]);

  useEffect(() => {
    poseRef.current.onResults(onResults);
  }, [peerChange, onResults]);

  return (
    <>
      <video
        ref={webcamRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          width: 320,
          height: 240,
        }}
      ></video>
    </>
  );
};

export default TempModelMotion;
