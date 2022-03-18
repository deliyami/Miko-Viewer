import { Box, Flex, Text, Image } from '@chakra-ui/react';

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
      <Image src={item.item.image}></Image>
      {/* <Box w={"50%"} p={"2%"} border={"1px"}>
            </Box>
            <Box mt={"5%"} w={"40%"}>
                <Image src={item.item.image}></Image>
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
