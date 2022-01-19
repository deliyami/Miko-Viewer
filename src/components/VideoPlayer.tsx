import { useEffect, useRef } from 'react';

const PLAYBACK_URL =
  'https://de853ef2a345.us-east-1.playback.live-video.net/api/video/v1/us-east-1.121323684128.channel.Cj5ynk97sEJv.m3u8';

const VideoPlayer = (props) => {
  const player = useRef(null);
  const videoEl = useRef(null);
  const { IVSPlayer } = window;

  if (IVSPlayer.isPlayerSupported) {
    console.log('yes');
  } else {
    console.log('no');
  }

  useEffect(() => {
    player.current = IVSPlayer.create();
    player.current.load(PLAYBACK_URL);
    player.current.attachHTMLVideoElement(videoEl.current);
    player.current.play();
    return () => {};
  }, []);

  return (
    <div>
      videoPlayer
      <video ref={videoEl} playsInline></video>
    </div>
  );
};

export default VideoPlayer;
