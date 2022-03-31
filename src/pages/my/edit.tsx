import { Text } from '@chakra-ui/react';
import BasicLayout from '@src/layout/BasicLayout';
import { ReactElement } from 'react';

export default function EditPage() {
  return (
    <>
      <Text>Edit</Text>
    </>
  );
}

EditPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
