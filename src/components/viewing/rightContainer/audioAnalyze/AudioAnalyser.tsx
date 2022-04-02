import { Flex } from '@chakra-ui/react';
import AudioVisualizer from '@src/components/viewing/rightContainer/audioAnalyze/AudioVisualizer';
import { myStreamState } from '@src/state/recoil/viewingState';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const VOLUME_CHECK_INTERVAL = 1000 * 1;

const AudioAnalyser = () => {
  const myStream = useRecoilValue(myStreamState);
  const [volume, setAudioData] = useState(0);

  useEffect(() => {
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaStreamSource(myStream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    audioSource.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const volumeCallback = () => {
      analyser.getByteTimeDomainData(dataArray);
      const volumeSum = dataArray.reduce((prev, cur) => prev + cur, 0);
      if (volumeSum - 32500 > 0) setAudioData(Math.floor(volumeSum - 32500));
    };
    const intervalId = setInterval(volumeCallback, VOLUME_CHECK_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [myStream]);

  return (
    <Flex width="full" flexBasis="30px" backgroundColor="#202020" border="2px" borderColor="#262626" textColor="white" py="1" px="0.5">
      <AudioVisualizer volume={volume}></AudioVisualizer>
    </Flex>
  );
};

export default AudioAnalyser;
