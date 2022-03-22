import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ConcertTicket from '@src/components/ConcertTicket';
import MyLayout from '@src/layout/MyLayout';
import { curUserTicketState } from '@src/state/recoil/concertState';
import { useUser } from '@src/state/swr/useUser';
import { useUserTickets } from '@src/state/swr/useUserTicket';
import { Ticket } from '@src/types/share/Ticket';
import { UserTicket } from '@src/types/share/UserTicket';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';

const Ticket: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  // console.log(userTicket);
  const router = useRouter();
  const setCurUseTicket = useSetRecoilState(curUserTicketState);
  const useTicketHandler = () => {
    setCurUseTicket(userTicket);
    router.push('/live/enter');
  };

  return (
    <>
      <Box onClick={useTicketHandler}>
        <ConcertTicket userTicket={userTicket} />
      </Box>
    </>
  );
};

const UserTicketList: FC<{ userTickets: UserTicket[]; cate: number }> = ({ userTickets, cate }) => {
  // console.log(userTickets[0].isUsed == cate);
  console.log();
  return (
    <>
      <Box>{userTickets.map(userTicket => userTicket.isUsed === cate && <Ticket key={userTicket.id} userTicket={userTicket} />)}</Box>
    </>
  );
};

const MyListPage = second => {
  // const router = useRouter();
  const { data: userData } = useUser();

  // const { menu } = router.query as { menu: string };
  const { data } = useUserTickets({
    with: ['ticket', 'concert'],
    filter: [['user_id', userData.id]],
  });

  return (
    <Box>
      <Tabs variant="enclosed" isFitted>
        <TabList>
          <Tab>보기전 티켓</Tab>
          <Tab>사용한 티켓</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTicketList userTickets={data.data} cate={0} />
          </TabPanel>
          <TabPanel>
            <UserTicketList userTickets={data.data} cate={1} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

MyListPage.getLayout = function getLayout(page: ReactElement) {
  return <MyLayout>{page}</MyLayout>;
};

// export default MyListPage;
export default MyListPage;
