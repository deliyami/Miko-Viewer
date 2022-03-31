import { Text } from '@chakra-ui/react';

const Title = ({ title }) => {
  return (
    <Text fontWeight={'bold'} fontSize="3xl" alignSelf={'center'} mb="4%">
      {title}
    </Text>
  );
};
export default Title;
