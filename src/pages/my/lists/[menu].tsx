import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const MyListPage = (second) => {
  const router = useRouter();
  const { menu } = router.query as { menu: string };
  return (
    <Box>
      {router.asPath}
      {menu}
      <Text>가지고 있는 티켓 / 다시보기 </Text>
    </Box>
  );
};

export default MyListPage;
