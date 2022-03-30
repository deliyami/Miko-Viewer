import { Box, Button, Center, Divider, Flex, Grid, GridItem, Heading, HStack, Image, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { S3_URL, USER_TICKET_COOKIE } from '@src/const';
import { convertDate } from '@src/helper/convertDate';
import { setCookie } from '@src/helper/setCookie';
import BasicLayout from '@src/layout/BasicLayout';
import { curUserTicketState, enterRoomIdState } from '@src/state/recoil/concertState';
import { Concert } from '@src/types/share/Concert';
import { Ticket } from '@src/types/share/Ticket';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

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
  }, [router.query.roomId]);

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
            Public
          </Radio>
          <Radio colorScheme="green" value="private">
            Private
          </Radio>
        </Stack>
      </RadioGroup>
      {!isPublicRoom && <PrivateRoomIdInput />}
    </Box>
  );
};

const CurEnterInfo: FC<{ ticket: Ticket; concert: Concert }> = ({ ticket, concert }) => {
  console.log('concert', concert);
  const startDate = convertDate(ticket.concertStartDate, 'YMDHM'); // 티켓 시작날

  return (
    <Flex justifyContent="center">
      <Box>
        <Image w="350px" h="350px" src={S3_URL + concert.coverImage} fallbackSrc="https://via.placeholder.com/300" />
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

const RoomEnterPage = props => {
  const router = useRouter();
  const curUserTicket = useRecoilValue(curUserTicketState);

  useEffect(() => {
    if (router.isReady) {
      if (!curUserTicket) {
        router.push('/my/lists/1');
      }
    }
    return () => {};
  }, [router.isReady]);

  return (
    <Flex width="full" justifyContent="center">
      <Box width="400px">{curUserTicket ? <CurEnterInfo ticket={curUserTicket.ticket} concert={curUserTicket.concert} /> : 'no'}</Box>
      <Center height="500px" mx={14}>
        <Divider orientation="vertical" />
      </Center>
      <Box width="400px" mt={20}>
        <Heading>コンサート入場</Heading>
        <RoomSelect />
        <EnterRoomBtn />
      </Box>
    </Flex>
  );
};

RoomEnterPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default RoomEnterPage;
