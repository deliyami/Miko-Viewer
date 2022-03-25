import { Box, Text } from '@chakra-ui/react';
import audio from '@src/pages/live/[id]/result/audio';
import { useEffect, useRef, useState } from 'react';

const AudioVisualizer = ({ audioData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [canvasTag, setCanvasTag] = useState([]);
  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log(audioData);
    // canvas.width = window.innerWidth*0.1;
    // canvas.height = window.innerHeight*0.5;
    canvas.width = 200;
    canvas.height = 200;

    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.fillStyle = "green";

    volumeDraw(audioData);
    //audioData를 0에서 100까지의 범위로 제한하기
    
 
    function volumeDraw(level){
        // const value = String(level).slice(0,2);

        console.log(Math.floor(parseInt(level)/10+1));
        let x = 0;
        let h = 15;
        let y = 100;
        for(let i=3; i<Math.floor(parseInt(level)/10+1); i++){
            // console.log(Math.floor(parseInt(value)/10));
            x += 15;
            h = h+5;
            y = y-5;
            context.fillRect(x, y, 10, h);
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
      {/* <Text>{audioData}</Text> */}
      <canvas style={{ border: 'solid' }} ref={canvasRef}></canvas>
    </Box>
  );
};
export default AudioVisualizer;
