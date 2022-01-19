import { HStack, Text, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Container } from '../components/Container';

const DynamicVideoPlayer = dynamic(
  () => import('../components/ivs-player/VideoPlayer'),
  {
    loading: () => <div> loading</div>,
    ssr: false,
  }
);

const Video = () => (
  <Container height="auto" width="full">
    <Script
      src="https://player.live-video.net/1.6.1/amazon-ivs-player.min.js"
      strategy="beforeInteractive"
    />
    <HStack width="full">
      <DynamicVideoPlayer />
      <VStack backgroundColor="red.100" height="80vh" width="20vw">
        <Text>채팅</Text>
      </VStack>
    </HStack>
    <HStack backgroundColor="blue.200" width="80vw" height="20vh">
      <Text>아바타</Text>
    </HStack>
  </Container>
);

export default Video;
