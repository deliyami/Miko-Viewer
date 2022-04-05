import { useEffect, useState } from 'react';

const Loading = () => {
  const [first, setFirst] = useState(1232132);

  useEffect(() => {
    console.info('2');
    return () => {
      console.info('3');
    };
  }, []);

  useEffect(() => {
    const worker = new Worker(new URL('../../worker/swPose.js', import.meta.url), { type: 'module' });
    worker.onmessage = function (oEvent) {
      console.info('Worker said : ', oEvent);
    };
    console.log(worker);

    worker.onerror = e => console.info;

    const canvas = document.getElementById('offscreen-canvas') as HTMLCanvasElement;
    const offscreen = canvas.transferControlToOffscreen();
    const init = () => {
      worker.postMessage({ canvas: offscreen }, [offscreen]);
      console.log('worker pose message');
    };
    init();
    return () => {};
  }, []);

  return (
    <div>
      aaaaaaaaaa
      <div
        onClick={() => {
          setFirst(Date.now());
        }}
      >
        {first}
      </div>
      <canvas id="offscreen-canvas"></canvas>
    </div>
  );
};

export default Loading;
