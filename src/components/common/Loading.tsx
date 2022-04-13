import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

const Loading: FC<{ children?: ReactElement }> = ({ children }) => {
  return (
    <Center w="full" h="100vh">
      <VStack>
        <Spinner boxSize="300px" color="red.500" mb={20} />
        <Text fontSize="6xl">Loading...</Text>
        {children}
      </VStack>
    </Center>
  );
};

export default Loading;
