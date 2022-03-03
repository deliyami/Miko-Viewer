import { createStandaloneToast } from '@chakra-ui/react';
import useSocket from '@src/hooks/useSocket';
import {
  messagesState,
  // mySocket as socket,
  myStreamState,
  PeerDataInterface,
  peerDataListState,
  roomIdState,
  videoStreamsState,
} from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import { DataConnectionEvent } from '@src/types/DataConnectionEventType';
import produce from 'immer';
import { nanoid } from 'nanoid';
import Peer, { DataConnection } from 'peerjs';
import { FC, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const toast = createStandaloneToast();

interface ConnectParams {
  audio: boolean;
  video: boolean;
}

const myPeerUniqueID = nanoid();
const myPeer = new Peer(myPeerUniqueID, { debug: 2 });
const concertId = 1111;

//@ts-ignore
const getUserMedia =
  //@ts-ignore
  navigator.getUserMedia ||
  //@ts-ignore
  navigator.webkitGetUserMedia ||
  //@ts-ignore
  navigator.mozGetUserMedia;

const WithSocketEventLayout: FC = ({ children }) => {
  const socket = useSocket();
  const user = useUser();

  const [streamOptions, _] = useState<ConnectParams>({
    audio: true,
    video: true,
  });

  const [roomId, setRoomIdState] = useRecoilState(roomIdState);
  const [videoStreams, setVideoStreams] = useRecoilState(videoStreamsState);
  const [peerDataList, setPeerDataList] = useRecoilState(peerDataListState);
  const [myStream, setMyStream] = useRecoilState(myStreamState);
  // const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const [messages, setMessages] = useRecoilState(messagesState);

  const addDataConnectionToPeersDataList = useCallback(
    (dataConnection: DataConnection) => {
      setPeerDataList(
        produce((peers) => {
          const idx = peers.findIndex(
            (peer) => peer.id === dataConnection.peer
          );
          console.log('find index ', idx, dataConnection);
          if (idx >= 0) peers[idx].dataConnection = dataConnection;
        })
      );
    },
    []
  );

  const addMediaStreamToPeersDataList = useCallback(
    (mediaSteram: MediaStream, id) => {
      setPeerDataList(
        produce((peers) => {
          const idx = peers.findIndex((peer) => peer.id === id);
          if (idx >= 0) peers[idx].mediaStream = mediaSteram;
        })
      );
    },
    []
  );

  const removePeerById = useCallback((id) => {
    setPeerDataList(
      produce((peers) => {
        return peers.filter((peer) => peer.id !== id);
      })
    );
  }, []);

  const addEventToDataConnection = (dataConnection: DataConnection) => {
    const id = dataConnection.peer;
    dataConnection.on('data', (event: DataConnectionEvent) => {
      console.log('data connection event :', event);
      switch (event.type) {
        case 'chat':
          const chatDiv = document.getElementById(id + 'chat');
          chatDiv.innerText = event.data.text;
          break;
        case 'motion':
          break;
        default:
          break;
      }
    });
    // Firefox와 호환 안됨.
    dataConnection.on('close', () => {
      removePeerById(id);
    });
  };

  useEffect(() => {
    if (!socket || !user.data) {
      console.log('not socket or user', socket, user);
      return;
    }
    console.log('user and socket exist', socket, user, myPeerUniqueID);

    socket.emit(
      'fe-new-user-request-join',
      myPeerUniqueID,
      roomId,
      user.data,
      concertId
    );

    myPeer.on('connection', (dataConnection) => {
      console.log('data connected to ', dataConnection.peer);
      // setPeerDataList(
      //   produce((peers) => {
      //     const idx = peers.findIndex(
      //       (peer) => peer.id === dataConnection.peer
      //     );
      //     peers[idx].dataConnection = dataConnection;
      //   })
      // );
      addDataConnectionToPeersDataList(dataConnection);
      addEventToDataConnection(dataConnection);
    });

    myPeer.on('disconnected', () => {
      toast({
        title: 'myPeer disconnected',
        description: 'peer가 시그널링 서버와 끊겼습니다.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      myPeer.reconnect();
    });

    myPeer.on('error', (err) => {
      toast({
        title: 'myPeer error',
        description: '심각한 에러발생 로그창 확인.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.error(err);
    });

    const newUserCome = (
      otherPeerId: string,
      roomID: string,
      otherUserData: PeerDataInterface['data']
    ) => {
      console.log('new-user-come', otherPeerId, roomId, otherUserData);

      setPeerDataList(
        produce((prevPeers) => {
          const notFound = !prevPeers.some((peer) => peer.id === otherPeerId);
          if (notFound && otherPeerId !== myPeerUniqueID)
            prevPeers.push({ id: otherPeerId, data: otherUserData });
          return prevPeers;
        })
      );
      // socket.emit('newUserName', roomId, user.data.email);
      getUserMedia(
        streamOptions,
        (stream) => {
          setMyStream(stream);
          // localStorage.setItem('currentStreamId', stream.id);

          if (otherPeerId !== myPeerUniqueID) {
            socket.emit(
              'fe-answer-send-peer-id',
              roomID,
              myPeerUniqueID,
              user.data
            );
            const call = myPeer.call(otherPeerId, stream);

            call.on('stream', (remoteStream) => {
              // if (stream.id !== remoteStream.id) {
              //   setVideoStreams((prevStreams) => {
              //     const newStreams = [...prevStreams];
              //     const found = newStreams.some(
              //       (el) => el.id === remoteStream.id
              //     );
              //     if (!found) newStreams.push(remoteStream);
              //     return newStreams;
              //   });
              // }
              addMediaStreamToPeersDataList(remoteStream, call.peer);
            });
          }
        },
        (err) => {
          console.log('Failed to get local stream', err);
        }
      );

      myPeer.on('call', (mediaConnection) => {
        getUserMedia(
          { video: true, audio: true },
          (myStream) => {
            setMyStream(myStream);
            // localStorage.setItem('currentStreamId', stream.id);
            mediaConnection.answer(myStream);
            mediaConnection.on('stream', (otherStream) => {
              // if (myStream?.id !== otherStream.id) {
              //   setVideoStreams((prevStreams) => {
              //     const newStreams = [...prevStreams];
              //     const found = newStreams.some(
              //       (aStream) => aStream.id === otherStream.id
              //     );
              //     if (!found) newStreams.push(otherStream);
              //     return newStreams;
              //   });
              // }
              addMediaStreamToPeersDataList(otherStream, mediaConnection.peer);
            });
          },
          (err) => {
            console.log('Failed to get stream', err);
          }
        );
      });

      const dataConnection = myPeer.connect(otherPeerId);
      console.log(
        'abc',
        myPeer.disconnected,
        myPeer.connections,
        dataConnection
      );

      dataConnection.on('open', () => {
        console.log('data connect success 👌 to' + otherPeerId);
        addDataConnectionToPeersDataList(dataConnection);
        addEventToDataConnection(dataConnection);
        dataConnection.send('Hello! I am' + myPeerUniqueID);
      });
    };
    const broadcastPeerId = (
      peerId: string,
      otherUserData: PeerDataInterface['data']
    ) => {
      console.log('broadcastPeerId', otherUserData);
      setPeerDataList(
        produce((prevPeers) => {
          const notFound = !prevPeers.some((peer) => peer.id === peerId);
          if (notFound && peerId !== myPeerUniqueID)
            prevPeers.push({
              id: peerId,
              data: otherUserData,
            });
          return prevPeers;
        })
      );
    };
    const broadcastNewMessage = (data: ChatMessageInterface) => {
      let currentSender = data.sender;
      setMessages(
        produce((prevMsgs) => {
          prevMsgs.push(data);
          return prevMsgs;
        })
      );
    };
    socket.on('be-new-user-come', newUserCome);
    socket.on('be-broadcast-peer-id', broadcastPeerId);
    socket.on('be-broadcast-new-message', broadcastNewMessage);

    socket.on('be-user-left', (peerId: string) => {
      removePeerById(peerId);
    });

    // window.onbeforeunload = () => {
    //   // const currentStreamID = localStorage.getItem('currentStreamId');
    //   socket.emit('userExited', myStream.id, roomId);
    // };

    // socket.on('shareScreen', (stream) => {

    // })

    return () => {
      console.log('Socket Event Add - useEffect return');
      socket.off('new-user-arrived-finish', newUserCome);
      socket.off('be-broadcast-peer-id', broadcastPeerId);
      socket.off('be-broadcast-new-message', broadcastNewMessage);
      socket.emit('fe--user-left', myPeerUniqueID, roomId, concertId);
      myPeer.destroy();
      setPeerDataList([]);
      setVideoStreams([]);
      setMessages([]);
    };
  }, [user.data, socket]);

  return <> {children}</>;
};

export default WithSocketEventLayout;
