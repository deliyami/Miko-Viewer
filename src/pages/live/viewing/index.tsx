import { Center, Text } from '@chakra-ui/react';
import { Container } from '@src/components/Container';
import { toastLog } from '@src/helper/toastLog';
import ViewingLayout from '@src/layout/ViewingLayout';
import { curUserTicketState } from '@src/state/recoil/concertState';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

const DynamicViewingPage = dynamic(() => import('../../../components/viewing/ViewingCSRPage'), {
  loading: () => <div> loading</div>,
  ssr: false,
  suspense: true,
});

const ViewingPage = () => {
  const userTicket = useRecoilValue(curUserTicketState);
  console.log('userTicket- viewing page', userTicket);

  const router = useRouter();
  const handleDenyAccess = () => {
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  if (!userTicket) handleDenyAccess();
  if (!userTicket)
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">비정상 접근</Text>
      </Center>
    );

  return (
    <Container height="auto" width="full">
      <Head>
        <title>Miko Viewing Pate</title>
        {/* <script src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js" async></script> */}
      </Head>
      <Script
        src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js"
        strategy="afterInteractive" // NOTE 왜 before하면 새로고침시 에러?
        onError={e => {
          toastLog('error', 'failed to load ivs script');
        }}
      />
      <DynamicViewingPage />
    </Container>
  );
};

ViewingPage.getLayout = function getLayout(page: ReactElement) {
  return <ViewingLayout>{page}</ViewingLayout>;
};

export default ViewingPage;
