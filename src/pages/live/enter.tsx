import { Box, Button, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../../hooks/useSocket'

const backendDone = (msg) => {
  console.log('work done!:',msg)
}


const RoomEnterPage = (props) => {
  const router = useRouter();
  const roomRef = useRef<HTMLInputElement>();
  const userRef = useRef<HTMLInputElement>();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const sockets = useSocket();

  function findError(error){
    if (!error) {
      const roomName = roomRef.current.value;
      const userName = userRef.current.value;
  
      sessionStorage.setItem('user', userName);
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
    console.log(window.sockets)
    // if(!sockets) return;
    window.sockets.on('FE-error-user-exist', findError);
  }, []);
  

  function clickJoin(e:React.MouseEvent) {
    e.preventDefault();
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      sockets.emit('BE-participate-room', { roomId: roomName, userName },findError);
      // sockets.on('welcome',({roomId, userName})=>{
      //   console.log(`${roomId}방에 ${userName}님이 참가하였습니다`)
      // })
      // sockets.on('goodbye',({roomId, userName})=>{
      //   console.log(`${roomId}방애 ${userName}님이 나가셨습니다`)
      // })
      
      // router.push(`/live/viewing?roomId=${roomName}&user=${userName}`,'/live/viewing',{shallow:true});

      // router.push({
      //   pathname:'/live/viewing',
      //   query:{
      //     roomId:roomName,
      //     user:userName,
      //   }
      // },'/live/viewing',{shallow:true})
    }
  }

  function clickLeave(e:React.MouseEvent){ 
    e.preventDefault();
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;
    // sockets.emit('BE-leave-room', { roomId: roomName, userName },backendDone)
    // sockets.emit('disconnecting', { roomId: roomName, userName },backendDone);
    sockets.disconnect()
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
