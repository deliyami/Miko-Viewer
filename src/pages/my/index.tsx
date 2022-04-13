import { Box, Button, Center, Flex, Heading, HStack, Image, Input, Link, Text } from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import { IMAGE_DOMAIN } from '@src/const';
import BasicLayout from '@src/layout/BasicLayout';
import { User } from '@src/types/share';
import Head from 'next/head';
import { FC, ReactElement } from 'react';

const MyCard: FC<{ data: User }> = ({ data }) => {
  return (
    <Flex width="full" justifyContent="center" p={4}>
      <Box>
        <Heading fontWeight="700" size="2xl" my="5px">
          My Page
        </Heading>
        <HStack spacing={20} p={12} mt={6} boxShadow="lg">
          <Image src={IMAGE_DOMAIN + data.avatar} fallbackSrc="https://via.placeholder.com/300" />
          <Box>
            <Heading as="h5" size="sm" my={2}>
              Name
            </Heading>
            <Input mb={2} value={data.name} isReadOnly />
            <Heading as="h5" size="sm" my={2}>
              Email
            </Heading>
            <Input mb={2} value={data.email} isReadOnly />
            <Heading as="h5" size="sm" my={2}>
              Coin
            </Heading>
            <Input mb={2} value={`${data.coin}`} isReadOnly />
            <Center>
              <Link href={`/my/edit`}>
                <a>
                  <Button>Edit</Button>
                </a>
              </Link>
            </Center>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default function MyPage() {
  return (
    <>
      <Head>
        <title key="title">My Profile | Miko</title>
      </Head>
      <Text>soon</Text>
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BasicLayout>
      <AsyncBoundary>{page}</AsyncBoundary>
    </BasicLayout>
  );
};
