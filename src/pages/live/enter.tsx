import { Flex } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import BasicLayout from '@src/layout/BasicLayout';
import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';

const DynamicEnterPage = dynamic(() => import('../../components/live/DynamicEnter'), {
  loading: () => <div> loading</div>,
  ssr: false,
  suspense: true,
});

const RoomEnterPage = () => {
  return (
    <Flex width="full" justifyContent="center">
      <AsyncBoundary>
        <DynamicEnterPage />
      </AsyncBoundary>
    </Flex>
  );
};

RoomEnterPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default RoomEnterPage;
