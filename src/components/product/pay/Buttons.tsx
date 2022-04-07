import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Buttons = ({ tabIndex, setTabIndex }) => {
  const router = useRouter();
  return (
    <Flex justifyContent={'space-between'} h="100px" mt={'10%'}>
      <Button colorScheme={"blue"} w="23%" fontSize={'2xl'} onClick={() => setTabIndex(tabIndex - 1)}>
        ← 戻る
      </Button>
      <Button colorScheme={"blue"} onClick={() => setTabIndex(tabIndex + 1)} fontSize={'2xl'} w="23%">
        次へ →
      </Button>
    </Flex>
  );
};
export default Buttons;
