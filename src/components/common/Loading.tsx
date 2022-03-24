import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const Loading: FC = ({ children }) => {
  return (
    <Center w="full" h="100vh">
      <VStack>
        <Spinner boxSize="300px" color="red.500" mb={20} />
        <Text fontSize="6xl">Loading...</Text>
      </VStack>
      {children}
    </Center>
  );
};

export default Loading;
