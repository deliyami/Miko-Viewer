import { Button, Text } from '@chakra-ui/react';
import * as ivs from 'amazon-ivs-player';
import { useEffect, useRef, useState } from 'react';
const streamUrl =
  'https://de853ef2a345.us-east-1.playback.live-video.net/api/video/v1/us-east-1.121323684128.channel.Cj5ynk97sEJv.m3u8';

declare global {
  interface Window {
    IVSPlayer: typeof ivs;
  }
}

const VideoPlayer = (props) => {
  const { IVSPlayer } = window;

  const { isPlayerSupported } = IVSPlayer;

  const [loading, setLoading] = useState(true);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [muted, setMuted] = useState(false);

  const [playerPosition, setPlayerPosition] = useState({});
  const [playerSize, setPlayerSize] = useState({});

  const player = useRef<ivs.MediaPlayer>(null);
  const playerBaseEl = useRef(null);
  const videoEl = useRef(null);
  const visibleRef = useRef(null);

  // 브라우저 설정으로 인해서 소리와 함께 자동재생이 허용되지 않았을 경우 state 변경
  useEffect(() => {
    if (!player.current) return;
    setMuted(player.current.isMuted());
  }, [loading]);

  if (IVSPlayer.isPlayerSupported) {
    console.log('yes');
  } else {
    console.log('no');
  }

  // useEffect(() => {
  //   player.current = IVSPlayer.create();
  //   player.current.load(PLAYBACK_URL);
  //   player.current.attachHTMLVideoElement(videoEl.current);
  //   player.current.play();
  //   return () => {};
  // }, []);

  useEffect(() => {
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState;
    const { ERROR } = IVSPlayer.PlayerEventType;

    if (!isPlayerSupported) {
      return console.warn('현재 브라우저는 ivs player를 지원하지 않습니다.');
    }

    const onStateChange = () => {
      const playerState = player.current.getState();

      console.log(`Player State - ${playerState}`);
      setLoading(playerState !== PLAYING);
    };

    const onError = (err) => {
      console.warn('Player Event - ERROR:', err);
    };

    player.current = IVSPlayer.create();
    player.current.attachHTMLVideoElement(videoEl.current);
    player.current.load(streamUrl);
    player.current.play();

    player.current.addEventListener(READY, onStateChange);
    player.current.addEventListener(PLAYING, onStateChange);
    player.current.addEventListener(ENDED, onStateChange);
    player.current.addEventListener(ERROR, onError);

    return () => {
      player.current.removeEventListener(READY, onStateChange);
      player.current.removeEventListener(PLAYING, onStateChange);
      player.current.removeEventListener(ENDED, onStateChange);
      player.current.removeEventListener(ERROR, onError);
    };
  }, [IVSPlayer, isPlayerSupported, streamUrl]);

  const pause = () => {
    if (player.current.isPaused()) {
      player.current.play();
    } else {
      player.current.pause();
    }
    console.log(player.current.isPaused());
    setIsMiniPlayer(false);
  };

  const resize = () => {
    const { offsetLeft, offsetTop } = playerBaseEl.current;

    window.scrollTo({
      top: offsetTop - 20,
      left: offsetLeft,
      behavior: 'smooth',
    });
  };

  const toggleMute = () => {
    const shouldMute = !player.current.isMuted();

    player.current.setMuted(shouldMute);
    setMuted(shouldMute);
  };

  if (!isPlayerSupported) {
    return <Text> 지원되지 않는 브라우저 입니다. </Text>;
  }

  return (
    <div>
      videoPlayer
      <video ref={videoEl} playsInline></video>
      <Button onClick={toggleMute}>Mute</Button>
      <Button onClick={pause}>pause</Button>
    </div>
  );
};

//  ios를 위해 video 태그에 playsInline 반드시 필요함.

export default VideoPlayer;
