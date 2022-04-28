import { FC, useEffect, useRef } from 'react';

type DoneProps = {
  itemId: number;
  loop?: boolean;
  autoplay?: boolean;
  width?: number;
};

type URL = string;
type ART_BOARD = string;
type ANIMATION = string | string[];

const EMOJI_RIVE = '/rive/emoji.riv';
const ANIMATION_1 = ['Animation 1'];

const RIVE_ANIMATION_PARAMS: [URL, ART_BOARD, ANIMATION][] = [
  [EMOJI_RIVE, 'Money', ANIMATION_1],
  [EMOJI_RIVE, 'Wink', ANIMATION_1],
  [EMOJI_RIVE, 'Bug', ANIMATION_1],
  [EMOJI_RIVE, 'Big Smile', ANIMATION_1],
  [EMOJI_RIVE, 'Laught', ANIMATION_1],
  [EMOJI_RIVE, 'Question', ANIMATION_1],
  [EMOJI_RIVE, 'Question', ANIMATION_1],
  [EMOJI_RIVE, 'Question', ANIMATION_1],
  [EMOJI_RIVE, 'Question', ANIMATION_1],
];

export const DoneIcon: FC<DoneProps> = ({ itemId, loop = true, autoplay = true, width = 100 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const worker = new Worker(new URL('@src/worker/rive.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = function (oEvent) {
      console.info('Worker said : ', oEvent);
    };
    worker.onerror = e => console.info;

    if ('OffscreenCanvas' in window) {
      const el = canvasRef.current;
      const canvas = el.transferControlToOffscreen();
      const [url, artboardName, animations] = RIVE_ANIMATION_PARAMS[itemId];

      worker.postMessage({ canvas, url, artboardName, animations }, [canvas]);
    }
  }, []);

  return <canvas ref={canvasRef} width={`${width}px`} height={`${width}px`} />;
};
