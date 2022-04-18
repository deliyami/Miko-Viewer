import { Center } from '@chakra-ui/react';
import { NEXT_URL } from '@src/const';
import { useEffect, useRef } from 'react';

const AvatarModel = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    console.log('start');
    const worker = new Worker(new URL('@src/worker/AvatarModel.worker.ts', import.meta.url), { type: 'module' });
    if ('OffscreenCanvas' in window) {
      const el = document.getElementById('my_avatar') as HTMLCanvasElement;
      const offCanvas = canvasRef.current.transferControlToOffscreen();
      worker.postMessage({ type: 'init', canvas: offCanvas, path: `${NEXT_URL}/resources/babylonjs/models/proseka/proseka_tmp.glb`, width: 300, height: 300, peerId: 'test' }, [
        offCanvas,
      ]);
      worker.onmessage = function (oEvent) {
        console.log(oEvent);
      };
    }
    return () => {
      worker.terminate();
    };
  }, []);
  return (
    <Center w="full" h="100vh">
      test
      <canvas ref={canvasRef}></canvas>
    </Center>
  );
};

export default AvatarModel;
