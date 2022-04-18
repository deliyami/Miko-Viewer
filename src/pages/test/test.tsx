import { Flex } from '@chakra-ui/react';
import { useSingleLaravel } from '@src/state/swr/useLaravel';

export default function Test() {
  const products = useSingleLaravel('/products', 1, {});
  // alert(products);
  // alert('ga');
  console.log(products);
  return <Flex>fa</Flex>;
}
