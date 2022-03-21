import { Flex, Divider } from '@chakra-ui/react';

const CommonDivider = () => {
  return (
    <Flex alignItems={'center'} h="50px">
      <Divider variant={'dashed'} />
    </Flex>
  );
};
export default CommonDivider;
