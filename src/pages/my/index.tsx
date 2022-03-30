import { Box, Button, Center, Flex, Heading, HStack, Image, Input } from '@chakra-ui/react';
import { S3_URL } from '@src/const';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr/useUser';
import { User } from '@src/types/share/User';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

const MyCard: FC<{ data: User }> = ({ data }) => {
  // console.log(data);
  return (
    <Flex width="full" justifyContent="center" p={4}>
      <Box>
        <Heading fontWeight="700" size="2xl" my="5px">
          My Page
        </Heading>
        <HStack spacing={20} p={12} mt={6} boxShadow="lg">
          <Image src={S3_URL + data.avatar} fallbackSrc="https://via.placeholder.com/300" />
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
  const { data: userData } = useUser();
  // console.log(userData);
  return (
    <Box>
      <MyCard data={userData} />
    </Box>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
