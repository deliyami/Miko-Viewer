import { Box, Button, Container, HStack, Stack, Text } from '@chakra-ui/react';
import { convertDate } from '@src/helper';
import { Ticket } from '@src/types/share';
import React, { FC } from 'react';
import TicketModal from './TicketModal';

const TicketDate: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const startDate = convertDate(ticket.concertStartDate, 'YMDHM');
  const ymd = startDate.split(' ');

  // @ts-ignore
  return (
    <Box textAlign="center">
      <Text fontWeight="500" fontSize="2xl">
        {ymd[0]}
      </Text>
      <Text fontWeight="500" fontSize="xl">
        {ymd[1]} {ymd[2]}
      </Text>
    </Box>
  );
};

const TicketDetail: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const today = new Date();

  const startDate = convertDate(ticket.concertStartDate, 'YMDHM'); // 티켓 시작날
  const endDate = convertDate(ticket.concertEndDate, 'YMDHM'); // 티켓 마지막날
  const saleEndDate = convertDate(ticket.saleEndDate, 'YMDHM'); // 티켓 마감판매기간
  const archiveEndTime = convertDate(ticket.archiveEndTime, 'YMDHM'); // 티켓 다시보기기간

  return (
    <>
      {new Date(ticket.saleStartDate) < today ? (
        <>
          <HStack>
            <Box minW="16vh">
              <Text fontWeight="350" color="#696969">
                公演期間
              </Text>
              <Text fontWeight="350" color="#696969">
                公演時間
              </Text>
              <Text fontWeight="350" color="#696969">
                販売期間
              </Text>
              <Text fontWeight="350" color="#696969">
                アーカイブ視聴期間
              </Text>
            </Box>
            <Box minW="40vh">
              <Text fontWeight="440">
                {startDate} ~ {endDate}
              </Text>
              <Text fontWeight="440">{ticket.runningTime}分</Text>
              <Text fontWeight="440">{saleEndDate}まで</Text>
              <Text fontWeight="440">{archiveEndTime}まで</Text>
            </Box>
          </HStack>
        </>
      ) : (
        <Box>
          <Text m={9}>まだチケット購入期間ではありません。</Text>
        </Box>
      )}
    </>
  );
};

const TicketPrice: FC<{ data: Ticket }> = ({ data: ticket }) => {
  const today = new Date();
  const saleStartDate = new Date(ticket.saleStartDate);
  const saleEndDate = new Date(ticket.saleEndDate);

  return (
    <>
      {(saleStartDate < today && saleEndDate < today) || saleStartDate > today ? (
        <Button color="white" bg="#4A5568" disabled variant="solid" borderRadius={15} _hover={{ bg: '#4A5568' }}>
          販売期間ではありません。
        </Button>
      ) : (
        <Box alignItems="center">
          <HStack spacing={4}>
            <Text fontWeight="600" fontSize="xl">
              ¥{ticket.price}
            </Text>
            <TicketModal data={ticket} />
          </HStack>
        </Box>
      )}
    </>
  );
};

const TicketBox: FC<{ data: Ticket }> = ({ data: ticket }) => {
  return (
    <Container
      as={Stack}
      maxW={'fill'}
      direction={{ base: 'column', lg: 'row' }}
      spacing={4}
      justify={{ base: 'center', md: 'space-between' }}
      align={{ base: 'center', md: 'center' }}
      p={4}
    >
      <TicketDate data={ticket} />
      <TicketDetail data={ticket} />
      <TicketPrice data={ticket} />
    </Container>
  );
};

export default TicketBox;
