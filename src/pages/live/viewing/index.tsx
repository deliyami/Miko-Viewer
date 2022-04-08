import { Center, Text } from '@chakra-ui/react';
import { Container } from '@src/components/Container';
import ViewingLayout from '@src/layout/ViewingLayout';
import { curUserTicketState } from '@src/state/recoil';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';

const DynamicViewingPage = dynamic(() => import('../../../components/viewing/ViewingPrepareCSRPage'), {
  loading: () => <div> loading</div>,
  ssr: false,
  suspense: true,
});

const ViewingPage = () => {
  const userTicket = useRecoilValue(curUserTicketState);
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
        <title>Miko Viewing Page</title>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </Head>

      <DynamicViewingPage />
    </Container>
  );
};

ViewingPage.getLayout = function getLayout(page: ReactElement) {
  return <ViewingLayout>{page}</ViewingLayout>;
};

export default ViewingPage;
