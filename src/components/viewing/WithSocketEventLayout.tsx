import useSocket from '@src/hooks/useSocket';
import {
  messagesState,
  // mySocket as socket,
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
const myPeer = new Peer(myPeerUniqueID, { debug: 2 });
console.log('my peer id :', myPeer.id);

const WithSocketEventLayout: FC = ({ children }) => {
  const socket = useSocket();
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
      otherPeerId: string,
      roomID: string,
      userName: string
    ) => {
      console.log('new-user-arrived-finish', otherPeerId, roomId, userName);
      setPeersArray((prevPeers) => {
        const newPeers = [...prevPeers];
        const found = newPeers.some((el) => el === otherPeerId);
        if (!found && otherPeerId !== myPeerUniqueID)
          newPeers.push(otherPeerId);
        return newPeers;
      });

      // if (!fullName) {
      //   localStorage.setItem('fullName', userName);
      //   setFullName(userName);
      // }
      socket.emit('newUserName', roomId, user.data.email);

      getUserMedia(
        streamOptions,
        (stream) => {
          setMyStream(stream);

          // localStorage.setItem('currentStreamId', stream.id);

          if (otherPeerId !== myPeerUniqueID) {
            socket.emit('sendMyPeer', roomID, myPeerUniqueID);
            const call = myPeer.call(otherPeerId, stream);

            call.on('stream', (remoteStream) => {
              if (stream.id !== remoteStream.id) {
                setVideoStreams((prevStreams) => {
                  const newStreams = [...prevStreams];
                  const found = newStreams.some(
                    (el) => el.id === remoteStream.id
                  );
                  if (!found) newStreams.push(remoteStream);
                  return newStreams;
                });
              }
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
              if (myStream?.id !== otherStream.id) {
                setVideoStreams((prevStreams) => {
                  const newStreams = [...prevStreams];
                  const found = newStreams.some(
                    (aStream) => aStream.id === otherStream.id
                  );
                  if (!found) newStreams.push(otherStream);
                  return newStreams;
                });
              }
            });
          },
          (err) => {
            console.log('Failed to get stream', err);
          }
        );
      });

      const dataConnection = myPeer.connect(otherPeerId);

      dataConnection.on('open', () => {
        console.log('open!');

        dataConnection.on('data', (data) => {
          console.log('Received A', data);
        });
        // Send messages
        dataConnection.send('Hello!');
      });

      setInterval(() => {
        dataConnection.send('hello');
      }, 1000);

      myPeer.on('connection', (dataConnection) => {
        dataConnection.on('data', (data) => {
          console.log('Received B', data);
        });
        setInterval(() => {
          dataConnection.send('hello');
        }, 1000);
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
      // const currentStreamID = localStorage.getItem('currentStreamId');
      socket.emit('userExited', myStream.id, roomId);
    };

    // socket.on('shareScreen', (stream) => {

    // })

    return () => {
      console.log('Socket Event Add - useEffect return');
      socket.off('new-user-arrived-finish', newUserArrivedFinishEvent);
      myPeer.destroy();
      setPeersArray([]);
      setVideoStreams([]);
      setMessages([]);
    };
  }, [user.data, socket]);

  return <> {children}</>;
};

export default WithSocketEventLayout;
