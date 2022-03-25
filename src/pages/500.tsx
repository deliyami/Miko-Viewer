import { Center, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Custom500Page: FC = () => {
  return (
    <Center w="full" h="100vh">
      <Text>500 - Server-side error occurred</Text>
    </Center>
  );
};

export default Custom500Page;
