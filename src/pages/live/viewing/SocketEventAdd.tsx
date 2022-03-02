import {
  messagesState,
  mySocket as socket,
  myStreamState,
  newMessageState,
  peersArrayState,
  roomIdState,
  screenStreamIDState,
  screenStreamState,
  startSharingButtonDisabledState,
  startSharingState,
  userNamesState,
  videoStreamsState,
} from '@src/state/recoil/viewingState';
import { useUser } from '@src/state/swr/useUser';
import Peer from 'peerjs';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

interface ConnectParams {
  audio: boolean;
  video: boolean;
}

const myPeerUniqueID = Math.round(Math.random() * 100000) + '';
const myPeer = new Peer(myPeerUniqueID);

const SocketEventAdd: FC = ({ children }) => {
  // const socket = useSocket();
  const user = useUser();
  // const user = { data: { email: 'aaaa' } };

  const [streamOptions, _] = useState<ConnectParams>({
    audio: true,
    video: true,
  });

  const [roomId, setRoomIdState] = useRecoilState(roomIdState);
  const [videoStreams, setVideoStreams] = useRecoilState(videoStreamsState);
  const [peersArray, setPeersArray] = useRecoilState(peersArrayState);
  const [myStream, setMyStream] = useRecoilState(myStreamState);
  const [userNames, setUserNames] = useRecoilState(userNamesState);
  const [newMessage, setNewMessage] = useRecoilState(newMessageState);
  const [messages, setMessages] = useRecoilState(messagesState);

  const [shareScreenButtonText, setShareScreenButtonText] = useState<string>(
    'Start screen sharing'
  );
  const [startSharing, setStartSharing] = useRecoilState(startSharingState);
  const [startSharingButtonDisabled, setStartSharingButtonDisabled] =
    useRecoilState(startSharingButtonDisabledState);
  const [screenStreamID, setScreenStreamID] =
    useRecoilState(screenStreamIDState);
  const [screenStream, setScreenStream] = useRecoilState(screenStreamState);

  //@ts-ignore
  const getUserMedia =
    //@ts-ignore
    navigator.getUserMedia ||
    //@ts-ignore
    navigator.webkitGetUserMedia ||
    //@ts-ignore
    navigator.mozGetUserMedia;

  useEffect(() => {
    console.log('Socket add useEffect');
    if (!socket || !user.data) {
      console.log('not socket or user', socket, user);
      return;
    }
    console.log('user and socket exist', socket, user, myPeerUniqueID);

    socket.emit(
      'new-user-arriving-start',
      myPeerUniqueID,
      roomId,
      user.data.email
    );

    const newUserArrivedFinishEvent = (
      peerID: string,
      roomID: string,
      userName: string
    ) => {
      console.log('new-user-arrived-finish', peerID, roomId, userName);
      setPeersArray((peers) => {
        const streamsCopy = [...peers];
        const found = streamsCopy.some((el) => el === peerID);
        if (!found && peerID !== myPeerUniqueID) streamsCopy.push(peerID);

        return streamsCopy;
      });

      // if (!fullName) {
      //   localStorage.setItem('fullName', userName);
      //   setFullName(userName);
      // }
      socket.emit('newUserName', roomId, user.data.email);

      getUserMedia(
        streamOptions,
        function (stream) {
          setMyStream(stream);

          localStorage.setItem('currentStreamId', stream.id);

          if (peerID !== myPeerUniqueID) {
            socket.emit('sendMyPeer', roomID, myPeerUniqueID);
            var call = myPeer.call(peerID, stream);
            call.on('stream', function (remoteStream) {
              if (stream.id !== remoteStream.id) {
                setVideoStreams((streams) => {
                  const streamsCopy = [...streams];
                  const found = streamsCopy.some(
                    (el) => el.id === remoteStream.id
                  );
                  if (!found) streamsCopy.push(remoteStream);
                  return streamsCopy;
                });
              }
            });
          }
        },
        function (err) {
          console.log('Failed to get local stream', err);
        }
      );

      myPeer.on('call', function (call) {
        getUserMedia(
          { video: true, audio: true },
          function (stream) {
            setMyStream(stream);

            localStorage.setItem('currentStreamId', stream.id);
            call.answer(stream);

            call.on('stream', function (remoteStream) {
              if (myStream?.id !== remoteStream.id) {
                setVideoStreams((streams) => {
                  const streamsCopy = [...streams];

                  const found = streamsCopy.some(
                    (el) => el.id === remoteStream.id
                  );
                  if (!found) streamsCopy.push(remoteStream);
                  return streamsCopy;
                });
              }
            });
          },
          function (err) {
            console.log('Failed to get local stream', err);
          }
        );
      });
    };
    socket.on('new-user-arrived-finish', newUserArrivedFinishEvent);

    socket.on('receiveMyPeer', (peer: string) => {
      setPeersArray((peers) => {
        const streamsCopy = [...peers];
        const found = streamsCopy.some((el) => el === peer);
        if (!found && peer !== myPeerUniqueID) streamsCopy.push(peer);
        return streamsCopy;
      });
    });

    socket.on('newUserName', (userName: string) => {
      if (userName !== user.data.email) {
        setUserNames((userNames) => {
          const userNamesCopy = [...userNames];
          const found = userNamesCopy.some((el) => el === userName);
          if (!found) userNamesCopy.push(userName);

          return userNamesCopy;
        });
      }
    });

    socket.on(
      'new message received',
      (data: { sender: string; receivedMessage: string }) => {
        let currentSender = data.sender;
        console.log('메세지 도착');
        setMessages((currentArray) => {
          return [
            ...currentArray,
            {
              sender: currentSender,
              receivedMessage: data.receivedMessage,
            },
          ];
        });
        setNewMessage('');
      }
    );

    socket.on('screen-share-receive', (streamID: string) => {
      setScreenStreamID(streamID);
      setShareScreenButtonText('Start screen sharing');
      setStartSharingButtonDisabled(true);
    });

    socket.on('screen-share-stop-done', (streamID: string) => {
      setStartSharingButtonDisabled(false);
      setVideoStreams((streams) => {
        const streamsCopy = streams.filter((el) => {
          return el.id !== streamID;
        });
        return streamsCopy;
      });
    });

    socket.on('userLeft', (streamID: string) => {
      setVideoStreams((currentArray) => {
        let currentStreams = currentArray.filter((el) => {
          return el.id != streamID;
        });
        return [...currentStreams];
      });
    });

    window.onbeforeunload = () => {
      const currentStreamID = localStorage.getItem('currentStreamId');
      socket.emit('userExited', currentStreamID, roomId);
    };

    // socket.on('shareScreen', (stream) => {

    // })

    return () => {
      socket.off('new-user-arrived-finish', newUserArrivedFinishEvent);
    };
  }, [user.data]);

  console.log('socket socket', socket);

  return <> {children}</>;
};

export default SocketEventAdd;
