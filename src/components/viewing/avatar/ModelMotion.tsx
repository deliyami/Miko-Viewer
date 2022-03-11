import "@mediapipe/camera_utils";
import * as cam from "@mediapipe/camera_utils";
import "@mediapipe/control_utils";
import "@mediapipe/drawing_utils";
import "@mediapipe/pose";
import { Pose, Results } from "@mediapipe/pose";
import sendToAllPeers from "@src/helper/sendToAllPeers";
import { myStreamState, peerDataListState } from "@src/state/recoil/viewingState";
import { useUser } from "@src/state/swr/useUser";
import { ChatMotionInterface } from "@src/types/ChatMotionType";
import { FaceDirection } from "@src/types/FaceDirectionType";
import { Model } from "@src/types/ModelType";
import * as BABYLON from "babylonjs";
import * as Kalidokit from "kalidokit";
import React, { FC, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { model } from "./GlobalModel";
import { motion } from "./GlobalMotion";

const bornReset = (borns: BABYLON.TransformNode[], originalBorns: BABYLON.Quaternion[]) => {
  for (let i = 0; i < borns.length; i++) {
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
  let x = bornX[1] - bornX[0]; // 3
  let y = bornY[1] - bornY[0]; // 0.1
  let z = bornZ[1] - bornZ[0]; // -4
  if (bornX[0] && bornY[0] && bornZ[0]) {
    //왼팔 보정
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
  let childX = bornX[2] - bornX[1];
  let childY = bornY[2] - bornY[1];
  let childZ = bornZ[2] - bornZ[1];
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

const setBorn = (model: { [peerId: string]: Model }, peerId: string, poseRig: Kalidokit.TPose, faceRig: FaceDirection<"left" | "center" | "right", number>) => {
  const userBorns = model[peerId];
  bornReset(userBorns.borns, userBorns.originalBorns);
  bornTurn(userBorns.borns, 15, poseRig, 0);
  bornTurn(userBorns.borns, 11, poseRig, 1);
  faceTurn(userBorns.borns, faceRig["center"], faceRig["left"], faceRig["right"]);
  userBorns.scene.render();
};

const ModelMotion: FC<{ mediaStream: MediaStream }> = ({ mediaStream }) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const camera = useRef<cam.Camera | null>(null);
  const peers = useRecoilValue(peerDataListState);
  const user = useUser();
  const myStream = useRecoilValue(myStreamState);
  const myPeerId = "kirari";

  const onResults = (results: Results) => {
    if (model && results && results.poseLandmarks && results.poseWorldLandmarks && results.segmentationMask) {
      // 0번 사용자 results를 window에 저장

      const poseRig = Kalidokit.Pose.solve(results.poseWorldLandmarks, results.poseLandmarks, {
        runtime: "mediapipe",
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
      if (peers) sendToAllPeers(peers, { type: "motion", data });

      // kalido에서 나온 값을 기반으로... vector의 계산이 있음, (0,-1,0)에서 rotation각도 구하고 BABYLON.Vector3(x,y,z)방향으로 나온 각도만큼 굴려보기
      // 손에서 어깨 방향으로 역으로 계산, 팔꿈치>손 각도 계산>굴리기, (0,-1,0)에서 팔꿈치 각도 계산, 아니면 어깨 위치 계산해서 모두다 어깨 위치 값만큼 뺀 뒤에 계산...
      const anotherPeerId = motion.sender;
      for (let peerId in model) {
        if (peerId === anotherPeerId) {
          setBorn(model, peerId, motion.motion.pose, motion.motion.face);
        }
      }
    }
  };

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
  function setupMediapipe() {
    const pose = new Pose({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
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
    return () => {
      camera.current?.stop();
      webcamRef.current = null;
      camera.current = null;
    };
  }

  return (
    <>
      <video
        ref={webcamRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          width: 320,
          height: 240,
        }}
      ></video>
    </>
  );
};

export default ModelMotion;
