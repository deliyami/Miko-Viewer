import { useOAuthLogin } from '@src/state/swr/useUser';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

export default function redirect() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    async function tryLogin() {
      if (token) {
        const result = await useOAuthLogin(token as string);
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
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    router.prefetch('/');
  }, []);

  return (
    <div>
      {loading && (
        <>
          {router.isReady && token === undefined ? (
            <>
              <div>
                <h1>✋</h1>
              </div>
              <h3>잘못된 접근입니다.</h3>
              <h3> 홈으로 이동합니다.</h3>
            </>
          ) : (
            <>
              <div>Cricle</div>
              <h3>로그인 중입니다 </h3>
              <h3>잠시만 기달려 주세요.</h3>
            </>
          )}
        </>
      )}
      {!loading && error && (
        <>
          <div>
            <h1>⁉️</h1>
          </div>
          <h3>로그인에 실패했습니다.</h3>
          <h3>로그인 페이지로 이동합니다</h3>
        </>
      )}
      {!loading && !error && (
        <>
          <div>
            <h1>✔️</h1>
          </div>
          <h3>로그인에 성공했습니다.</h3>
          <h3> 잠시 후 홈 화면으로 이동</h3>
        </>
      )}
    </div>
  );
}
