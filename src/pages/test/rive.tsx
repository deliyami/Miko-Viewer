import { Button, Center, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRive } from 'rive-react';

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}
const TextTestPage = () => {
  const params: Parameters<typeof useRive>[0] = { src: '/rive/emoji.riv', autoplay: true, artboard: 'Bother', animations: 'Animation 1' };
  const { RiveComponent, rive } = useRive(params);
  const [time, setTime] = useState(0);
  setInterval(() => {
    setTime(Date.now());
  }, 100);

  const stop = async () => {
    console.info('a');
    sleep(1000);
    console.info('b');
  };

  useEffect(() => {
    const worker = new Worker(new URL('@src/worker/rive.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = function (oEvent) {
      console.info('Worker said : ', oEvent);
    };
    worker.onerror = e => console.info;

    if ('OffscreenCanvas' in window) {
      const el = document.getElementById('rive_test') as HTMLCanvasElement;
      const canvas = el.transferControlToOffscreen();
      // const ctx = canvas.getContext('2d');
      const url = `/rive/poison-loader.riv`;
      const animations = ['idle'];
      worker.postMessage({ canvas, url, animations }, [canvas]);
    }
  }, []);

  return (
    <Center flexDir="column" width="100vw" height="100vh">
      <Button onClick={stop}>Sleep</Button>
      <canvas id="rive_test" width="300px" height="300px" />
      <Text>{time}</Text>
      <RiveComponent onMouseEnter={() => rive && rive.play()} />
    </Center>
  );
};

export default TextTestPage;
