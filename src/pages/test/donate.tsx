import { Button, Center } from '@chakra-ui/react';
import { DONATEITEM } from '@src/state/shareObject/shareDonateObject';

const Child = () => {
  return (
    <Center w="full" h="100vh">
      <Button
        onClick={() => {
          console.log(DONATEITEM);
        }}
      >
        sdfasdf
      </Button>
    </Center>
  );
};

export default Child;
