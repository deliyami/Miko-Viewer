import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import BasicLayout from "@src/layout/BasicLayout";
import { curUserTicketState } from "@src/state/recoil/concertState";
import { useUser } from "@src/state/swr/useUser";
import { useUserTickets } from "@src/state/swr/useUserTicket";
import { Ticket } from "@src/types/share/Ticket";
import { UserTicket } from "@src/types/share/UserTicket";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import { useSetRecoilState } from "recoil";

const Ticket: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  const router = useRouter();
  const setCurUseTicket = useSetRecoilState(curUserTicketState);
  const useTicketHandler = () => {
    setCurUseTicket(userTicket);
    router.push("/live/enter");
  };

  return <Box onClick={useTicketHandler}>{userTicket.id}</Box>;
};

const UserTicketList: FC<{ userTickets: UserTicket[] }> = ({ userTickets }) => {
  return (
    <Box>
      {userTickets.map(userTicket => (
        <Ticket key={userTicket.id} userTicket={userTicket} />
      ))}
    </Box>
  );
};

const MyListPage = second => {
  const router = useRouter();
  const { data: userData } = useUser();

  const { menu } = router.query as { menu: string };

  const { data } = useUserTickets({
    with: ["ticket", "concert"],
    filter: [["user_id", userData.id]],
  });

  console.log("ticket", data);

  return (
    <Box>
      <Tabs variant="enclosed" isFitted>
        <TabList>
          <Tab>보기전 티켓</Tab>
          <Tab>사용한 티켓</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserTicketList userTickets={data.data} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

MyListPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default MyListPage;
