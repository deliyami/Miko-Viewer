import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const GoodsPage = (second) => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      ---
      {router.query.id}
      <Text>상품 페이지</Text>
    </Box>
  );
};

export default GoodsPage;
