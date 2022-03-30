import { Box, Text } from '@chakra-ui/react';
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
    canvas.height = 130;
    canvas.style.background = 'black';

    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.fillStyle = 'white';
    context.globalAlpha = 0.9;

    function volumeDraw(level) {
      // console.log(Math.floor(parseInt(level, 10) / 10));
      let x = 0;
      let h = 15;
      let y = 100;

      // 0~50
      // 50에서 500사이의 값이온다. 이걸
      console.log(level);
      let volume = null;
      if (level > 0 && level <= 50) {
        volume = 1;
      } else if (level > 50 && level <= 100) {
        volume = 2;
      } else if (level > 100 && level <= 150) {
        volume = 3;
      } else if (level > 150 && level <= 200) {
        volume = 4;
      } else if (level > 200 && level <= 250) {
        volume = 5;
      } else if (level > 250 && level <= 300) {
        volume = 6;
      } else if (level > 300 && level <= 350) {
        volume = 7;
      } else if (level > 350 && level <= 400) {
        volume = 8;
      } else if (level > 400 && level <= 450) {
        volume = 9;
      } else if (level > 450 && level <= 500) {
        volume = 10;
      }
      if (volume <= 10) {
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < volume; j++) {
          // console.log(Math.floor(parseInt(value)/10));
          x += 15;
          h += 5;
          y -= 5;
          context.fillRect(x, y, 10, h);
        }
      }
      // eslint-disable-next-line no-plusplus
    }
    volumeDraw(audioData);
  }, [audioData]);

  return (
    <Box border={'solid'}>
      <Text>{audioData}</Text>
      <canvas style={{ border: 'solid' }} ref={canvasRef}></canvas>
    </Box>
  );
};
export default AudioVisualizer;
