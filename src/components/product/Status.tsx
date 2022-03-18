import { Flex, SimpleGrid, Text } from '@chakra-ui/react';

const Status = ({ status }) => {
  return (
    <Flex justifyContent={'center'} mb={'10%'}>
      <SimpleGrid fontSize={'lg'} w={'80%'} columns={4} textAlign={'center'}>
        {status == 1 ? (
          <Text p={'2%'} bg={'gray.200'} border={'1px'}>
            カートの商品
          </Text>
        ) : (
          <Text p={'2%'} border={'1px'}>
            カートの商品
          </Text>
        )}
        {status == 2 ? (
          <Text p={'2%'} bg={'gray.200'} border={'1px'}>
            お客様情報
          </Text>
        ) : (
          <Text p={'2%'} border={'1px'}>
            お客様情報
          </Text>
        )}
        {status == 3 ? (
          <Text p={'2%'} bg={'gray.200'} border={'1px'}>
            ご注文内容確認
          </Text>
        ) : (
          <Text p={'2%'} border={'1px'}>
            ご注文内容確認
          </Text>
        )}
        {status == 4 ? (
          <Text p={'2%'} bg={'gray.200'} border={'1px'}>
            完了
          </Text>
        ) : (
          <Text p={'2%'} border={'1px'}>
            完了
          </Text>
        )}
      </SimpleGrid>
    </Flex>
  );
};
export default Status;
