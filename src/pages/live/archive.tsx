import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ArchivePage = () => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>코인</Text>
    </Box>
  );
};

export default ArchivePage;
