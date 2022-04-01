import { Box, Center, Text, VStack } from '@chakra-ui/react';
import { useABC } from '@src/hooks/test/useABC';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Loading = () => {
  const router = useRouter();
  const abc = useABC();
  const abcd = useABC();

  useEffect(() => {
    console.log('2');

    router.beforePopState(({ as, options, url }) => {
      console.log('beforePopState');
      console.log(as, options, url);
      return true;
    });

    return () => {
      console.log('3');
    };
  }, []);

  return (
    <Center w="full" h="100vh">
      <VStack>
        <Text fontSize="6xl">test 2</Text>
        <Link href="/as" as="/">
          link
        </Link>
        <Text>{abc}</Text>
        <Text>{abcd}</Text>
        <Text>{abc == abcd ? 'y' : 'n'}</Text>
        <Text>{abc === abcd ? 'y' : 'n'}</Text>
        <Box
          onClick={() => {
            router.push('/', '/as');
          }}
        >
          router.push to '/' as "/as"
        </Box>
        <Box
          onClick={() => {
            router.back();
          }}
        >
          back
        </Box>
      </VStack>
    </Center>
  );
};

export default Loading;
