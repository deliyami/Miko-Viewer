import { MAX_MSGS } from '@src/const';
import setMotionToAvatar from '@src/helper/setMotionToAvatar';
import showChatToRoom from '@src/helper/showChatToRoom';
import { toastLog } from '@src/helper/toastLog';
import { updateUserScore } from '@src/helper/updateUserScore';
import useBeforeunload from '@src/hooks/useBeforeunload';
import useMyPeer from '@src/hooks/useMyPeer';
import useSocket from '@src/hooks/useSocket';
import { curUserTicketState, enterRoomIdAsyncState } from '@src/state/recoil/concertState';
import { latestScoreState } from '@src/state/recoil/scoreState';
import { messagesState, myStreamState, PeerDataInterface, peerDataListState, PickUserData } from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import { DataConnectionEvent } from '@src/types/DataConnectionEventType';
import produce from 'immer';
import { useRouter } from 'next/router';
import { DataConnection, MediaConnection } from 'peerjs';
import { FC, useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const WithSocketEventLayout: FC = ({ children }) => {
  const socket = useSocket();
  const myPeer = useMyPeer();
  const router = useRouter();

  const user = useUser();
  const myPeerUniqueID = user.data?.uuid;

  // NOTE getUserMedia를 할때마다 새로운 객체가 나와서, getUserMedia를 한번만 실행하도록 개선
  // 또한 미묘한 시간 오차로 인한 오류가 있었음
  const myStream = useRecoilValue(myStreamState);
  const roomId = useRecoilValue(enterRoomIdAsyncState);
  const userTicket = useRecoilValue(curUserTicketState);
  const { concertId, ticketId, id: userTicketId } = userTicket;

  const setLatestScoreState = useSetRecoilState(latestScoreState);
  const setPeerDataList = useSetRecoilState(peerDataListState);
  const setMessages = useSetRecoilState(messagesState);

  // 정리 코드
  const handleLeavePage = () => {
    console.log('withSocketPeerLayer - handleLeavePage');
    setPeerDataList([]);
    setMessages([]);
  };

  useBeforeunload(() => {
    console.log('windowBeforeUnloadEvent in WithSocketPeerLayer');
    handleLeavePage();
  });

  const addDataConnectionToPeersDataList = useCallback((dataConnection: DataConnection) => {
    setPeerDataList(
      produce(draft => {
        const idx = draft.findIndex(peer => peer.id === dataConnection.peer);
        if (idx >= 0) draft[idx].dataConnection = dataConnection;
      }),
    );
  }, []);

  const addMediaStreamToPeersDataList = useCallback((mediaStream: MediaStream, id) => {
    setPeerDataList(
      produce(draft => {
        const idx = draft.findIndex(peer => peer.id === id);
        if (idx >= 0) draft[idx].mediaStream = mediaStream;
      }),
    );
  }, []);

  const addMediaConnectionToPeersDataList = useCallback((mediaConnection: MediaConnection, id) => {
    setPeerDataList(
      produce(draft => {
        const idx = draft.findIndex(peer => peer.id === id);
        if (idx >= 0) draft[idx].mediaConnection = mediaConnection;
      }),
    );
  }, []);

  const removePeerById = useCallback(id => {
    setPeerDataList(
      produce(draft => {
        const idx = draft.findIndex(peer => peer.id === id);
        if (idx !== -1) {
          toastLog('info', `${draft[idx].data.name}がルームを出ました。`);
          draft.splice(idx, 1);
        }
      }),
    );
  }, []);

  useEffect(() => {
    if (!socket || !user.data || !myPeer) {
      toastLog('error', 'socket, user.data, myPeer 중 하나가 없습니다');
      console.log('socket || user 없음', socket, myPeer, user.data);
      return;
    }
    console.log('WithSocketPeerLayer  UseEffect');
    socket.emit('fe-new-user-request-join', myPeerUniqueID, roomId, user.data, concertId, ticketId, userTicketId);
    socket.on('connect', () => {
      // NOTE 서버 재실행시에 다시 소켓 데이터를 전송, 처음 랜더링 될떄에는 이미 connect 이벤트 이후여서 동작하지 않음.
      if (socket.connected) {
        socket.emit('fe-new-user-request-join', myPeerUniqueID, roomId, user.data, concertId, ticketId, userTicketId);
      }
    });

    const addEventToDataConnection = (dataConnection: DataConnection) => {
      const id = dataConnection.peer;
      dataConnection.on('data', (event: DataConnectionEvent) => {
        // console.log('data from peer', id, event.type, event.data);
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
          // case 'model':
          //   updateUserScore(id, event.data);
          //   break;
          default:
            break;
        }
      });
      // Firefox와 호환 안됨.
      dataConnection.on('close', () => {
        // mediaConnection.close() 상대가 할 경우
        toastLog('info', `${(dataConnection.metadata as PickUserData).name}とデータコネクションが切断されました。`, 'dataConnection on close');
        removePeerById(id);
      });
      dataConnection.on('error', err => {
        toastLog('error', `${(dataConnection.metadata as PickUserData).name}とデータコネクションが切断されました。`, 'dataConnection on error', err);
        removePeerById(id);
      });
    };

    const addEventToMediaConnection = (mediaConnection: MediaConnection) => {
      mediaConnection.on('stream', remoteStream => {
        addMediaStreamToPeersDataList(remoteStream, mediaConnection.peer);
      });
    };

    myPeer.on('connection', dataConnection => {
      addDataConnectionToPeersDataList(dataConnection);
      addEventToDataConnection(dataConnection);
    });

    myPeer.on('call', mediaConnection => {
      addMediaConnectionToPeersDataList(mediaConnection, mediaConnection.peer);
      addEventToMediaConnection(mediaConnection);
      mediaConnection.answer(myStream);
    });

    const newUserCome = (otherPeerId: string, roomID: string, otherUserData: PeerDataInterface['data'], otherSocketId) => {
      // console.log('newUserCome', otherPeerId, otherUserData.email);
      toastLog('info', `${otherUserData.name}がルームに入場しました。`);
      const peerIdDuplicateWithMe = otherPeerId === myPeerUniqueID;
      if (peerIdDuplicateWithMe) {
        toastLog('warning', `${otherUserData.name}のPeerId、${otherPeerId}が被りました。`);
        return;
      }

      setPeerDataList(
        produce(prevPeers => {
          const notFound = !prevPeers.some(peer => peer.id === otherPeerId);
          if (notFound) prevPeers.push({ id: otherPeerId, data: otherUserData });
          return prevPeers;
        }),
      );

      socket.emit('fe-answer-send-peer-id', otherSocketId);
      const mediaConnection = myPeer.call(otherPeerId, myStream);
      addMediaConnectionToPeersDataList(mediaConnection, mediaConnection.peer);
      addEventToMediaConnection(mediaConnection);

      const dataConnection = myPeer.connect(otherPeerId, { metadata: otherUserData });
      dataConnection.on('open', () => {
        addDataConnectionToPeersDataList(dataConnection);
        addEventToDataConnection(dataConnection);
      });
    };

    // TODO 이거 이벤트명, 변수명 수정
    const getAnswerFromRoomBroadcast = (peerId: string, otherUserData: PeerDataInterface['data']) => {
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

    const getBroadcastedNewMessage = (data: ChatMessageInterface) => {
      setMessages(
        produce(prevMsgs => {
          const len = prevMsgs.length;
          if (len > MAX_MSGS) prevMsgs.splice(0, len - MAX_MSGS);
          prevMsgs.push(data);
          return prevMsgs;
        }),
      );
    };

    const failEnterRoom = () => {
      // TODO 새로운 방 번호를 얻고 입장.
      toastLog('info', 'ルームが満員であらたま、他のルームに再接続しています。');
    };

    const userLeft = (peerId: string) => {
      removePeerById(peerId);
    };

    const getMyScore = score => {
      setLatestScoreState(
        produce(draft => {
          draft[user.data.uuid] = score;
        }),
      );
    };

    socket.on('be-new-user-come', newUserCome);
    socket.on('be-broadcast-peer-id', getAnswerFromRoomBroadcast);
    socket.on('be-broadcast-new-message', getBroadcastedNewMessage);
    socket.on('be-fail-enter-room', failEnterRoom);
    socket.on('be-user-left', userLeft);
    socket.on('be-send-user-score', getMyScore);

    return () => {
      console.log('withSocketPeerLayer - useEffect 작동함');
      if (user.data) {
        socket.off('be-new-user-come', newUserCome);
        socket.off('be-broadcast-peer-id', getAnswerFromRoomBroadcast);
        socket.off('be-broadcast-new-message', getBroadcastedNewMessage);
        socket.off('be-user-left', userLeft);
        socket.off('be-send-user-score', getMyScore);
        handleLeavePage();
      }
    };
    //  무조건 처음 접속 user.data만 사용함. user.data가 변경되는 경우가 있다면 재접속 해야만 하는 경우
  }, [socket, myPeer]);

  return <> {children}</>;
};

export default WithSocketEventLayout;
