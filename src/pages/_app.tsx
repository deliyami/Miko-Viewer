import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Socket } from 'socket.io-client';
import theme from '../theme';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('@src/mocks');
}

declare global {
  interface Window {
    sockets: Socket;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // window.sockets = io('http://localhost:3001', {
    //   // autoConnect: true,
    //   // forceNew: true,
    //   transports: ['websocket', 'polling'],
    // })
    //   .on('connect', () => {
    //     console.log('connect ! ', window.sockets.connected);
    //   })
    //   .on('error', (err) => {
    //     console.log(err);
    //   });
    // return () => {
    //   // window.sockets.close();
    // };
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default MyApp;
