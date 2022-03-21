import { Flex, Divider } from '@chakra-ui/react/node_modules/@chakra-ui/layout';

const CommonDivider = () => {
  return (
    <Flex alignItems={'center'} h="4%">
      <Divider variant={'dashed'} />
    </Flex>
  );
};
export default CommonDivider;
