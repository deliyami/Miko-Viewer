import { ChakraProvider } from '@chakra-ui/react';
import theme from '@src/theme';
import { NextPage } from 'next';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Peer from 'peerjs';
import { ReactElement, ReactNode, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Socket } from 'socket.io-client';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('@src/mocks');
// }
declare global {
  interface Window {
    socket: Socket;
    myPeer: Peer;
  }
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    console.log('MyApp UseEffect');

    const serviceWorkerLoad = () => {
      navigator.serviceWorker.register('/sw/initial.js').then(
        function (registration) {
          console.log('Service Worker registration successful with scope: ', registration.scope);
        },
        function (err) {
          console.log('Service Worker registration failed: ', err);
        },
      );
    };

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', serviceWorkerLoad);
    }

    return () => {
      window.removeEventListener('load', serviceWorkerLoad);
    };
  }, []);

  useEffect(() => {
    router.beforePopState(({ as, options, url }) => {
      console.log('beforePopState');
      console.log(as, options, url);
      return true;
    });

    const handleStart = url => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    const handleRouterChangeError = (err, url) => {
      handleStop();
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`);
      } else {
        console.log('handleRouterChangeError', err, url);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleRouterChangeError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleRouterChangeError);
    };
  }, []);

  const getLayout = Component?.getLayout || (page => page);
  //  NOTE getLayout을 recoilRoot보다 밖에 두면 Layout이 동일하지 않는 이상 초기화됨.
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
  // console.log({ id, name, label, value });
}
