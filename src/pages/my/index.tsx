import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const MyPage = (second) => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>개인 정보 페이지</Text>
    </Box>
  );
};

export default MyPage;
