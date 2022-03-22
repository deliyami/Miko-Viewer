import { Box, Text } from '@chakra-ui/react';
import AudioVisualizer from '@src/components/result/AudioVisualizer';
import { useEffect, useState } from 'react';

const AudioAnalyser = ({ audio }) => {
  const [audioData, setAudioData] = useState(0);
  console.log(audio);
  // useEffect(() => {
  let audioContext = null;
  useEffect(() => {
    audioContext = new AudioContext();
    setAudioData(Math.floor(Math.random() * 100));
    if (typeof audio === "object") {
      const analyser = audioContext.createAnalyser();
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      // const source = audioContext.createMediaStreamSource(aud);
      // const source = audioContext.createMediaStreamSource(audio);
      // source.connect(analyser);
      console.log('domaindata');
      console.log(analyser.getByteTimeDomainData(dataArray));
    }else{
      console.log("no AudioContext")
    }
  }, []);

  // const audio = new Uint8Array(0);
  // let audioData = Math.floor(Math.random()*100);
  // }, [audio]);

  return (
    <Box>
      <Text>{audioData}</Text>
      <AudioVisualizer audioData={audioData}></AudioVisualizer>
    </Box>
  );
};
export default AudioAnalyser;
