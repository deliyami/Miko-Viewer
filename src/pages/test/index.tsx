import { Box, Center, Spinner, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useABC } from '../../hooks/test/useABC';

const Child = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('1');
    return () => {
      console.log('4');
    };
  }, []);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log('pop state');
      window.removeEventListener('popstate', handler);
    };
    window.addEventListener('popstate', handler);

    window.addEventListener(
      'keydown',
      e => {
        console.log('keydown', e.key);
      },
      { capture: true },
    );

    window.abc = 'aaa';

    const handlerBeforeUnload = e => {
      e.preventDefault();
      console.log(e.returnValue);
      delete e.returnValue;
      console.log('beforeunload', e);
      router.push('/', '/', { shallow: true });
      window.removeEventListener('beforeunload', handlerBeforeUnload);
    };

    // window.addEventListener('beforeunload', handlerBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);

  return <div></div>;
};

const Loading = () => {
  const router = useRouter();
  const abc = useABC();
  const abcd = useABC();

  useEffect(() => {
    console.log('2');

    return () => {
      console.log('3');
    };
  }, []);

  return (
    <Center w="full" h="100vh">
      <VStack>
        <Spinner boxSize="300px" color="red.500" mb={20} />
        <Text fontSize="6xl">Loading...</Text>
        <Link href="/test/2" as="/test/as">
          link
        </Link>
        <Text>{abc}</Text>
        <Text>{abcd}</Text>
        <Text>{abc == abcd ? 'y' : 'n'}</Text>
        <Text>{abc === abcd ? 'y' : 'n'}</Text>
        <Child />
        <Box
          onClick={() => {
            router.push('/test/2');
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
        <Box
          onClick={() => {
            router.reload();
          }}
        >
          reload
        </Box>
      </VStack>
    </Center>
  );
};

export default Loading;
