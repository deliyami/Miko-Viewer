import { Box, Button, Container, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { USER_TICKET_COOKIE } from "@src/const";
import { setCookie } from "@src/helper/setCookie";
import BasicLayout from "@src/layout/BasicLayout";
import { curUserTicketState, enterRoomIdState } from "@src/state/recoil/concertState";
import { Concert } from "@src/types/share/Concert";
import { Ticket } from "@src/types/share/Ticket";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React, { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const EnterRoomBtn = () => {
  const router = useRouter();
  const curUserTicket = useRecoilValue(curUserTicketState);
  console.log("enter room btn", curUserTicket);
  const enterHandler = () => {
    setCookie(USER_TICKET_COOKIE, curUserTicket.id + "", 6);
    router.push("/live/viewing", "", { shallow: false });
  };

  return <Button onClick={enterHandler}>입장하기</Button>;
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
    <Box>
      <Input value={roomId} isInvalid={roomId?.length !== 21} contentEditable="false" onChange={e => setRoomId(e.target.value)} />
      <Button onClick={createRoomIdHandler}>생성</Button>
    </Box>
  );
};

const RoomSelect = () => {
  const [radioValue, setRadioValue] = useState("public");
  const setEnterRoomId = useSetRecoilState(enterRoomIdState);
  const isPublicRoom = useMemo(() => (radioValue === "public" ? true : false), [radioValue]);

  const radioChangeHandler = (value: string) => {
    if (value === "public") {
      setEnterRoomId(undefined);
    }
    setRadioValue(value);
  };

  return (
    <Box>
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
  console.log("concert", concert);
  return (
    <Box>
      <Text>{concert.title}</Text>
      <Text>{concert.artist}</Text>
      <Text>{concert.categoryId}</Text>
      <Text>{ticket.price}</Text>
    </Box>
  );
};

const RoomEnterPage = props => {
  const router = useRouter();
  const curUserTicket = useRecoilValue(curUserTicketState);

  useEffect(() => {
    if (router.isReady) {
      if (!curUserTicket) {
        router.push("/my/lists/1");
      }
    }
    return () => {};
  }, [router.isReady]);

  return (
    <Container>
      {curUserTicket ? <CurEnterInfo ticket={curUserTicket.ticket} concert={curUserTicket.concert} /> : "no"}
      <RoomSelect />
      <EnterRoomBtn />
    </Container>
  );
};

RoomEnterPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default RoomEnterPage;
