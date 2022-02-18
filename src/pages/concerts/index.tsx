import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ConcertPage = (second) => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>콘서트 검색 페이지</Text>
    </Box>
  );
};

export default ConcertPage;
