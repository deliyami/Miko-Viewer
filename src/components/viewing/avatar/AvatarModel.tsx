// import { model } from '@src/state/recoil';
import { toastLog } from '@src/helper';
import { roomMemberMotions } from '@src/state/shareObject';
import 'babylonjs-loaders';
import { FC, useEffect } from 'react';

export const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId: string;
  onAntialias?: boolean | undefined;
  isMyAvatar?: boolean | undefined;
}> = ({ height, path, peerId, width, onAntialias, isMyAvatar }) => {
  const tagId = 'avatar' + peerId;

  useEffect(() => {
    const worker = new Worker(new URL('@src/worker/AvatarModel.worker.ts', import.meta.url), { type: 'module' });

    worker.onerror = e => {
      toastLog('error', 'avatar worker error', '', e.error);
    };
    worker.onmessageerror = e => {
      toastLog('error', 'avatar worker mesage error', '');
      console.log('worker message error', e);
    };

    if ('OffscreenCanvas' in window) {
      const aCanvas = document.getElementById(tagId) as HTMLCanvasElement;
      if (!aCanvas.className) {
        aCanvas.className = 'used-canvas-one-more-time';
        const offCanvas = aCanvas.transferControlToOffscreen();

        worker.postMessage({ type: 'init', canvas: offCanvas, path, width, height, newPeerId: peerId }, [offCanvas]);
      }
    } else {
      toastLog('info', 'OffScreen Canvas 미지원 브라우저');
    }

    const avatarSettingInterval = setInterval(() => {
      const newMotionData = roomMemberMotions[peerId];
      if (newMotionData) worker?.postMessage({ type: 'motionChange', thisUserMotion: newMotionData });
    }, 60);

    return () => {
      worker.terminate();
      clearInterval(avatarSettingInterval);
    };
  }, []);

  return <canvas id={tagId} />;
};
