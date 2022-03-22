import { Box, Flex, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { Pagination } from '@src/types/share/common/common';
import { Product } from '@src/types/share/Product';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const ProductsList: FC<{ data: Pagination<Product> }> = ({ data }) => {
  const router = useRouter();
  console.log('product list');
  console.log(data);
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  return (
    // data[0].id
    <SimpleGrid columns={isLargerThan960 ? 4 : 2} spacing={70}>
      {data.data.map((item, id) => (
        <Link key={id} href={`/concerts/${router.query.id}/products/${item.id}`}>
          <a>
            <Flex justifyItems={'center'}>
              <Box _hover={{ boxShadow: '2xl' }} rounded="md" p={'3%'}>
                <img src={item.image} alt={item.name} />
                <Text>{item.name}</Text>
                <Flex justifyContent={'flex-end'}>
                  <Text fontWeight={'bold'}>¥{item.price}</Text>
                </Flex>
              </Box>
            </Flex>
          </a>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default ProductsList;
