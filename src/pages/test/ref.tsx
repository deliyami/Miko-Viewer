import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const Page = () => {
  const refTest = useRef(1);
  const [fireRender, setFireRender] = useState(0);

  useEffect(() => {
    console.info('refTest useEffect');
  }, [refTest]); // not fire!

  useEffect(() => {
    console.info('refTest.current useEffect');
  }, [refTest.current]); // work !

  console.info(refTest);
  return (
    <Box>
      <Text>{refTest.current}</Text>
      <Button onClick={() => setFireRender(prev => prev + 1)}>render</Button>
      <Button
        onClick={() => {
          refTest.current += 1;
        }}
      >
        ref update
      </Button>
    </Box>
  );
};

export default Page;
