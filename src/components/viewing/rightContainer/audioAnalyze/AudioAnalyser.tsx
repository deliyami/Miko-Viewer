import { Box } from '@chakra-ui/react';
import AudioVisualizer from '@src/components/viewing/rightContainer/audioAnalyze/AudioVisualizer';
import { useEffect, useState } from 'react';

const AudioAnalyser = () => {
  const [audioData, setAudioData] = useState(0);

  async function go() {
    await navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      audioSource.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function volumeCallback() {
        analyser.getByteTimeDomainData(dataArray);
        let volumeSum = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const volume of dataArray) volumeSum += volume;
        if (volumeSum - 32500 > 0) setAudioData(Math.floor(volumeSum - 32500));
      }
      setInterval(volumeCallback, 1000);
    });
    // }
  }
  useEffect(() => {
    go();
  }, []);
  // console.log("렌더링");
  return (
    <Box>
      <AudioVisualizer audioData={audioData}></AudioVisualizer>
    </Box>
  );
};
export default AudioAnalyser;
