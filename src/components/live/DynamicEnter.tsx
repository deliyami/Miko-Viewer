import { AspectRatio, Box, Center, Divider, Flex, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import { IMAGE_DOMAIN } from '@src/const';
import { convertDate } from '@src/helper';
import { curUserTicketState } from '@src/state/recoil';
import { useUser } from '@src/state/swr';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const EnterRoomBtn = () => {
  const router = useRouter();
  const curUserTicket = useRecoilValue(curUserTicketState);
  console.log('enter room btn', curUserTicket);
  const enterHandler = () => {
    setCookie(USER_TICKET_COOKIE, curUserTicket.id + '', 6);
    router.push('/live/viewing', '', { shallow: false });
  };

  return <Button onClick={enterHandler}>入場する</Button>;
};

const PrivateRoomIdInput = () => {
  const [roomId, setRoomId] = useRecoilState(enterRoomIdState);
  const router = useRouter();
  useEffect(() => {
    const queryRoomId = router.query?.roomId;
    if (queryRoomId) {
      setRoomId(queryRoomId as string);
    }
  }, [router.query.roomId as string]);

  const createRoomIdHandler = () => {
    setRoomId(nanoid());
  };

  return (
    <HStack my={5}>
      <Input value={roomId} isInvalid={roomId?.length !== 21} contentEditable="false" onChange={e => setRoomId(e.target.value)} />
      <Button colorScheme="green" onClick={createRoomIdHandler}>
        ID 生成
      </Button>
    </HStack>
  );
};

const RoomSelect = () => {
  const [radioValue, setRadioValue] = useState('public');
  const setEnterRoomId = useSetRecoilState(enterRoomIdState);
  const isPublicRoom = useMemo(() => radioValue === 'public', [radioValue]);

  const radioChangeHandler = (value: string) => {
    if (value === 'public') {
      setEnterRoomId(undefined);
    }
    setRadioValue(value);
  };

  return (
    <Box my={5}>
      <RadioGroup value={radioValue} onChange={radioChangeHandler}>
        <Stack spacing={5} direction="row">
          <Radio colorScheme="red" value="public">
            ランダム
          </Radio>
          <Radio colorScheme="green" value="private">
            プライベート
          </Radio>
        </Stack>
      </RadioGroup>
      <Flex h="100px" w="full" alignItems="center">
        {isPublicRoom ? (
          <Box>
            <Heading size="md">ランダムのルームに入場します。</Heading>
          </Box>
        ) : (
          <PrivateRoomIdInput />
        )}
      </Flex>
    </Box>
  );
};

const CurEnterInfo: FC = () => {
  const router = useRouter();
  useUser();
  const curUserTicket = useRecoilValue(curUserTicketState);

  useEffect(() => {
    if (router.isReady) {
      if (!curUserTicket) {
        router.push('/my/lists/1');
      }
    }
    return () => {};
  }, [router.isReady]);

  if (curUserTicket) return <Box>no ticket</Box>;

  const { ticket, concert } = curUserTicket;

  const startDate = convertDate(ticket.concertStartDate, 'YMDHM'); // 티켓 시작날

  return (
    <Flex justifyContent="center">
      <Box>
        <AspectRatio maxW="400px" ratio={1}>
          <Image src={IMAGE_DOMAIN + concert.coverImage} objectFit="cover" fallbackSrc="https://via.placeholder.com/300" />
        </AspectRatio>
        <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(6, 1fr)">
          <GridItem rowSpan={1} colSpan={2}>
            <Heading as="h5" size="sm" my={2}>
              Title
            </Heading>
            <Heading as="h5" size="sm" my={2}>
              Artist
            </Heading>
            <Heading as="h5" size="sm" my={2}>
              公演の日付
            </Heading>
            <Heading as="h5" size="sm" my={2}>
              公演時間
            </Heading>
          </GridItem>
          <GridItem rowSpan={1} colSpan={4}>
            <Heading as="h5" size="sm" my={2}>
              {concert.title}
            </Heading>
            <Heading as="h5" size="sm" my={2}>
              {concert.artist}
            </Heading>
            <Heading as="h5" size="sm" my={2}>
              {startDate}時
            </Heading>
            <Heading as="h5" size="sm" my={2}>
              {ticket.runningTime}分
            </Heading>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

const EnterPage = () => {
  return (
    <>
      <Box width="400px">
        <CurEnterInfo />
      </Box>
      <Center height="500px" mx={14}>
        <Divider orientation="vertical" />
      </Center>
      <Box width="400px" mt={20}>
        <Heading>コンサート入場</Heading>
        <RoomSelect />
        <EnterRoomBtn />
      </Box>
    </>
  );
};

export default EnterPage;