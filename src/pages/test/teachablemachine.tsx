import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const speechCommands = require('@tensorflow-models/speech-commands/dist/speech-commands');

const Teachablemachine = () => {
  const [mostPossibility, setMostPossibility] = useState('');
  const URL = 'https://teachablemachine.withgoogle.com/models/_k_yQ3H23/';

  useEffect(() => {
    init();
  }, []);

  async function createModel() {
    const checkpointURL = URL + 'model.json'; // model topology
    const metadataURL = URL + 'metadata.json'; // model metadata

    const recognizer = speechCommands.create(
      'BROWSER_FFT', // fourier transform type, not useful to change
      undefined, // speech commands vocabulary feature, not useful for your models
      checkpointURL,
      metadataURL,
    );

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();
    // https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js"><
    return recognizer;
  }

  async function init() {
    const recognizer = await createModel();
    console.log('recognizer', recognizer);
    // recognizer.stopListening();
    const classLabels = recognizer.wordLabels(); // get class labels
    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(
      result => {
        const score = result.scores; // probability of prediction for each class
        // render the probability scores per class
        // setArr([]);
        for (let i = 0; i < classLabels.length; i++) {
          // const classPrediction = classLabels[i] + ': ' + result.scores[i].toFixed(2) * 100;
          if (result.scores[i].toFixed(2) * 100 >= 80) setMostPossibility(classLabels[i]);
        }
      },
      {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.1, // probably want between 0.5 and 0.75. More info in README
      },
    );

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
  }

  return (
    <Box>
      {/* <Button onClick={init}>목소리 판별</Button> */}
      判別: {mostPossibility}
    </Box>
  );
};

export default Teachablemachine;
