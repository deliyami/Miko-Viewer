import { Badge, Box, Button, Center, HStack, Image, Td, Text, Tr } from '@chakra-ui/react';
import { IMAGE_DOMAIN, NEST_URL, VapidServerKey } from '@src/const';
import { convertDate } from '@src/helper';
import { axiosI } from '@src/state/fetcher';
import { curUserTicketState } from '@src/state/recoil';
import { UserTicket } from '@src/types/share';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const ButtonStatus: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  const router = useRouter();

  // /live/enter으로 이동
  const setCurUseTicket = useSetRecoilState(curUserTicketState);
  const useTicketHandler = () => {
    setCurUseTicket(userTicket);
    router.push('/live/enter');
  };

  const archiveEnterHandler = () => {
    router.push(
      {
        pathname: '/live/archive',
        query: {
          ticket_id: userTicket.ticketId,
        },
      },
      undefined,
    );
  };

  // 날짜 비교
  const compareStartDate = dayjs(userTicket.ticket.concertStartDate);
  const compareEndDate = dayjs(userTicket.ticket.concertEndDate);
  const compareArchiveDate = dayjs(userTicket.ticket.archiveEndTime);
  const today = dayjs(new Date());
  const screeningBefore = today.isBefore(compareStartDate, 'minute'); // 상영전
  const archiveAfter = today.isAfter(compareArchiveDate, 'minute'); // 다시보기 끝나는 날 이후
  const screening = today.isBetween(compareStartDate, compareEndDate, 'minute', '[]'); // 상영중
  const archiving = today.isBetween(compareEndDate, compareArchiveDate, 'minute', '[]'); // 다시보기 - 공연 끝나는 날부터 아카이브 끝나는 날까지

  return (
    <Center>
      {screening ? (
        <Button onClick={useTicketHandler} colorScheme="green" size="sm" fontWeight="800" fontSize="14px" _hover={{ bg: 'green', color: 'white' }}>
          コンサート入場
        </Button>
      ) : (
        archiving && (
          <Button onClick={archiveEnterHandler} colorScheme="purple" size="sm" fontWeight="800" fontSize="14px" _hover={{ bg: 'purple.500', color: 'white' }}>
            アーカイブ視聴
          </Button>
        )
      )}
      {screeningBefore && (
        <Text color="#3182CE" fontWeight="550" fontSize="16px">
          上映前
        </Text>
      )}
      {archiveAfter && (
        <Button size="sm" color="white" bg="#4A5568" disabled variant="solid" borderRadius={15} _hover={{ bg: '#4A5568' }}>
          アーカイブ期間満了
        </Button>
      )}
    </Center>
  );
};

const ImageBadge: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  // 날짜 비교
  const compareStartDate = dayjs(userTicket.ticket.concertStartDate);
  const compareEndDate = dayjs(userTicket.ticket.concertEndDate);
  const compareArchiveDate = dayjs(userTicket.ticket.archiveEndTime);
  const today = dayjs(new Date());
  const diff = compareStartDate.diff(today, 'm'); // 시작일로부터 남은 시간(초)
  const previewAlarm = diff <= 60 && diff > 0; // 1시간 전.
  const screening = today.isBetween(compareStartDate, compareEndDate, 'minute', '[]');
  const archiving = today.isBetween(compareEndDate, compareArchiveDate, 'minute', '[]'); // 다시보기 - 공연 끝나는 날부터 아카이브 끝나는 날까지

  return (
    <HStack align="stretch">
      <Image w="120px" h="120px" objectFit="cover" alt="concertImage" fallbackSrc="/image/defaultImage.png" src={IMAGE_DOMAIN + userTicket.concert.coverImage} />
      {previewAlarm && (
        <Box>
          <Badge variant="solid" colorScheme="blue" fontSize="13px">
            間も無く
          </Badge>
        </Box>
      )}
      {screening ? (
        <Box>
          <Badge variant="solid" colorScheme="green" fontSize="13px">
            上映中
          </Badge>
        </Box>
      ) : (
        archiving && (
          <Box>
            <Badge variant="solid" colorScheme="purple" fontSize="13px">
              アーカイブ期間
            </Badge>
          </Box>
        )
      )}
    </HStack>
  );
};

const TicketInfo: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  // 티켓 정보
  const startDate = convertDate(userTicket.ticket.concertStartDate, 'YMDHM');
  const endDate = convertDate(userTicket.ticket.concertEndDate, 'YMDHM');
  const archiveEndTime = convertDate(userTicket.ticket.archiveEndTime, 'YMD');
  const paymentTime = convertDate(userTicket.ticket.createdAt, 'YMD');

  // 날짜 비교
  const compareStartDate = dayjs(userTicket.ticket.concertStartDate);
  const compareEndDate = dayjs(userTicket.ticket.concertEndDate);
  const compareArchiveDate = dayjs(userTicket.ticket.archiveEndTime);
  const today = dayjs(new Date());
  const screening = today.isBetween(compareStartDate, compareEndDate, 'minute', '[]');
  const archiving = today.isBetween(compareEndDate, compareArchiveDate, 'minute', '[]'); // 다시보기 - 공연 끝나는 날부터 아카이브 끝나는 날까지
  const archiveAfter = today.isAfter(compareArchiveDate, 'minute'); // 다시보기 끝나는 날 이후

  return (
    <Tr _hover={{ bg: screening ? '#F0FFF4' : (archiving && '#FAF5FF') || (archiveAfter && '#F7FAFC') || '#EBF8FF' }} cursor={(screening || archiving) && 'pointer'}>
      <Td>
        <ImageBadge userTicket={userTicket} />
      </Td>
      <Td>{paymentTime}</Td>
      <Td>{userTicket.concert.title}</Td>
      <Td>
        {startDate}
        <br />~{endDate}
      </Td>
      <Td>{archiveEndTime + 'まで'}</Td>
      <Td>{userTicket.ticket.runningTime}分</Td>
      <Td>
        <ButtonStatus userTicket={userTicket} />
      </Td>
    </Tr>
  );
};

const registerPushNotification = (userTicket: UserTicket) => {
  function postSubscription(Subscription: PushSubscription) {
    console.log('data', userTicket);
    console.log('subscription', Subscription);
    const startDate = userTicket.ticket.concertStartDate;
    const concertData = userTicket.concert;

    axiosI.post(`${NEST_URL}/register`, { Subscription, concertData, startDate }).catch(err => console.log(err));
  }

  async function requestNotification() {
    Notification.requestPermission().then(status => {
      if (status === 'denied') {
        alert('Notification 거부됨');
      } else if (navigator.serviceWorker) {
        navigator.serviceWorker
          .register('/sw.js') // serviceworker 등록
          .then(async function (registration) {
            const subscribeOptions = {
              userVisibleOnly: true,
              // push subscription이 유저에게 항상 보이는지 여부. 알림을 숨기는 등 작업이 들어가지는에 대한 여부인데, 크롬에서는 true 밖에 지원안한다.
              applicationServerKey: VapidServerKey, // 발급받은 vapid public key
            };
            registration.pushManager.subscribe(subscribeOptions).then(function (pushSubscription) {
              // subscription 정보를 저장할 서버로 보낸다.
              postSubscription(pushSubscription);
            });
          });
      }
    });
  }
  requestNotification();
};

const ConcertTicket: FC<{ userTicket: UserTicket }> = ({ userTicket }) => {
  useEffect(() => {
    registerPushNotification(userTicket);
  }, []);

  return <TicketInfo userTicket={userTicket} />;
};

export default ConcertTicket;
