import { Box, Flex, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import ConcertTicket from '@src/components/ConcertTicket';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser, useUserTickets } from '@src/state/swr';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const UserTicketList = () => {
  const router = useRouter();
  const { data: userData } = useUser();
  const isUsedId = parseInt(router.query.isUsedId as string, 10);

  const { data: userTickets } = useUserTickets({
    with: ['ticket', 'concert'],
    filter: [
      ['user_id', userData.id],
      ['is_used', isUsedId],
    ],
  });

  console.log(userTickets.data);
  return (
    <>
      <Table variant="simple" mb={7}>
        <Thead>
          <Tr>
            <Th> </Th>
            <Th>予約日</Th>
            <Th>予約番号</Th>
            <Th>Title</Th>
            <Th>{isUsedId === 1 ? 'アーカイブ視聴期間' : '公演期間'}</Th>
            <Th>公演時間</Th>
            <Th>現状</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userTickets.data?.map(userTicket => (
            <ConcertTicket key={userTicket.id} userTicket={userTicket} />
          ))}
        </Tbody>
      </Table>
      {userTickets.data.length === 0 && (
        <Flex minH={'20vh'} align={'center'} justify={'center'}>
          <Text>チケットがありません。</Text>
        </Flex>
      )}
      <PaginationBtn data={userTickets.meta} url={`/my/lists/ticket?isUsedId=${isUsedId}`} />
    </>
  );
};

const MyListPage = () => {
  const router = useRouter();
  const isUsedId = parseInt(router.query.isUsedId as string, 10);

  const onClickUsed = clickId => {
    router.push(`/my/lists/ticket/?isUsedId=${clickId}`);
  };

  return (
    <Box>
      <Tabs variant="enclosed" defaultIndex={isUsedId || 0} isFitted>
        <TabList>
          <Tab color="gray" onClick={() => onClickUsed(0)}>
            見る前のチケット
          </Tab>
          <Tab color="gray" onClick={() => onClickUsed(1)}>
            使用したチケット
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTicketList />
          </TabPanel>
          <TabPanel>
            <UserTicketList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

MyListPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

// export default MyListPage;
export default MyListPage;
