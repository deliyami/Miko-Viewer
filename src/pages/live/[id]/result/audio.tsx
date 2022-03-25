import { Box } from '@chakra-ui/react';
import AudioVisualizer from '@src/components/result/AudioVisualizer';
import { useEffect, useState } from 'react';

const AudioAnalyser = () => {
  const [audioData, setAudioData] = useState(0);
  // console.log(test);

  // const [tick, setTick] = useState(0);
  // console.log('자식');
  // console.log(audio);
  // console.log(test);
  // let audioContext =  new AudioContext;
  // console.log(audio);
  // console.log(test);
  // useEffect(() => {
  //   console.log(test);
  //   if (test === true) {
  //     let volumeInterval = setInterval(()=>{
  //       const audioContext = new AudioContext();
  //       // console.log(audioContext);
  //       // console.log(audioContext);
  //       const analyser = audioContext.createAnalyser();
  //       // console.log(analyser);
  //       const dataArray = new Uint8Array(analyser.frequencyBinCount);
  //       // const dataArray = new Uint8Array(analyser.fftSize);
  //       analyser.getByteTimeDomainData(dataArray);
  //       console.log(dataArray);
  //       // for(const item of dataArray){
  //       //   console.log(item);
  //       // }
  //       // console.log(dataArray);
  //       const source = audioContext.createMediaStreamSource(audio);
  //       console.log(source);
  //       source.connect(analyser);
  //       // console.log(dataArray);
  //     },1000
  //     )
  // let volumeInterval = setInterval(()=>setAudioData(Math.floor(Math.random() * 100)),1000);
  //   return ()=>clearInterval(volumeInterval);
  // } else {
  //   console.log('no AudioContext');
  // }

  // let volumeInterval = setInterval(()=>setAudioData(),500);
  // }, [tick,test]);
  // console.log(audioContext);
  // audio.then(function(stream){
  //   const audioContext = new AudioContext();
  //   if(test==true){
  //     console.log(audioCtx);
  //     const audioSource = audioCtx.createMediaStreamSource(audio);
  //     const analyser = audioCtx.createAnalyser();
  //     analyser.fftSize=512;
  //     audioSource.connect(analyser);
  //     const dataArray = new Uint8Array(analyser.frequencyBinCount);

  //     function volumeCallback(){
  //       analyser.getByteFrequencyData(dataArray);
  //       let volumeSum = 0;
  //       for(const volume of dataArray) volumeSum+=volume;
  //       console.log(volumeSum);
  //     }
  //     setInterval(volumeCallback,2000);
  //   }
  // })
  async function audioAnalyse() {
    // eslint-disable-next-line func-names
    await navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      const audioContext = new AudioContext();
      // if(test==true){
      // console.log(audioCtx);
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      audioSource.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      // console.log(analyser.minDecibels);
      analyser.maxDecibels = 100;
      analyser.minDecibels = 30;

      function volumeCallback() {
        analyser.getByteTimeDomainData(dataArray);
        let volumeSum = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const volume of dataArray) volumeSum += volume;
        // console.log(volumeSum);
        // console.log(Math.round(parseInt(String(volumeSum).slice(2, 5))/10));
        // const volume = parseInt(String(volumeSum).slice(2, 4), 10) - 30;
        setAudioData(Math.round(parseInt(String(volumeSum).slice(2, 5), 10) / 10));
      }
      setInterval(volumeCallback, 1000);
    });
    // }
  }
  useEffect(() => {
    audioAnalyse();
  }, []);
  // console.log("렌더링");
  return (
    <Box>
      {/* <Text>{audioData}</Text> */}
      {/* <button onClick={()=>setTick(tick+1)}>tick</button> */}
      <AudioVisualizer audioData={audioData}></AudioVisualizer>
    </Box>
  );
};
export default AudioAnalyser;
