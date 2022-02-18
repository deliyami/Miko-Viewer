import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ConcertDetailPage = (second) => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>콘서트 상세 정보</Text>
    </Box>
  );
};

export default ConcertDetailPage;
