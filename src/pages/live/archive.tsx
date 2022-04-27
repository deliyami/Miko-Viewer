import { Box, Text } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import BasicLayout from '@src/layout/BasicLayout';
import dynamic from 'next/dynamic';
import { ReactElement, useEffect } from 'react';

const DynamicArchivePageCSR = dynamic(() => import('@src/components/pageParts/live/archive/ArchivePageCSR'), {
  loading: () => <div> loading</div>,
  ssr: false,
  suspense: true,
});

// TODO 보안
const ArchivePage = () => {
  useEffect(() => {
    window.HELP_IMPROVE_VIDEOJS = false; // video.js GA off
  }, []);

  return (
    <Box>
      <Text>アーカイブ</Text>
      <AsyncBoundary>
        <DynamicArchivePageCSR />
      </AsyncBoundary>
    </Box>
  );
};

ArchivePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
export default ArchivePage;
