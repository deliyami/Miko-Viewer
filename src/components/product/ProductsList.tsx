import { Box, Flex, Image, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { Product } from '@src/types/share';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const ProductsList: FC<{ products: Product[] }> = ({ products }) => {
  const router = useRouter();
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  return (
    <SimpleGrid columns={isLargerThan960 ? 4 : 2} spacing={70}>
      {products.map((item, id) => (
        <Link key={id} href={`/concerts/${router.query.id}/products/${item.id}`}>
          <a>
            {/* <Flex justifyItems={'center'}> */}
            <Box _hover={{ boxShadow: '2xl' }} rounded="md" p={'3%'}>
              <Image border={'solid'} src={`${IMAGE_DOMAIN}product_image/${item.image}`} alt={item.name}></Image>
              <Text>{item.name}</Text>
              <Flex justifyContent={'flex-end'}>
                <Text fontWeight={'bold'}>¥{item.price}</Text>
              </Flex>
            </Box>
            {/* </Flex> */}
          </a>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default ProductsList;
