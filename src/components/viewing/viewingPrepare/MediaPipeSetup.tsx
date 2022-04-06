import * as cam from '@mediapipe/camera_utils';
import { Results } from '@mediapipe/pose';
import { isMediaPipeOn } from '@src/const';
import { setBorn } from '@src/helper/setBornAvatar';
import { model } from '@src/state/recoil/modelState';
import { latestMotionState } from '@src/state/recoil/motionState';
import { myStreamState, peerDataListState } from '@src/state/recoil/viewingState';
import { sendMotionForFrames } from '@src/state/shareObject/shareMotionObject';
import { addedScoreForSeconds } from '@src/state/shareObject/shareObject';
import { aPose } from '@src/state/shareObject/sharePose';
import { useUser } from '@src/state/swr/useUser';
import * as Kalidokit from 'kalidokit';
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  //   isMediaPipeSetup: boolean;
  setIsMediaPipeSetup: Dispatch<SetStateAction<boolean>>;
};

const VIDEO_WIDTH = 320;
const VIDEO_HEIGHT = 240;

const MediaPipeSetup: FC<Props> = ({ setIsMediaPipeSetup }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const myStream = useRecoilValue(myStreamState);
  const peers = useRecoilValue(peerDataListState);
  const motionState = useRecoilValue(latestMotionState);
  const modelState = useRecoilValue(model);
  const user = useUser();
  const pointRef = useRef<number[]>([]);
  const myPeerId = user.data.uuid;
  const [peerChange, setPeerChange] = useState(false);

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
          video: videoRef?.current,
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
          pointRef.current.push(0);
        } else if (results.poseLandmarks[16].y > results.poseLandmarks[12].y && results.poseLandmarks[15].y > results.poseLandmarks[11].y && pointRef.current.length !== 0) {
          pointRef.current.pop();
          addedScoreForSeconds.addScore(Math.floor(Math.random() * 101) + 100);
        }
      }
    },
    [motionState, modelState, peers, user.data],
  );

  useEffect(() => {
    let camera: cam.Camera;
    const setupMediapipe = () => {
      if (videoRef.current) {
        let isMediaPipeSetup = false;
        camera = new cam.Camera(videoRef?.current, {
          onFrame: async () => {
            await aPose.initialize();
            aPose.send({ image: videoRef.current }); // NOTE  mediaPipe on off
            if (!isMediaPipeSetup) {
              isMediaPipeSetup = true;
              setIsMediaPipeSetup(true);
            }
          },
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
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
      if (isMediaPipeOn) {
        setupMediapipe();
      } else {
        setIsMediaPipeSetup(true);
      }
    }

    return () => {
      // camera?.stop();
    };
  }, [myStream, videoRef.current]);

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
};

export default MediaPipeSetup;
