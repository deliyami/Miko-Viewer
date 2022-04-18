import * as cam from '@mediapipe/camera_utils';
import { Results } from '@mediapipe/pose';
import { toastLog } from '@src/helper';
import { setBone } from '@src/helper/dynamic/setBoneAvatar';
import { isOnMediaPipeState, latestMotionState, model, myStreamState, peerDataListState } from '@src/state/recoil';
import { addedScoreForSeconds } from '@src/state/shareObject/shareAddedScoreForSeconds';
import { sendMotionForFrames } from '@src/state/shareObject/shareMotionObject';
import { aPose } from '@src/state/shareObject/sharePose';
import { useUser } from '@src/state/swr';
import * as Kalidokit from 'kalidokit';
import React, { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilValue } from 'recoil';

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
  }
};

/* eslint-disable */
const MediaPipeSetup = memo<Props>(({ setIsMediaPipeSetup, setMediaPipeError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const myStream = useRecoilValue(myStreamState);
  const peers = useRecoilValue(peerDataListState);
  const isOnMediaPipe = useRecoilValue(isOnMediaPipeState);
  const motionState = useRecoilValue(latestMotionState);
  const modelState = useRecoilValue(model);
  const user = useUser();
  const pointRef = useRef<number[][]>([[], [], []]); //[[오른손],[왼손],[박수]]
  const myPeerId = user.data.uuid;
  const [peerChange, setPeerChange] = useState(false);

  // mediapipe 데이터가 적절하게 나오는 곳
  const onResults = useCallback(
    (results: Results) => {
      if (
        modelState &&
        modelState[myPeerId] &&
        modelState[myPeerId].bones &&
        modelState[myPeerId].originalBones &&
        modelState[myPeerId].scene &&
        results &&
        results.poseLandmarks &&
        results.poseWorldLandmarks &&
        results.segmentationMask
      ) {
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
        setBone(modelState[myPeerId], myPeerId, poseRig, faceRig);
        if (peers && sendMotionForFrames) {
          const myMotion = { pose: poseRig, face: faceRig };
          sendMotionForFrames.setMotionStatus(myMotion);
        }

        // if (results.poseLandmarks[12].y < results.poseLandmarks[16].y && pointRef.current[0].length === 0) {
        //   pointRef.current[0].push(0);
        // } else if (results.poseLandmarks[16].y < (results.poseLandmarks[12].y + results.poseLandmarks[14].y) / 2 && pointRef.current[0].length !== 0) {
        //   pointRef.current[0].pop();
        //   addedScoreForSeconds.addScore(Math.floor(Math.random() * 101) + 30);
        // }
        checkResultsY(results, pointRef.current[0], 12);
        checkResultsY(results, pointRef.current[1], 11);
      }
    },
    [motionState, modelState, peers, user.data],
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
