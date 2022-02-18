import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

export default function redirect() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (router.isReady && code === undefined) {
      setLoading(false);
      setError(true);
    }
  }, [code]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        router.push(`/${error ? 'login' : 'room'}`);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    router.prefetch('/room');
  }, []);

  return (
    <div>
      {loading && (
        <>
          {router.isReady && code === undefined ? (
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
