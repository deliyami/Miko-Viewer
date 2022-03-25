import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const AudioVisualizer = ({ audioData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log(audioData);
    // canvas.width = window.innerWidth*0.1;
    // canvas.height = window.innerHeight*0.5;
    canvas.width = 200;
    canvas.height = 200;

    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.fillStyle = 'green';

    function volumeDraw(level) {
      console.log(Math.floor(parseInt(level, 10) / 10 + 1));
      let x = 0;
      let h = 15;
      let y = 100;
      // eslint-disable-next-line no-plusplus
      for (let i = 3; i < Math.floor(parseInt(level, 10) / 10 + 1); i++) {
        // console.log(Math.floor(parseInt(value)/10));
        x += 15;
        h += 5;
        y -= 5;
        context.fillRect(x, y, 10, h);
      }
    }
    volumeDraw(audioData);
  }, [audioData]);

  return (
    <Box border={'solid'}>
      {/* <Text>{audioData}</Text> */}
      <canvas style={{ border: 'solid' }} ref={canvasRef}></canvas>
    </Box>
  );
};
export default AudioVisualizer;
