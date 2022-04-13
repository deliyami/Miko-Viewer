import { Box, Center, Text, VStack } from '@chakra-ui/react';
import BasicLayout from '@src/layout/BasicLayout';
import { tryOAuthLogin } from '@src/state/swr';
import { useRouter } from 'next/dist/client/router';
import { ReactElement, useEffect, useState } from 'react';

export default function RedirectPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    async function tryLogin() {
      if (token) {
        const result = await tryOAuthLogin(token as string);
        if (result === false) setError(true);
      } else {
        setError(true);
      }
      setLoading(false);
    }
    tryLogin();
  }, [router.isReady]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        router.push(`/${error ? 'login' : '/'}`);
      }, 100);
    }
  }, [loading]);

  useEffect(() => {
    router.prefetch('/');
  }, []);

  return (
    <Center width="full" height="100vh">
      <VStack>
        {loading && (
          <>
            {router.isReady && token === undefined ? (
              <>
                <Box>
                  <Text fontSize="3xl">✋</Text>
                </Box>
                <Text fontSize="2xl">잘못된 접근입니다.</Text>
                <Text fontSize="2xl"> 홈으로 이동합니다.</Text>
              </>
            ) : (
              <>
                <Box>Cricle</Box>
                <Text fontSize="2xl">로그인 중입니다 </Text>
                <Text fontSize="2xl">잠시만 기달려 주세요.</Text>
              </>
            )}
          </>
        )}
        {!loading && error && (
          <>
            <Box>
              <Text fontSize="3xl">⁉️</Text>
            </Box>
            <Text fontSize="2xl">로그인에 실패했습니다.</Text>
            <Text fontSize="2xl">로그인 페이지로 이동합니다</Text>
          </>
        )}
        {!loading && !error && (
          <>
            <Box>
              <Text fontSize="3xl">✔️</Text>
            </Box>
            <Text fontSize="2xl">로그인에 성공했습니다.</Text>
            <Text fontSize="2xl"> 잠시 후 홈 화면으로 이동</Text>
          </>
        )}
      </VStack>
    </Center>
  );
}

RedirectPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
