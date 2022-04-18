// import { model } from '@src/state/recoil';
import { peerDataListState } from '@src/state/recoil';
import { roomMemberMotions } from '@src/state/shareObject';
import 'babylonjs-loaders';
import { FC, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

export const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId: string;
  antialias?: boolean | undefined;
  myAvatar?: boolean | undefined;
}> = ({ ...props }) => {
  const { width, height, path, peerId, myAvatar, ...rest } = props;
  const peers = useRecoilValue(peerDataListState);
  const canvasRef = useRef(null);
  // const workerRef = useRef<Worker>();
  useEffect(() => {
    const worker = new Worker(new URL('@src/worker/AvatarModel.worker.ts', import.meta.url), { type: 'module' });
    const avatarSettingInterval = setInterval(() => {
      const thisUserMotion = roomMemberMotions[peerId];
      if (thisUserMotion) worker?.postMessage({ type: 'motionChange', thisUserMotion });
    }, 60);
    // let motionSendInterval: NodeJS.Timer;
    // if (myAvatar) {
    //   motionSendInterval = setInterval(() => {
    //     const sendMotion = sendMotionForFrames.getMotionObject();
    //     if (sendMotion.motion) {
    //       sendToAllPeers(peers, { type: 'motion', data: sendMotion });
    //     }
    //   }, 60);
    // }
    // workerRef.current = worker;
    if ('OffscreenCanvas' in window) {
      const offCanvas = canvasRef.current.transferControlToOffscreen();
      worker.postMessage({ type: 'init', canvas: offCanvas, path, width, height, newPeerId: peerId }, [offCanvas]);
    }

    return () => {
      clearInterval(avatarSettingInterval);
      // if (myAvatar) {
      //   clearInterval(motionSendInterval);
      // }
      worker.terminate();
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} {...rest}></canvas>;
};
