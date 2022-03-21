import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const RankingView: FC = () => {
  return (
    <VStack width="full" backgroundColor="#202020" border="2px" borderColor="#262626" textColor="white">
      <Text fontSize="2xl">Ranking</Text>
      <HStack>
        <Text>1. 393432</Text>
      </HStack>
      <HStack>
        <Text>2. 393432</Text>
      </HStack>
      <HStack>
        <Text>3. 393432</Text>
      </HStack>
      <Divider />
      <HStack>
        <Text>Me. 393432</Text>
      </HStack>
    </VStack>
  );
};

export default RankingView;
