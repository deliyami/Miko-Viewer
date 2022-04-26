import { Flex } from '@chakra-ui/react';
import AudioVisualizer from '@src/components/viewing/rightContainer/audioAnalyze/AudioVisualizer';
// import Teachablemachine from '@src/pages/test/teachablemachine';
import { isOnAudioAnalyzerState, myStreamState } from '@src/state/recoil';
import { addedScoreForSeconds } from '@src/state/shareObject/shareAddedScoreForSeconds';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const VOLUME_CHECK_INTERVAL = 1000 * 0.5;

const MAX_VOLUME = 300;
const MIN_VOLUME = 100;

const processVolume = (volume: number) => {
  const cut = Math.min(MAX_VOLUME, volume);
  const normalized = ((cut - MIN_VOLUME) / (MAX_VOLUME - MIN_VOLUME)) * 100;
  const rounded = Math.round(normalized);
  return Math.max(0, rounded);
};

const AudioAnalyser = () => {
  const myStream = useRecoilValue(myStreamState);
  const isOnAudioAnalyzer = useRecoilValue(isOnAudioAnalyzerState);

  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (myStream && isOnAudioAnalyzer) {
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(myStream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      audioSource.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const volumeCallback = () => {
        analyser.getByteTimeDomainData(dataArray);
        const volumeSum = dataArray.reduce((prev, cur) => prev + cur, 0);
        const processedVolume = processVolume(Math.max(0, volumeSum - 32500));
        setVolume(processedVolume);
        addedScoreForSeconds.addScore(processedVolume % 10, 'voice'); // 0~10 점
      };
      intervalId = setInterval(volumeCallback, VOLUME_CHECK_INTERVAL);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [myStream, isOnAudioAnalyzer]);

  return (
    <Flex width="full" flexBasis="30px" backgroundColor="#202020" border="2px" borderColor="#262626" textColor="white" py="1" px="0.5">
      <AudioVisualizer normalizedVolume={volume}></AudioVisualizer>
      {/* <Teachablemachine /> */}
    </Flex>
  );
};

export default AudioAnalyser;
