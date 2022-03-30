import { Box, Center, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import ConcertTicket from '@src/components/ConcertTicket';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr/useUser';
import { useUserTickets } from '@src/state/swr/useUserTicket';
import { UserTicket } from '@src/types/share/UserTicket';
import { useRouter } from 'next/router';
import { FC, ReactElement, useState } from 'react';

const UserTicketList: FC<{ userTickets: UserTicket[] }> = ({ userTickets }) => {
  const router = useRouter();
  const userUsedId = parseInt(router.query.isUsedId as string);

  console.log(userTickets);
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th> </Th>
            <Th>予約日</Th>
            <Th>予約番号</Th>
            <Th>Title</Th>
            <Th>{userUsedId === 1 ? 'アーカイブ視聴期間' : '公演の日付'}</Th>
            <Th>公演時間</Th>
            <Th>現状</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userTickets?.map(userTicket =>
            userUsedId === 1
              ? userTicket.isUsed === userUsedId && <ConcertTicket key={userTicket.id} userTicket={userTicket} />
              : userTicket.isUsed === 0 && <ConcertTicket key={userTicket.id} userTicket={userTicket} />,
          )}
        </Tbody>
      </Table>
      {userTickets.length === 0 && (
        <Center m={20}>
          <Text>티켓없음.</Text>
        </Center>
      )}
    </>
  );
};

const MyListPage = () => {
  const router = useRouter();
  const { data: userData } = useUser();
  const isUsedId = parseInt(router.query.isUsedId as string);

  const { data } = useUserTickets({
    with: ['ticket', 'concert'],
    filter: [['user_id', userData.id]],
  });
  console.log('userTicket', data);

  const onClickUsed = clickId => {
    router.push(`/my/lists/ticket/?isUsedId=${clickId}`);
  };
  const colors = useColorModeValue(['blue', 'purple'], []);
  const [tabIndex, setTabIndex] = useState(isUsedId);
  const colorScheme = colors[tabIndex];

  return (
    <Box>
      <Tabs variant="enclosed" defaultIndex={isUsedId || 0} onChange={index => setTabIndex(index)} colorScheme={colorScheme} isFitted>
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
            <UserTicketList userTickets={data.data} />
          </TabPanel>
          <TabPanel>
            <UserTicketList userTickets={data.data} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {!(data.data.length === 0) && <PaginationBtn data={data.meta} url={`/my/lists/ticket?`} />}
    </Box>
  );
};

MyListPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

// export default MyListPage;
export default MyListPage;
