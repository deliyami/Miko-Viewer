import { Container } from '@src/components/Container';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const DynamicViewingPage = dynamic(
  () => import('../../../components/viewing/ViewingCSRPage'),
  {
    loading: () => <div> loading</div>,
    ssr: false,
  }
);

const ViewingPage = () => (
  <Container height="auto" width="full">
    <Script
      src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js"
      strategy="beforeInteractive"
    />
    <DynamicViewingPage />
  </Container>
);

export default ViewingPage;
