import '@mediapipe/camera_utils';
import * as cam from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import '@mediapipe/drawing_utils';
import { Pose, Results } from '@mediapipe/pose';
import { setBorn } from '@src/helper/setBornAvatar';
import { model } from '@src/state/recoil/modelState';
import { latestMotionState } from '@src/state/recoil/motionState';
import { peerDataListState } from '@src/state/recoil/viewingState';
import { sendMotionForFrames } from '@src/state/shareObject/shareMotionObject';
import { addedScoreForSeconds } from '@src/state/shareObject/shareObject';
import { useUser } from '@src/state/swr/useUser';
import * as Kalidokit from 'kalidokit';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ModelMotion: FC<{ mediaStream: MediaStream; myPeerId: string }> = ({ mediaStream, myPeerId }) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const camera = useRef<cam.Camera | null>(null);
  const [peers, setPeers] = useRecoilState(peerDataListState);
  const motionState = useRecoilValue(latestMotionState);
  const modelState = useRecoilValue(model);
  const [peerChange, setPeerChange] = useState(false);
  const poseRef = useRef<Pose>(null);
  const pointRef = useRef<number[]>([]);

  const user = useUser();

  // mediapipe 데이터가 적절하게 나오는 곳
  const onResults = useCallback(
    (results: Results) => {
      if (
        /* eslint-disable */
        modelState &&
        modelState[myPeerId] &&
        modelState[myPeerId].borns &&
        modelState[myPeerId].originalBorns &&
        modelState[myPeerId].scene &&
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
        // 적절하게 render 호출하는 메소드 setBorn
        setBorn(modelState[myPeerId], myPeerId, poseRig, faceRig);
        if (peers && sendMotionForFrames) {
          const myMotion = { pose: poseRig, face: faceRig };
          sendMotionForFrames.setMotionStatus(myMotion);
        }

        if (results.poseLandmarks[12].y > results.poseLandmarks[14].y && results.poseLandmarks[11].y > results.poseLandmarks[13].y && pointRef.current.length === 0) {
          console.log('pushing');
          pointRef.current.push(0);
        } else if (results.poseLandmarks[16].y > results.poseLandmarks[12].y && results.poseLandmarks[15].y > results.poseLandmarks[11].y && pointRef.current.length !== 0) {
          console.log('popping');
          pointRef.current.pop();
          addedScoreForSeconds.addScore(Math.floor(Math.random() * 101) + 100);
        }
      }
    },
    [motionState, modelState, peers, user.data],
  );
  function setupMediapipe() {
    const pose = new Pose({
      locateFile: file => {
        // CDN
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    poseRef.current = pose;
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
