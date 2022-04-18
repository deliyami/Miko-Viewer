// import { model } from '@src/state/recoil';
import { roomMemberMotions } from '@src/state/shareObject';
import 'babylonjs-loaders';
import { FC, useEffect, useRef } from 'react';

export const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId: string;
  onAntialias?: boolean | undefined;
  isMyAvatar?: boolean | undefined;
}> = ({ height, path, peerId, width, onAntialias, isMyAvatar }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    const worker = new Worker(new URL('@src/worker/AvatarModel.worker.ts', import.meta.url), { type: 'module' });

    if ('OffscreenCanvas' in window) {
      const offCanvas = canvasRef.current.transferControlToOffscreen();
      worker.postMessage({ type: 'init', canvas: offCanvas, path, width, height, newPeerId: peerId }, [offCanvas]);
    }

    const avatarSettingInterval = setInterval(() => {
      const newMotionData = roomMemberMotions[peerId];
      if (newMotionData) worker?.postMessage({ type: 'motionChange', thisUserMotion: newMotionData });
    }, 60);

    return () => {
      worker.terminate();
      clearInterval(avatarSettingInterval);
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};
