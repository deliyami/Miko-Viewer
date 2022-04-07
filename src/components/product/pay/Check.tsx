import { Flex, Text } from '@chakra-ui/react';
import Buttons from './Buttons';

const Check = ({tabIndex, setTabIndex}) => {
  // console.log(address);
  return (
    <Flex flexDirection={'column'} w={'50%'} h="100%" p={'2%'} ml={'25%'}>
      <Text>check</Text>
      <Buttons tabIndex={tabIndex} setTabIndex={setTabIndex}></Buttons>
    </Flex>
  );
};
export default Check;
