/* eslint-disable jsx-a11y/alt-text */
import { Flex, Image, Text } from '@chakra-ui/react';
import { S3_URL } from '@src/const';

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
      <Image src={`${S3_URL}products/${item.item.image}`}></Image>
      {/* <Box w={"50%"} p={"2%"} border={"1px"}>
            </Box>
            <Box mt={"5%"} w={"40%"}>
                <Image src={item.`${S3_URL}${item.image}`}></Image>
            </Box> */}
      {/* <Box>
                <Text w={"50%"} p={"2%"} border={"1px"}>
                    {item.item.detail}
                </Text>
            </Box>
            <Box w={"30%"} mt={"5%"}>
                <Image boxSize={"full"} src={item.item.image}></Image>
            x></Box> */}
    </Flex>
  );
};
export default Detail;
