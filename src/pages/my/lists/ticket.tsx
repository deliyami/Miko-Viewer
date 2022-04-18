import { Center, Flex, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import ConcertTicket from '@src/components/ConcertTicket';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { CommonFSW } from '@src/types/share/common';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const PER_PAGE = 6;

const UserTicketList = () => {
  const router = useRouter();
  const { data: userData } = useUser();
  const isUsedId = parseInt(router.query.isUsedId as string, 10);
  const page = parseInt(router.query.page as string, 10);

  const query: CommonFSW = {
    page,
    perPage: PER_PAGE,
    filter: [
      ['user_id', userData.id],
      ['is_used', isUsedId || 0],
    ],
    with: ['ticket', 'concert'],
  };
  const { data: userTickets } = usePageLaravel('/user_tickets', query);

  if (!userTickets) {
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">No Data</Text>
      </Center>
    );
  }

  return (
    <>
      <Table variant="simple" mb={7}>
        <Thead>
          <Tr>
            <Th> </Th>
            <Th>予約日</Th>
            <Th>Title</Th>
            <Th>公演期間</Th>
            <Th>アーカイブ視聴期間</Th>
            <Th>公演時間</Th>
            <Th>現状</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userTickets.data?.map(userTicket => (
            <ConcertTicket key={userTicket.id + ''} userTicket={userTicket} />
          ))}
        </Tbody>
      </Table>
      {userTickets.data.length === 0 && (
        <Flex minH={'20vh'} align={'center'} justify={'center'}>
          <Text>チケットがありません。</Text>
        </Flex>
      )}
      <PaginationBtn data={userTickets.meta} options={{ shallow: true }} />
    </>
  );
};

const MyListPage = () => {
  const router = useRouter();
  const isUsedId = parseInt(router.query.isUsedId as string, 10);

  const onClickUsed = clickId => {
    router.query.page = '1';
    router.query.isUsedId = clickId;
    router.push(router, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title key="title">Ticket Purchase History | Miko</title>
      </Head>
      <Tabs variant="enclosed" defaultIndex={isUsedId || 0} isFitted>
        <TabList>
          <Tab color="gray" onClick={() => onClickUsed(0)}>
            使用前のチケット
          </Tab>
          <Tab color="gray" onClick={() => onClickUsed(1)}>
            使用したチケット
          </Tab>
        </TabList>
        <AsyncBoundary>
          <TabPanels>
            <TabPanel>
              <UserTicketList />
            </TabPanel>
            <TabPanel>
              <UserTicketList />
            </TabPanel>
          </TabPanels>
        </AsyncBoundary>
      </Tabs>
    </>
  );
};

MyListPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

// export default MyListPage;
export default MyListPage;
