import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const SignPage = (second) => {
  const router = useRouter();
  return (
    <Box>
      {router.asPath}
      <Text>회원가입</Text>
    </Box>
  );
};

export default SignPage;
