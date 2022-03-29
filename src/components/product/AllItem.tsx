/* eslint-disable array-callback-return */
import { Box, Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import { useRouter } from 'next/router';
import { FC } from 'react';

const AllItem: FC<{ allItem: Pagination<Product> }> = ({ allItem }) => {
  const router = useRouter();
  console.log(allItem.data);
  return (
    <Flex flexDir={'column'} w={'82%'}>
      <Text fontSize={'3xl'} fontWeight={'bold'}>
        このコンサートの他の商品
      </Text>
      <Flex>
        <SimpleGrid spacing={20} p={'2%'} columns={5}>
          {allItem.data.map((item, key) => {
            if (key < 5) {
              return (
                <Flex
                  onClick={() => window.open(`/concerts/${router.query.id}/products/${item.id}`, '_self')}
                  cursor={'pointer'}
                  rounded="3%"
                  _hover={{ boxShadow: '2xl' }}
                  flexDirection={'column'}
                  key={key}
                >
                  <Box>
                    <Box>
                      <Image src={`${S3_URL}products/${item.image}`}></Image>
                    </Box>
                    <Text textAlign={'right'}>{item.name}</Text>
                    <Text textAlign={'right'} fontWeight={'bold'}>
                      ¥{item.price}
                    </Text>
                  </Box>
                </Flex>
              );
            }
          })}
        </SimpleGrid>
        <Flex alignItems={'end'} ml={'3%'}>
          <Button onClick={() => window.open(`/concerts/${router.query.id}/products`, '_self')}>
            <Text fontWeight={'bold'} fontSize={'xl'}>
              全ての商品へ &#10132;
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default AllItem;
