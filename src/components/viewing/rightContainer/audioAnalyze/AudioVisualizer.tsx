import { Box, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const AudioVisualizer = ({ audioData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 200;
    canvas.height = 20;
    canvas.style.background = '#222222';
    const context = canvas.getContext('2d');

    contextRef.current = context;
    context.fillStyle = 'white';
    // context.globalAlpha = 0.8;
    // context.strokeStyle = '#003300';
    context.fillRect(10, 7, 180, 7);

    function volumeDraw(level) {
      console.log(level);
      // const x = 0;
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
      } else if (level > 450 && level <= 1000) {
        volume = 10;
      }
      console.log(volume);
      if (volume <= 10 && volume >= 1) {
        // eslint-disable-next-line no-plusplus
        // for (let j = 0; j < volume; j++) {
        // console.log(Math.floor(parseInt(value)/10));
        // x += 15;
        context.beginPath();
        // 15~185
        // 3~57
        context.arc(15 * volume, 10, 8, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = '#70F1E9';
        context.fill();
        // }
      }
      // eslint-disable-next-line no-plusplus
    }
    volumeDraw(audioData);
  }, [audioData]);

  return (
    <Box>
      <Text>{audioData}</Text>
      <canvas style={{ border: 'solid' }} ref={canvasRef}></canvas>
    </Box>
  );
};
export default AudioVisualizer;
