import { Button } from '@chakra-ui/react';
import '@mediapipe/camera_utils';
import * as cam from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import '@mediapipe/drawing_utils';
import { Pose, Results } from '@mediapipe/pose';
import sendToAllPeers from '@src/helper/sendToAllPeers';
import { myStreamState, peerDataListState } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { ChatMotionInterface } from '@src/types/ChatMotionType';
import { FaceDirection } from '@src/types/FaceDirectionType';
import { Model } from '@src/types/ModelType';
import * as BABYLON from 'babylonjs';
import * as Kalidokit from 'kalidokit';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
    // 왼팔 보정
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
    // y x z
    // x y z
    // 왼팔 보정
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

  // console.log(Math.atan2(avg, faceFront)-(Math.PI/4)-0.02)
  transBorn[7].rotate(new BABYLON.Vector3(0, 1, 0), -(Math.atan2(avg, faceFront) - Math.PI / 4) * 10, 2);
};

const setBorn = (functionModel: { [peerId: string]: Model }, peerId: string, poseRig: Kalidokit.TPose, faceRig: FaceDirection<'left' | 'center' | 'right', number>) => {
  const userBorns = functionModel[peerId];
  bornReset(userBorns.borns, userBorns.originalBorns);
  bornTurn(userBorns.borns, 15, poseRig, 0);
  bornTurn(userBorns.borns, 11, poseRig, 1);
  faceTurn(userBorns.borns, faceRig.center, faceRig.left, faceRig.right);
  userBorns.scene.render();
};

const ModelMotion: FC<{ mediaStream: MediaStream }> = ({ mediaStream }) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const camera = useRef<cam.Camera | null>(null);
  const [peers, setPeers] = useRecoilState(peerDataListState);
  const [peerChange, setPeerChange] = useState(false);
  const poseRef = useRef<Pose>(null);
  const pointRef = useRef<number[]>([]);

  const user = useUser();
  const myStream = useRecoilValue(myStreamState);
  const myPeerId = 'kirari';

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
        // 0번 사용자 results를 window에 저장

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
        setBorn(model, myPeerId, poseRig, faceRig);
        const data: ChatMotionInterface = {
          sender: user.data.name,
          motion: { pose: poseRig, face: faceRig },
        };
        /**
         * 팔 들고 내릴 때 발생되는 이벤트, 각도값 넣어놨고 useRef에 들고 내릴때 마다 값이 push pop하게 되어있음
         * 여기에 백엔드나 socket서버에 점수 획득 쏘고 redis에 넣으면 될 듯 한데...
         */
        /*
        const T4 = 0.4;
        const T5 = 0.5;
        const T6 = 0.6;
        const T7 = 0.7;
        const T8 = 0.8;
        const T9 = 0.9;
        const O2 = 1.2;
        const findBefore = (ru: any, rl: any, lu: any, ll: any) => {
          return (
            ru.x > 0 &&
            ru.x <= T4 &&
            T7 < ru.y &&
            ru.y < O2 &&
            ru.z > 0 &&
            ru.z <= T4 &&
            rl.y !== 0 &&
            T5 < rl.z &&
            lu.x > 0 &&
            lu.x <= T4 &&
            O2 * -1 < lu.y &&
            lu.y < T7 * -1 &&
            T4 * -1 < lu.z &&
            lu.z <= 0 &&
            ll.y !== 0 &&
            ll.z < T5 * -1
          );
        };
        const findAfter = (ru: any, rl: any, lu: any, ll: any) => {
          return (
            ru.x !== 0 &&
            T8 < ru.y &&
            ru.y < O2 &&
            T6 * -1 < ru.z &&
            ru.z < 0 &&
            rl.x !== 0 &&
            rl.y !== 0 &&
            rl.z > 0 &&
            rl.z < T9 &&
            lu.x !== 0 &&
            O2 * -1 < lu.y &&
            lu.y < T8 * -1 &&
            lu.z > 0 &&
            lu.z < T6 &&
            ll.x !== 0 &&
            ll.y !== 0 &&
            T9 * -1 < ll.z &&
            ll.z < 0
          );
        };
        if (findBefore(poseRig.RightUpperArm, poseRig.RightLowerArm, poseRig.LeftUpperArm, poseRig.LeftLowerArm) && pointRef.current.length === 0) {
          pointRef.current.push(0);
        } else if (findAfter(poseRig.RightUpperArm, poseRig.RightLowerArm, poseRig.LeftUpperArm, poseRig.LeftLowerArm) && pointRef.current.length !== 0) {
          pointRef.current.pop();
        }
        */
        /*
        if (results.poseLandmarks[12].y > results.poseLandmarks[14].y && results.poseLandmarks[11].y > results.poseLandmarks[13].y && pointRef.current.length === 0) {
          pointRef.current.push(0);
        } else if (results.poseLandmarks[16].y > results.poseLandmarks[12].y && results.poseLandmarks[15].y > results.poseLandmarks[11].y && pointRef.current.length !== 0) {
          pointRef.current.pop();
        }
       */
        if (peers) sendToAllPeers(peers, { type: 'motion', data });

        // kalido에서 나온 값을 기반으로... vector의 계산이 있음, (0,-1,0)에서 rotation각도 구하고 BABYLON.Vector3(x,y,z)방향으로 나온 각도만큼 굴려보기
        // 손에서 어깨 방향으로 역으로 계산, 팔꿈치>손 각도 계산>굴리기, (0,-1,0)에서 팔꿈치 각도 계산, 아니면 어깨 위치 계산해서 모두다 어깨 위치 값만큼 뺀 뒤에 계산...
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
    // pose.onResults(onResults);
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
    console.log('onResults tnwjdehla');
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
      <Button
        style={{ height: '500px' }}
        onClick={e => {
          console.log(peers);
        }}
      >
        <span>
          dfsdfsdf sdfsdfsd fsdfdsf sdfsd fsdfsd fsdf dsfsdf sdfsd <br />
          fsdfsd fsdf sdf dfsdfsdf sdfsdfsd fsdfdsf sdfsd fsdfsd fsdf dsfsdf sdfsd fsdfsd fsdf sdf dfsdfsdf sdfsdfsd fsdfdsf sdfsd fsdfsd fsdf dsfsdf sdfsd fsdfsd fsdf sdf dfsdfsdf
          sdfsdfsd fsdfdsf sdfsd fsdfsd fsdf dsfsdf sdfsd fsdfsd fsdf sdf dfsdfsdf sdfsdfsd fsdfdsf sdfsd fsdfsd fsdf dsfsdf sdfsd fsdfsd fsdf sdf dfsdfsdf sdfsdfsd fsdfdsf sdfsd
          fsdfsd fsdf dsfsdf sdfsd fsdfsd fsdf sdf dfsdfsdf sdfsdfsd fsdfdsf sdfsd fsdfsd fsdf dsfsdf sdfsd fsdfsd fsdf sdf
        </span>
      </Button>
    </>
  );
};

export default ModelMotion;
