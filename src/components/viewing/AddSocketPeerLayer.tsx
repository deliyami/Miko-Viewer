import setMotionToAvatar from '@src/helper/setMotionToAvatar';
import showChatToRoom from '@src/helper/showChatToRoom';
import { toastLog } from '@src/helper/toastLog';
import { updateUserScore } from '@src/helper/updateUserScore';
import useMyPeer from '@src/hooks/useMyPeer';
import useSocket from '@src/hooks/useSocket';
import { enterConcertState, enterRoomIdAsyncState } from '@src/state/recoil/concertState';
import { messagesState, myStreamState, PeerDataInterface, peerDataListState } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import { DataConnectionEvent } from '@src/types/DataConnectionEventType';
import produce from 'immer';
import { DataConnection } from 'peerjs';
import { FC, useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// NOTE video를 true로 할경우 여러 브라우저에서 카메로 리소스 접근할때 보안상의 이유로 에러가 나올 확률이 높음
// getUserMedia의 callback이 실행되지 않아서 먼저 들어온 사람의 영상이 안 보일 수 있음.
// Bind 해주지 않으면 this 에러남.
const getUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) as typeof navigator.mediaDevices.getUserMedia;

const WithSocketEventLayout: FC = ({ children }) => {
  const concertId = useRecoilValue(enterConcertState)?.id;
  const roomId = useRecoilValue(enterRoomIdAsyncState);
  console.log('roomId', roomId);
  const socket = useSocket();
  const user = useUser();
  const myPeer = useMyPeer();
  const myPeerUniqueID = user.data.uuid;

  const streamOptions: MediaStreamConstraints = { audio: true, video: true };

  const setPeerDataList = useSetRecoilState(peerDataListState);
  const setMyStream = useSetRecoilState(myStreamState);
  const setMessages = useSetRecoilState(messagesState);

  const addDataConnectionToPeersDataList = useCallback(
    (dataConnection: DataConnection) => {
      setPeerDataList(
        produce(draft => {
          const idx = draft.findIndex(peer => peer.id === dataConnection.peer);
          if (idx >= 0) draft[idx].dataConnection = dataConnection;
        }),
      );
    },
    [setPeerDataList],
  );

  const addMediaStreamToPeersDataList = useCallback(
    (mediaStream: MediaStream, id) => {
      setPeerDataList(
        produce(draft => {
          const idx = draft.findIndex(peer => peer.id === id);
          if (idx >= 0) draft[idx].mediaStream = mediaStream;
        }),
      );
    },
    [setPeerDataList],
  );

  const removePeerById = useCallback(
    id => {
      setPeerDataList(
        produce(draft => {
          const idx = draft.findIndex(peer => peer.id === id);
          if (idx !== 1) {
            draft.splice(idx, 1);
          }
        }),
      );
    },
    [setPeerDataList],
  );

  useEffect(() => {
    const addEventToDataConnection = (dataConnection: DataConnection) => {
      const id = dataConnection.peer;
      dataConnection.on('data', (event: DataConnectionEvent) => {
        console.log('data from peer', id);
        switch (event.type) {
          case 'chat':
            showChatToRoom(id, event.data.text, 5);
            break;
          case 'motion':
            setMotionToAvatar(id, event.data);
            break;
          case 'scoreUpdate':
            updateUserScore(id, event.data);
            break;
          default:
            break;
        }
      });

      // Firefox와 호환 안됨.
      dataConnection.on('close', () => {
        removePeerById(id);
      });
      dataConnection.on('error', () => {
        removePeerById(id);
      });
    };

    if (!socket || !user.data) {
      return;
    }

    socket.emit('fe-new-user-request-join', myPeerUniqueID, roomId, user.data, concertId);

    myPeer.on('connection', dataConnection => {
      addDataConnectionToPeersDataList(dataConnection);
      addEventToDataConnection(dataConnection);
    });

    myPeer.on('disconnected', () => {
      myPeer.reconnect();
      toastLog('error', 'myPeer disconnected', 'peer가 시그널링 서버와 끊겼습니다.');
    });

    myPeer.on('error', _ => {
      toastLog('error', 'myPeer error', '심각한 에러발생 로그창 확인.');
    });

    // navigator.mediaDevices.
    getUserMedia(streamOptions)
      .then(stream => {
        setMyStream(stream);
      })
      .catch(err => {
        toastLog('error', 'get stream fail', '', err);
        console.error(err);
      });

    const newUserCome = (otherPeerId: string, roomID: string, otherUserData: PeerDataInterface['data'], otherSocketId) => {
      console.log('newUserCome', otherPeerId, otherUserData.email);

      setPeerDataList(
        produce(prevPeers => {
          const notFound = !prevPeers.some(peer => peer.id === otherPeerId);
          if (notFound && otherPeerId !== myPeerUniqueID) prevPeers.push({ id: otherPeerId, data: otherUserData });
          return prevPeers;
        }),
      );

      getUserMedia(streamOptions)
        .then(stream => {
          setMyStream(stream);
          if (otherPeerId !== myPeerUniqueID) {
            socket.emit('fe-answer-send-peer-id', otherSocketId);
            const call = myPeer.call(otherPeerId, stream);
            call.on('stream', remoteStream => {
              addMediaStreamToPeersDataList(remoteStream, call.peer);
            });
          }
        })
        .catch(_ => {
          toastLog('error', 'Failed to get local stream', '미디어에 대한 접근 권한을 얻지 못 했습니다.');
        });

      myPeer.on('call', mediaConnection => {
        getUserMedia({ video: true, audio: true })
          .then(myStream => {
            setMyStream(myStream);
            mediaConnection.answer(myStream);
            mediaConnection.on('stream', otherStream => {
              addMediaStreamToPeersDataList(otherStream, mediaConnection.peer);
            });
          })
          .catch(err => {
            console.error('Failed to get stream', err);
          });
      });

      const dataConnection = myPeer.connect(otherPeerId);

      dataConnection.on('open', () => {
        addDataConnectionToPeersDataList(dataConnection);
        addEventToDataConnection(dataConnection);
        dataConnection.send(`Hello! I am${myPeerUniqueID}`);
      });
    };
    const getPeerIdFromBroadcast = (peerId: string, otherUserData: PeerDataInterface['data']) => {
      console.log('getPeerIdFromBroadcast', peerId);
      setPeerDataList(
        produce(prevPeers => {
          const notFound = !prevPeers.some(peer => peer.id === peerId);
          if (notFound && peerId !== myPeerUniqueID)
            prevPeers.push({
              id: peerId,
              data: otherUserData,
            });
          return prevPeers;
        }),
      );
    };
    const broadcastNewMessage = (data: ChatMessageInterface) => {
      setMessages(
        produce(prevMsgs => {
          prevMsgs.push(data);
          return prevMsgs;
        }),
      );
    };

    const failEnterRoom = () => {
      console.log('fail enter room');
      // TODO 새로운 방 번호를 얻고 입장.
    };

    const userLeft = (peerId: string) => {
      removePeerById(peerId);
    };

    myPeer.on('open', id => {
      // NOTE  peer.conncet 는  peer open 상태가 아니면 undefined 리턴
      console.log('emit new user come');
      socket.on('be-new-user-come', newUserCome);
    });
    socket.on('be-broadcast-peer-id', getPeerIdFromBroadcast);
    socket.on('be-broadcast-new-message', broadcastNewMessage);
    socket.on('be-fail-enter-room', failEnterRoom);
    socket.on('be-user-left', userLeft);

    const windowBeforeUnloadEvent = (e: BeforeUnloadEvent) => {
      // NOTE confirm alert propmpt는 모던브라우저 (파폭 제외) onbeforeonload 동안에는 작동 안함
      let isFired = false;
      return function () {
        e.preventDefault();
        if (!isFired) {
          isFired = true;
          const exit = globalThis.confirm('Are you sure you want to leave?');
          if (exit) {
            socket.emit('fe-user-left');
            myPeer.destroy();
            window.close();
          }
        }
      };
    };
    window.addEventListener('beforeunload', windowBeforeUnloadEvent);
    window.addEventListener('unload', windowBeforeUnloadEvent);

    return () => {
      socket.off('be-new-user-come', newUserCome);
      socket.off('be-broadcast-peer-id', getPeerIdFromBroadcast);
      socket.off('be-broadcast-new-message', broadcastNewMessage);
      socket.off('be-broadcast-new-message', userLeft);
      socket.emit('fe-user-left');
      window.removeEventListener('beforeunload', windowBeforeUnloadEvent);
      window.removeEventListener('unload', windowBeforeUnloadEvent);
      myPeer.destroy();
      socket.disconnect();
      setMyStream(undefined);
      setPeerDataList([]);
      setMessages([]);
    };
  }, [user.data, socket]);

  return <> {children}</>;
};

export default WithSocketEventLayout;

// export { myPeerUniqueID };
