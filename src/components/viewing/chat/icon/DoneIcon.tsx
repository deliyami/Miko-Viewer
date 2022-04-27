import { DoneProps } from '@src/types/share';
import { FC, useEffect, useRef } from 'react';

const params = {
  src: '/rive/poison-loader.riv',
  autoplay: false,
};

export const DoneIcon: FC<DoneProps> = ({ path, loop = true, autoplay = true, width = 100 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const worker = new Worker(new URL('@src/worker/rive.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = function (oEvent) {
      console.info('Worker said : ', oEvent);
    };
    worker.onerror = e => console.info;

    if ('OffscreenCanvas' in window) {
      // const el = document.getElementById('rive_test') as HTMLCanvasElement;
      const el = canvasRef.current;
      const canvas = el.transferControlToOffscreen();
      // const ctx = canvas.getContext('2d');
      const url = `/rive/poison-loader.riv`;
      const animations = ['idle'];
      worker.postMessage({ canvas, url, animations }, [canvas]);
    }
  }, []);

  return <canvas ref={canvasRef} id="rive_test" width="300px" height="300px" />;
};
