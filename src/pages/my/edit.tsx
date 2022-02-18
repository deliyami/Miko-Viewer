import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const EditPage = (second) => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>개인 정보 편집</Text>
    </Box>
  );
};

export default EditPage;
