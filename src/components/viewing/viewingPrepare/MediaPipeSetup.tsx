import * as cam from '@mediapipe/camera_utils';
import { Results } from '@mediapipe/pose';
import { toastLog } from '@src/helper';
import { isOnMediaPipeState, latestMotionState, myStreamState, peerDataListState } from '@src/state/recoil';
import { addedScoreForSeconds } from '@src/state/shareObject';
import { sendMotionForFrames } from '@src/state/shareObject/shareMotionObject';
import { aPose } from '@src/state/shareObject/sharePose';
import { useUser } from '@src/state/swr';
import { MotionInterface } from '@src/types/avatar/ChatMotionType';
import * as Kalidokit from 'kalidokit';
import React, { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
<<<<<<< HEAD
=======
import { sendToAllPeers, toastLog } from '@src/helper';
import { isOnMediaPipeState, latestMotionState, myStreamState, peerDataListState } from '@src/state/recoil';
import { addedScoreForSeconds, roomMemberMotions } from '@src/state/shareObject';
>>>>>>> tmp2

type Props = {
  //   isMediaPipeSetup: boolean;
  setIsMediaPipeSetup: Dispatch<SetStateAction<boolean>>;
  setMediaPipeError: SetterOrUpdater<string>;
};

const VIDEO_WIDTH = 320;
const VIDEO_HEIGHT = 240;

const checkResultsY = (results: Results, point: number[], firstIndex: number) => {
  if (results.poseLandmarks[firstIndex].y < results.poseLandmarks[firstIndex + 4].y && point.length === 0) {
    point.push(0);
  } else if (results.poseLandmarks[firstIndex + 4].y < (results.poseLandmarks[firstIndex].y + results.poseLandmarks[firstIndex + 2].y) / 2 && point.length !== 0) {
    point.pop();
    addedScoreForSeconds.addScore(Math.floor(Math.random() * 101) + 30);
    console.log('팔들기', firstIndex);
  }
};

const clapResultsX = (results: Results, point: number[]) => {
  const maxValue = Math.max(results.poseLandmarks[15].x, results.poseLandmarks[16].x);
  const minValue = Math.max(results.poseLandmarks[15].x, results.poseLandmarks[16].x);
  if (!maxValue || !minValue) return;
  if (maxValue - minValue < 0 && point.length === 0) {
    point.push(0);
  } else if (point.length !== 0) {
    point.pop();
    addedScoreForSeconds.addScore(Math.floor(Math.random() * 101) + 30);
    console.log('박수 테스트');
  }
};

/* eslint-disable */
const MediaPipeSetup = memo<Props>(({ setIsMediaPipeSetup, setMediaPipeError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const myStream = useRecoilValue(myStreamState);
  const peers = useRecoilValue(peerDataListState);
  const isOnMediaPipe = useRecoilValue(isOnMediaPipeState);
  const motionState = useRecoilValue(latestMotionState);
  const user = useUser();
  const pointRef = useRef<number[][]>([[], [], []]); //[[오른손],[왼손],[박수]]
  const myPeerId = user.data.uuid;
  const [peerChange, setPeerChange] = useState(false);

  useEffect(() => {
    const sendInterval = setInterval(() => {
      const setMotion = sendMotionForFrames.getMotionObject();
      // NOTE 모션 값이 있을 때만 발송
      if (setMotion && setMotion.motion) sendToAllPeers(peers, { type: 'motion', data: setMotion });
    }, 100);
    return () => {
      clearInterval(sendInterval);
    };
  }, [peers]);

  // mediapipe 데이터가 적절하게 나오는 곳
  const onResults = useCallback(
    (results: Results) => {
      if (results && results.poseLandmarks && results.poseWorldLandmarks && results.segmentationMask) {
        const poseRig = Kalidokit.Pose.solve(results.poseWorldLandmarks, results.poseLandmarks, {
          runtime: 'mediapipe',
          video: videoRef?.current,
          enableLegs: false,
        });
        const faceRig = {
          center: results.poseLandmarks[0].x,
          left: results.poseLandmarks[7].x,
          right: results.poseLandmarks[8].x,
        };
        // 적절하게 render 호출하는 메소드 setBone
        // setBone(modelListObject[myPeerId], myPeerId, poseRig, faceRig);
        if (peers && sendMotionForFrames) {
          const myMotion = { pose: poseRig, face: faceRig } as MotionInterface;
          roomMemberMotions[myPeerId] = myMotion;
          sendMotionForFrames.setMotionStatus(myMotion);
        }

        checkResultsY(results, pointRef.current[0], 12);
        checkResultsY(results, pointRef.current[1], 11);
        clapResultsX(results, pointRef.current[2]);
      }
    },
    [motionState, peers, user.data],
  );

  useEffect(() => {
    let camera: cam.Camera;
    let latestPoseEnded = true;
    const setupMediapipe = () => {
      if (videoRef.current) {
        let isMediaPipeSetup = false;
        camera = new cam.Camera(videoRef?.current, {
          onFrame: async () => {
            try {
              await aPose.initialize();
              if (latestPoseEnded && isOnMediaPipe) {
                latestPoseEnded = false;
                //  TODO  send 2번쨰 인자 at 의미
                aPose
                  .send({ image: videoRef.current })
                  .then(() => {
                    latestPoseEnded = true;
                  })
                  .catch(err => {
                    console.error('media pipe error', err);
                  });
              } else {
              }
              if (!isMediaPipeSetup) {
                isMediaPipeSetup = true;
                setIsMediaPipeSetup(true);
              }
            } catch (err) {
              toastLog('error', 'mediaPipe error');
              console.error(err);
              setMediaPipeError(err);
            }
          },
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
          // facingMode:'user' // TODO 이 옵션 의미
        });
        camera.start().then(() => {
          console.log('MediaPipe - Camera Start ✅');
        });
        setPeerChange(true);
      }
    };
    if (myStream) {
      const videoElement = videoRef.current;
      videoElement.srcObject = myStream;
      videoElement.volume = 0;
      if (isOnMediaPipe) {
        setupMediapipe();
      } else {
        setIsMediaPipeSetup(true);
      }
    }

    return () => {
      // camera?.stop();
    };
  }, [myStream, videoRef.current, isOnMediaPipe]);

  useEffect(() => {
    aPose.onResults(onResults);
  }, [peerChange, onResults]);

  return (
    <>
      <video
        ref={videoRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
        }}
      ></video>
    </>
  );
});

export default MediaPipeSetup;
