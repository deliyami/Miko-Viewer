import { Box } from '@chakra-ui/react';
import AudioAnalyser from '@src/components/result/AudioAnalyser';
import { useEffect, useState } from 'react';

const audio = ({ audio }) => {
  const [audioValue, setAudioValue] = useState({});
  //   useEffect(() => {
  //     setAudioData(Math.floor(Math.random() * 100));
  //     const audioContext = new AudioContext();
  //     const audio = new Uint8Array(0);
  //     console.log(audio);
  //     // let audioData = Math.floor(Math.random()*100);
  //     const analyser = audioContext.createAnalyser();
  //     const dataArray = new Uint8Array(analyser.frequencyBinCount);
  //     const source = audioContext.createMediaStreamSource(audio);
  //     console.log(dataArray);
  //     console.log('uE');
  //   }, []);
useEffect(()=>{
  getMicrophone();
},[])
  async function getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudioValue(audio);
  }

  return (
    <Box>
      {/* <Text>{audioData}</Text> */}
      <AudioAnalyser audio={audioValue}></AudioAnalyser>
    </Box>
  );
};
export default audio;
