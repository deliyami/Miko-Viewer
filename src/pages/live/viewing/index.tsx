import { Center, Text } from '@chakra-ui/react';
import { Container } from '@src/components/Container';
import ViewingLayout from '@src/layout/ViewingLayout';
import { curUserTicketState } from '@src/state/recoil';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
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

  useEffect(() => {
    if (userTicket) return;

    const endTimeMs = dayjs().diff(userTicket.ticket.concertEndDate);

    const setTimeoutId = setTimeout(() => {
      router.push(`/live/${userTicket.ticketId}/result/${userTicket.userId}`);
    }, endTimeMs);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [userTicket]);

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
      </Head>
      <DynamicViewingPage />
    </Container>
  );
};

ViewingPage.getLayout = function getLayout(page: ReactElement) {
  return <ViewingLayout>{page}</ViewingLayout>;
};

export default ViewingPage;
