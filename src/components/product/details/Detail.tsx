import { Flex, Image, Text } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';

const Detail = item => {
  console.log(item.item.detail);
  return (
    // <Flex flexDirection={"column"} alignItems={"center"}>
    // </Flex>
    // <Flex flexDirection={"column"}>
    // </Flex>
    <Flex justifyContent={'center'} flexDirection="column" alignItems={'center'}>
      <Text w={'50%'} border={'1px'} p="2%">
        {item.item.detail}
      </Text>
      <Image src={`${IMAGE_DOMAIN}product_image/${item.item.image}`} alt="product_image"></Image>
    </Flex>
  );
};
export default Detail;
