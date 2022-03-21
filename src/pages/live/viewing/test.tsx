import { Box } from '@chakra-ui/react';
import { curUserTicketState } from '@src/state/recoil/concertState';
import { useRecoilValue } from 'recoil';

const abc = () => {
  const userTicket = useRecoilValue(curUserTicketState);
  console.log('userTicket- abc page', userTicket);

  return <Box>ok</Box>;
};

export default abc;
