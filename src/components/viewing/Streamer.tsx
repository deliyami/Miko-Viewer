import React, { useEffect, useState } from 'react';

interface videoStreamInterface {
  stream: MediaStream;
  fullName: string;
  muted: boolean;
  controls: boolean;
}

const Streamer: React.FC<videoStreamInterface> = ({ stream, muted, fullName, controls = false }: videoStreamInterface) => {
  const [videoMuted, setVideoMuted] = useState<Boolean>(false);
  const [audioMuted, setAudioMuted] = useState<Boolean>(false);
  const [showMuteIcon, setShowMuteIcon] = useState<Boolean>(false);
  const videoEl = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    const video = videoEl.current;
    let showVideo = true;
    let showAudio = true;

    if (video) {
      if (controls) {
        if (videoMuted) showVideo = false;
        if (audioMuted) showAudio = false;

        stream.getVideoTracks()[0].enabled = showVideo;
        if (stream.getAudioTracks()[0]) {
          stream.getAudioTracks()[0].enabled = showAudio;
        }
      }

      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        if (video) {
          video.play();
        }
      };
    }
  }, [videoMuted, audioMuted]);

  const audioHandler = () => {
    setAudioMuted(!audioMuted);
    setShowMuteIcon(!showMuteIcon);
  };

  const videoHandler = () => {
    setVideoMuted(!videoMuted);
  };

  return (
    <div className="stream-item">
      <h2>Im {fullName}</h2>
      <video ref={videoEl} muted={muted} autoPlay={true} />
      {controls && (
        <div className="stream-buttons">
          {stream.getAudioTracks()[0] && (
            <button type="button" onClick={audioHandler}>
              {/* {showMuteIcon ? <MicOffRoundedIcon /> : <MicRoundedIcon />} */}
            </button>
          )}

          <button type="button" onClick={videoHandler}>
            {/* {videoMuted ? <VideocamOffRoundedIcon /> : <VideocamRoundedIcon />} */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Streamer;
