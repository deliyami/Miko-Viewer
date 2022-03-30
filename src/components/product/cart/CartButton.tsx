import { Button, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CartButton = ({ cartCount, count, size, color, item }) => {
  const router = useRouter();
  // console.log(props);
  return (
    // eslint-disable-next-line @next/next/link-passhref
    <Link
      href={{
        pathname: `/concerts/${router.query.id}/products/cart`,
        query: {
          cartCount,
          count,
          size,
          color,
          item: JSON.stringify(item),
        },
      }}
    >
      <Flex flexDirection={'column'}>
        {cartCount === 0 ? null : (
          <Flex justifyContent={'end'}>
            <Text color={'white'} pl={2} pr={2} align="center" rounded="100%" bg={'tomato'}>
              {cartCount}
            </Text>
          </Flex>
        )}
        <Button aria-label="cart" mb={5} w={92.5} h={92.5} shadow={'2xl'} _hover={{ bg: 'blue.100' }} borderRadius={'100%'} colorScheme={'blue'} bg={'white'}>
          <Image src="/image/productPage/cart.svg" alt="cart"></Image>
        </Button>
      </Flex>
    </Link>
  );
};
export default CartButton;
