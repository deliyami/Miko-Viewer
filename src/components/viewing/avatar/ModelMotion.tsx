import '@mediapipe/camera_utils';
import * as cam from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import '@mediapipe/drawing_utils';
import { Pose, Results } from '@mediapipe/pose';
import { model } from '@src/components/viewing/avatar/GlobalModel';
import { motion } from '@src/components/viewing/avatar/GlobalMotion';
import sendToAllPeers from '@src/helper/sendToAllPeers';
import { setBorn } from '@src/helper/setBornAvatar';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { ChatMotionInterface } from '@src/types/ChatMotionType';
import * as Kalidokit from 'kalidokit';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
// motion module...? function module? 어찌되었던 and motion algorithm
const ModelMotion: FC<{ mediaStream: MediaStream; myPeerId: string }> = ({ mediaStream, myPeerId }) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const countRef = useRef<number>(0);
  const camera = useRef<cam.Camera | null>(null);
  const [peers, setPeers] = useRecoilState(peerDataListState);
  const [peerChange, setPeerChange] = useState(false);
  const poseRef = useRef<Pose>(null);
  const pointRef = useRef<number[]>([]);

  const user = useUser();

  // AVATAR mediapipe 데이터가 적절하게 나오는 곳
  const onResults = useCallback(
    (results: Results) => {
      if (
        /* eslint-disable */
        model &&
        model[myPeerId] &&
        model[myPeerId].borns &&
        model[myPeerId].originalBorns &&
        model[myPeerId].scene &&
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
        if (peers && countRef.current % 5 === 0 && sendToAllPeers) {
          countRef.current = 0;
          const data: ChatMotionInterface = {
            sender: user.data.name,
            motion: { pose: poseRig, face: faceRig },
          };
          sendToAllPeers(peers, { type: 'motion', data });
        }
        const anotherPeerId = motion.sender;

        // const T4 = 0.4;
        // const T5 = 0.5;
        // const T6 = 0.6;
        // const T7 = 0.7;
        // const T8 = 0.8;
        // const T9 = 0.9;
        // const O2 = 1.2;
        // const findBefore = (ru: any, rl: any, lu: any, ll: any) => {
        //   return (
        //     ru.x > 0 &&
        //     ru.x <= T4 &&
        //     T7 < ru.y &&
        //     ru.y < O2 &&
        //     ru.z > 0 &&
        //     ru.z <= T4 &&
        //     rl.y !== 0 &&
        //     T5 < rl.z &&
        //     lu.x > 0 &&
        //     lu.x <= T4 &&
        //     O2 * -1 < lu.y &&
        //     lu.y < T7 * -1 &&
        //     T4 * -1 < lu.z &&
        //     lu.z <= 0 &&
        //     ll.y !== 0 &&
        //     ll.z < T5 * -1
        //   );
        // };
        // const findAfter = (ru: any, rl: any, lu: any, ll: any) => {
        //   return (
        //     ru.x !== 0 &&
        //     T8 < ru.y &&
        //     ru.y < O2 &&
        //     T6 * -1 < ru.z &&
        //     ru.z < 0 &&
        //     rl.x !== 0 &&
        //     rl.y !== 0 &&
        //     rl.z > 0 &&
        //     rl.z < T9 &&
        //     lu.x !== 0 &&
        //     O2 * -1 < lu.y &&
        //     lu.y < T8 * -1 &&
        //     lu.z > 0 &&
        //     lu.z < T6 &&
        //     ll.x !== 0 &&
        //     ll.y !== 0 &&
        //     T9 * -1 < ll.z &&
        //     ll.z < 0
        //   );
        // };
        // if (findBefore(poseRig.RightUpperArm, poseRig.RightLowerArm, poseRig.LeftUpperArm, poseRig.LeftLowerArm) && pointRef.current.length === 0) {
        //   console.log('yes');
        //   pointRef.current.push(0);
        // } else if (findAfter(poseRig.RightUpperArm, poseRig.RightLowerArm, poseRig.LeftUpperArm, poseRig.LeftLowerArm) && pointRef.current.length !== 0) {
        //   console.log('no');
        //   pointRef.current.pop();
        // }

        if (results.poseLandmarks[12].y > results.poseLandmarks[14].y && results.poseLandmarks[11].y > results.poseLandmarks[13].y && pointRef.current.length === 0) {
          console.log('pushing');
          pointRef.current.push(0);
        } else if (results.poseLandmarks[16].y > results.poseLandmarks[12].y && results.poseLandmarks[15].y > results.poseLandmarks[11].y && pointRef.current.length !== 0) {
          console.log('popping');
          pointRef.current.pop();
        }

        for (const peerId in model) {
          if (peerId === anotherPeerId && peerId !== myPeerId) {
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
        // CDN
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
          display: 'hidden',
          position: 'absolute',
          width: 320,
          height: 240,
        }}
      ></video>
    </>
  );
};

export default ModelMotion;
