import { Container } from '@src/components/Container';
import ViewingLayout from '@src/layout/ViewingLayout';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { ReactElement } from 'react';

const DynamicViewingPage = dynamic(
  () => import('../../../components/viewing/ViewingCSRPage'),
  {
    loading: () => <div> loading</div>,
    ssr: false,
  }
);

const ViewingPage = () => {
  return (
    <Container height="auto" width="full">
      <Script
        src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js"
        strategy="beforeInteractive"
      />
      <DynamicViewingPage />
    </Container>
  );
};

ViewingPage.getLayout = function getLayout(page: ReactElement) {
  return <ViewingLayout>{page}</ViewingLayout>;
};

export default ViewingPage;
