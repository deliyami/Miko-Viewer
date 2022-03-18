import { SimpleGrid, Flex, Text } from '@chakra-ui/react';

const Score = ({ score }) => {
  return (
    <SimpleGrid columns={[5]}>
      <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Text fontWeight={'bold'}>Volume</Text>
        <Text fontSize={'7xl'}>50</Text>
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Text mt={'20%'} fontSize={'5xl'}>
          +
        </Text>
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Text fontWeight={'bold'}>Exercise</Text>
        <Text fontSize={'7xl'}>50</Text>
      </Flex>
      <Flex mt={'20%'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={'5xl'}>=</Text>
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Text fontWeight={'bold'}>Total</Text>
        <Text fontSize={'7xl'}>100</Text>
      </Flex>
    </SimpleGrid>
  );
};
export default Score;
