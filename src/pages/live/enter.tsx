import { Box, Button, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../../hooks/useSocket'



const RoomEnterPage = (props) => {
  const router = useRouter();
  const roomRef = useRef<HTMLInputElement>();
  const userRef = useRef<HTMLInputElement>();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  // const sockets = useSocket();

  function findError(error){
    if (!error||error===4) {
      const roomName = roomRef.current.value;
      const userName = userRef.current.value;

      sessionStorage.setItem('user', userName);
      sessionStorage.setItem('roomName', roomName);
      sessionStorage.setItem('host',error)
      // props.history.push(`/room/${roomName}`);
      router.push({
        pathname:'/live/viewing',
        query:{
          roomId:roomName,
          user:userName,
        }
      },'/live/viewing',{shallow:true})
    } else {
      setErr(error);
      setErrMsg(error===1?'해당 닉네임은 해당 방에서 중복됩니다':'찾는 방이 가득 찼습니다');
    }
  }

  useEffect(() => {
    window.pcs = {};
    // window.sockets.on('FE-error-user-exist', findError);
  }, []);
  

  function clickJoin(e:React.MouseEvent) {
    e.preventDefault();
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;
    findError(0)
  }

  function clickLeave(e:React.MouseEvent){ 
    e.preventDefault();
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;
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
      <Button onClick={clickLeave}> Leave </Button>
      {err ? <div>{errMsg}</div> : null}
    </Container>
  );
};

export default RoomEnterPage;
