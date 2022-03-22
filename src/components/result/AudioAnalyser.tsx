import { Box, Text } from '@chakra-ui/react';
import AudioVisualizer from '@src/components/result/AudioVisualizer';
import { useEffect, useState } from 'react';

const AudioAnalyser = ({audio}) => {
  const [audioData, setAudioData] = useState(0);
  console.log("anldio = " + typeof audio);
  useEffect(() => {
    setAudioData(Math.floor(Math.random() * 100));
    const audioContext = new AudioContext();
    // const audio = new Uint8Array(0);
    console.log(audio);
    // let audioData = Math.floor(Math.random()*100);
    const analyser = audioContext.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    // const source = audioContext.createMediaStreamSource(audio);
    const source = audioContext.createMediaStreamSource(audio);
    console.log(dataArray);
    console.log('uE');
  }, []);

  return (
    <Box>
      <Text>{audioData}</Text>
      <AudioVisualizer audioData={audioData}></AudioVisualizer>
    </Box>
  );
};
export default AudioAnalyser;
