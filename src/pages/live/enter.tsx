import { Box, Button, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const RoomEnterPage = (props) => {
  const router = useRouter();
  const roomRef = useRef<HTMLInputElement>();
  const userRef = useRef<HTMLInputElement>();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {}, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      console.log('aaaa');
    }
  }

  return (
    <Container>
      <Box>
        <label htmlFor="roomName">Room Name</label>
        <input type="text" id="roomName" ref={roomRef} />
      </Box>
      <Box>
        <label htmlFor="userName">User Name</label>
        <input type="text" id="userName" ref={userRef} />
      </Box>
      <Button onClick={clickJoin}> Join </Button>
      {err ? <div>{errMsg}</div> : null}
    </Container>
  );
};

export default RoomEnterPage;
