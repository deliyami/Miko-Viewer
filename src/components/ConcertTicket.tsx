import { Box, HStack, Image, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import { UserTicket } from '@src/types/share/UserTicket';
import Dayjs from 'dayjs';
import { FC } from 'react';

const TicketDetail: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  console.log(userTicket);
  const date = Dayjs(userTicket.ticket.concertStartDate, 'YYYY-MM-DD HH:mm:ss');
  const week = ['日', '月', '火', '水', '木', '金', '土']; // 요일
  const StartDay = date.format('YYYY/MM/DD'); // 2022/03/24
  const StartTime = date.format('HH:mm'); // 17:30
  const day = week[date.get('d')]; // 金 (요일)

  return (
    <>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>예매일</Th>
            <Th>예약번호</Th>
            <Th>Title</Th>
            <Th>시작시간</Th>
            <Th>상영시간</Th>
            <Th>현재상태</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>????/??/??</Td>
            <Td isNumeric>{userTicket.id}</Td>
            <Td>{userTicket.concert.title}</Td>
            <Td>
              {StartDay}({day}) {StartTime}
            </Td>
            <Td>{userTicket.ticket.runningTime}分</Td>
            <Td>예매완료</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

const HistoryDetail: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  console.log(userTicket);
  const date = Dayjs(userTicket.ticket.archiveEndTime, 'YYYY-MM-DD HH:mm:ss'); // 다시보기기간.
  const week = ['日', '月', '火', '水', '木', '金', '土']; // 요일
  const ArchiveDay = date.format('YYYY/MM/DD'); // 2022/03/24
  const ArchiveTime = date.format('HH:mm'); // 17:30
  const day = week[date.get('d')]; // 金 (요일)

  return (
    <>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>예매일</Th>
            <Th>예약번호</Th>
            <Th>Title</Th>
            <Th>다시보기</Th>
            <Th>상영시간</Th>
            <Th>현재상태</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>????/??/??</Td>
            <Td isNumeric>{userTicket.id}</Td>
            <Td>{userTicket.concert.title}</Td>
            <Td>
              {ArchiveDay}({day}) {ArchiveTime} まで
            </Td>
            <Td>{userTicket.ticket.runningTime}分</Td>
            <Td>시청 완료</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

const ConcertTicket: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  // console.log(userTicket);
  return (
    <Box>
      <HStack as="li" width="full" border="1px solid #efefef" borderRadius="10px" mb="30px">
        <Box textAlign="center" pl="50px">
          <Image src={S3_URL + userTicket.concert.coverImage} width="200px" />
        </Box>
        {userTicket.isUsed === 0 ? <TicketDetail userTicket={userTicket} /> : <HistoryDetail userTicket={userTicket} />}
      </HStack>
    </Box>
  );
};

export default ConcertTicket;
