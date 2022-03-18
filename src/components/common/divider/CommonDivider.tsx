import { Flex, Divider } from "@chakra-ui/react";

const CommonDivider = () => {
  return (
    <Flex alignItems={'center'} h="4%">
      <Divider variant={'dashed'} />
    </Flex>
  );
};
export default CommonDivider;
