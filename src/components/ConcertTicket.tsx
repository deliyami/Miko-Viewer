import { Badge, Box, Button, HStack, Image, Td, Text, Tr } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import convertDate from '@src/helper/convertDate';
import { curUserTicketState } from '@src/state/recoil/concertState';
import { UserTicket } from '@src/types/share/UserTicket';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';

const TicketDetail: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  const router = useRouter();

  // /live/enter으로 이동
  const setCurUseTicket = useSetRecoilState(curUserTicketState);
  const useTicketHandler = () => {
    setCurUseTicket(userTicket);
    router.push('/live/enter');
  };

  // 티켓 정보
  const startDate = convertDate(userTicket.ticket.concertStartDate, 'YMDHM');
  const endDate = convertDate(userTicket.ticket.concertEndDate, 'YMDHM');

  // 날짜 비교
  const compareStartDate = dayjs(userTicket.ticket.concertStartDate);
  const compareEndDate = dayjs(userTicket.ticket.concertEndDate);
  const today = dayjs(new Date());
  const diff = compareStartDate.diff(today, 'm') as number; // 시작일로부터 남은 시간(분)
  const showBadge = diff <= 120 && diff > 0; // 남은 시간 2시간 전부터 알림
  const screening = today.isBetween(compareStartDate, compareEndDate, 'minute', '[]');
  const beforeScreening = today.isAfter(compareEndDate, 'minute');

  // console.log(screening);
  return (
    <Tr _hover={{ bg: screening ? '#F0FFF4' : (beforeScreening && '#FAF5FF') || '#EBF8FF' }} cursor={screening && 'pointer'}>
      <Td>
        <HStack align="stretch">
          <Image w="120px" h="120px" src={S3_URL + userTicket.concert.coverImage} />
          {showBadge && (
            <Box>
              <Badge variant="solid" colorScheme="blue" fontSize="13px">
                間も無く
              </Badge>
            </Box>
          )}
          {screening && (
            <Box>
              <Badge variant="solid" colorScheme="green" fontSize="13px">
                上映中
              </Badge>
            </Box>
          )}
        </HStack>
      </Td>
      <Td>????/??/??</Td>
      <Td isNumeric>{userTicket.id}</Td>
      <Td>{userTicket.concert.title}</Td>
      <Td>
        {startDate}
        <br />~{endDate}
      </Td>
      <Td>{userTicket.ticket.runningTime}分</Td>
      <Td>
        {screening ? (
          <Button onClick={useTicketHandler} colorScheme="green" size="sm" fontWeight="800" fontSize="14px">
            コンサート入場
          </Button>
        ) : (
          (beforeScreening && (
            <Button colorScheme="purple" size="sm" fontWeight="800" fontSize="14px">
              アーカイブ視聴
            </Button>
          )) || (
            <Text color="#3182CE" fontWeight="550" fontSize="17px">
              上映前
            </Text>
          )
        )}
      </Td>
    </Tr>
  );
};

const UsedTicket: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  // 티켓 정보
  const archiveEndTime = convertDate(userTicket.ticket.archiveEndTime, 'YMD');

  // 날짜 비교
  const compareArchiveEndDate = dayjs(userTicket.ticket.archiveEndTime);
  const today = dayjs(new Date());
  const archiving = today.isSameOrBefore(compareArchiveEndDate);

  console.log(archiving);
  return (
    <Tr _hover={{ bg: archiving ? '#FAF5FF' : '#FFF5F7' }} cursor={archiving && 'pointer'}>
      <Td>
        <Image w="120px" h="120px" src={S3_URL + userTicket.concert.coverImage} />
      </Td>
      <Td>????/??/??</Td>
      <Td isNumeric>{userTicket.id}</Td>
      <Td>{userTicket.concert.title}</Td>
      <Td>{archiveEndTime + 'まで'}</Td>
      <Td>{userTicket.ticket.runningTime}分</Td>
      <Td>
        {archiving ? (
          <Button colorScheme="purple" size="sm" fontWeight="800" fontSize="14px">
            アーカイブ視聴
          </Button>
        ) : (
          <Text color="#ED64A6" fontWeight="550" fontSize="17px">
            アーカイブ期間満了
          </Text>
        )}
      </Td>
    </Tr>
  );
};

const ConcertTicket: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  const router = useRouter();
  const isUsedId = parseInt(router.query.isUsedId as string);

  return <>{isUsedId ? <UsedTicket userTicket={userTicket} /> : <TicketDetail userTicket={userTicket} />}</>;
};

export default ConcertTicket;
