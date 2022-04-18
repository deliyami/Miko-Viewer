import { Center } from '@chakra-ui/react';
import { modelListState } from '@src/state/recoil';
import { FC, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

const AvatarModel: FC<{
  width: number;
  height: number;
  path: string;
  peerId?: string | undefined;
  antialias?: boolean | undefined;
}> = ({ ...props }) => {
  const { width, height, path, peerId, ...rest } = props;
  const canvasRef = useRef(null);
  const setModel = useSetRecoilState(modelListState);
  useEffect(() => {
    console.log('start');
    const worker = new Worker(new URL('@src/worker/AvatarModel.worker.ts', import.meta.url), { type: 'module' });
    if ('OffscreenCanvas' in window) {
      const el = document.getElementById('my_avatar') as HTMLCanvasElement;
      const canvas = el.transferControlToOffscreen();
      worker.postMessage({ canvas, path, width, height, peerId, setModel }, [canvas]);
      worker.onmessage = function (oEvent) {
        console.info('this is avatar:', oEvent);
        // canvas = oEvent.data.canvas;
      };
    }
  }, []);
  return (
    <Center w="full" h="100vh">
      <canvas ref={canvasRef} {...rest}></canvas>
    </Center>
  );
};

export default AvatarModel;
