import { Box, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const AudioVisualizer = ({ audioData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [canvasTag, setCanvasTag] = useState([]);
  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = window.innerWidth*0.1;
    // canvas.height = window.innerHeight*0.5;
    canvas.width = 200;
    canvas.height = 200;

    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.fillStyle = "green";

    volumeDraw(audioData);
   
    function volumeDraw(level){
        const value = String(level).slice(0,1);
        let x = 0;
        let h = 15;
        let y = 100;
        for(let i=0; i<parseInt(value); i++){
            x += 13;
            h = h+5;
            y = y-5;
            context.fillRect(x, y, 7, h);
        }
    }
    setCtx(contextRef.current);
    setCanvasTag(canvas);
  }, [audioData]);

  // function draw() {
  //     var canvas = document.getElementById('canvas');
  //     if (ctx) {
  //     //   var ctx = canvas.getContext('2d');

  //       ctx.fillRect(25, 25, 100, 100);
  //       ctx.clearRect(45, 45, 60, 60);
  //       ctx.strokeRect(50, 50, 50, 50);
  //     }
  //   }

  return (
    <Box border={'solid'}>
      <Text>{audioData}</Text>
      <canvas style={{ border: 'solid' }} ref={canvasRef}></canvas>
    </Box>
  );
};
export default AudioVisualizer;
