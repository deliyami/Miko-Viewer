import { Box } from "@chakra-ui/react";
import ShareLayout from "@src/layout/ShareLayout";
import { curUserTicketState } from "@src/state/recoil/concertState";
import { ReactElement } from "react";
import { useRecoilValue } from "recoil";

const abc = () => {
  const userTicket = useRecoilValue(curUserTicketState);
  console.log("userTicket- abc page", userTicket);

  return <Box>ok</Box>;
};

abc.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout>{page}</ShareLayout>;
};

export default abc;
