import { Center, Heading, HStack, Text } from '@chakra-ui/react';
import { generateIvsM3U8, generateIvsThumbUrl } from '@src/helper/dynamic/ivsHelper';
import { useIvsPlayer } from '@src/hooks/dynamicHooks';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { Recording } from '@src/types/share/Recording';
// import '@videojs/themes/dist/city/index.css';
import type { VideoJSEvents, VideoJSIVSTech, VideoJSQualityPlugin } from 'amazon-ivs-player';
import { useRouter } from 'next/router';
import { Dispatch, FC, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

type IvsVideoJS = videojs.Player & VideoJSIVSTech & VideoJSQualityPlugin;

const RecordingItem: FC<{ recording: Recording; setM3u8: Dispatch<SetStateAction<string | undefined>>; idx: number }> = ({ recording, setM3u8, idx }) => {
  const { prefix } = recording;
  const recordSelectHandler: MouseEventHandler<HTMLDivElement> = () => {
    setM3u8(prefix);
  };

  const imgUrl = generateIvsThumbUrl(prefix, 0);

  return (
    <Center
      onClick={recordSelectHandler}
      height="100px"
      width="200px"
      bgColor="blackAlpha.800"
      backgroundImage={`url(${imgUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      filter="grayscale(80%)"
      _hover={{ boxShadow: '0 0 0 2px white;' }}
    >
      <Heading fontSize="5xl" fontWeight="extrabold" color="white">
        {idx}
      </Heading>
    </Center>
  );
};

const RecordingSelector: FC<{ setM3u8: Dispatch<SetStateAction<string | undefined>> }> = ({ setM3u8 }) => {
  const router = useRouter();
  const { data } = usePageLaravel('/recordings', {
    filter: [
      ['ticket_id', router.query.ticket_id as string],
      ['avl_archive', 1], // 스트리머가 허용한 영상만 볼 수 있음.
    ],
  });

  if (!data || data.data.length === 0) return <Text> No Recordings </Text>;

  return (
    <HStack overflowX="scroll" width="full" backgroundColor="blackAlpha.800" padding="2">
      {data.data.map((recording, idx) => {
        return <RecordingItem key={recording.id} recording={recording} setM3u8={setM3u8} idx={idx} />;
      })}
    </HStack>
  );
};

const VideoJS: FC<{ options: videojs.PlayerOptions; onReady: (player: IvsVideoJS) => void; m3u8?: string }> = ({ onReady, options, m3u8 }) => {
  const IVSPlayer = useIvsPlayer();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<IvsVideoJS>();

  useEffect(() => {
    if (!IVSPlayer) return;
    if (!videoRef.current) return;

    // @ts-ignore
    window.registerIVSTech(videojs);
    window.registerIVSQualityPlugin(videojs);

    const player = videojs(
      'videojs-player', // NOTE id 이름에 자동 추가되는 문자열
      options,
      () => {
        console.warn('Player is ready to use');
        if (m3u8) player.src(generateIvsM3U8(m3u8));
      },
    ) as IvsVideoJS;

    player.enableIVSQualityPlugin();

    const events: VideoJSEvents = player.getIVSEvents();
    const ivsPlayer = player.getIVSPlayer();
    ivsPlayer.addEventListener(events.PlayerState.PLAYING, () => {
      console.log('IVS Player is playing');
    });

    playerRef.current = player;

    onReady(player);
  }, []);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose(); // 인스턴스 삭제
        // playerRef.current = null;
      }
    };
  }, [playerRef]);

  const test = () => {
    if (playerRef.current) {
      playerRef.current.duration(); // 지속시간 live는 Infinity
      playerRef.current.currentTime(); //
      // .play()
      // .src()
    }
  };

  useEffect(() => {
    if (m3u8 && playerRef.current) playerRef.current.src(generateIvsM3U8(m3u8));
  }, [m3u8]);

  return <video ref={videoRef} id="videojs-player" className="video-js vjs-big-play-centered " />;
};

const ArchiveVideoPlayer = () => {
  const playerRef = useRef<IvsVideoJS>();
  const [m3u8, setM3u8] = useState<string>();

  const videoJsOptions: videojs.PlayerOptions = {
    techOrder: ['AmazonIVS'],
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    //   sources: [
    //   ], // ivs의 경우 지원안됨 . src() 함수만 사용가능
  };

  const handlePlayerReady = (player: IvsVideoJS) => {
    playerRef.current = player;

    player.on('waiting', () => {
      console.info('player is waiting');
    });

    player.on('dispose', () => {
      console.info('player will dispose');
    });
  };

  return (
    <Center w="full" maxW="container.xl" margin="15px" flexDirection="column">
      <RecordingSelector setM3u8={setM3u8} />
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} m3u8={m3u8} />
    </Center>
  );
};

export default ArchiveVideoPlayer;
