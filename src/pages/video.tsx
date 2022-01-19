import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Container } from '../components/Container';
import { Main } from '../components/Main';

const DynamicVideoPlayer = dynamic(() => import('../components/VideoPlayer'), {
  loading: () => <div> loading</div>,
  ssr: false,
});

const Video = () => (
  <Container height="100vh">
    <Script
      src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js"
      strategy="beforeInteractive"
    />
    <Main>
      <DynamicVideoPlayer />
    </Main>
  </Container>
);

export default Video;
