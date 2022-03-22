import { Box, Button, Center, Circle, Divider, Flex, Heading, HStack, Spacer, Spinner, Text, VStack } from '@chakra-ui/react';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import MyLayout from '@src/layout/MyLayout';
import { fetcher } from '@src/state/fetcher';
import { useUser } from '@src/state/swr/useUser';
import { Coin } from '@src/types/share/Coin';
import { User } from '@src/types/share/User';
import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect, useState } from 'react';
import useSWR from 'swr';

const CoinHeader: FC<{ data: User }> = ({ data }) => {
  // console.log(data);
  return (
    <Flex>
      <Box p="2">
        <Heading size="md">{data.name}님의 Coin</Heading>
      </Box>
      <Spacer />
      <Box>
        <HStack>
          <Text>{data.coin}C</Text>
          <Button>충전</Button>
        </HStack>
      </Box>
    </Flex>
  );
};

const CoinHistory: FC<{ data: Coin }> = ({ data }) => {
  // const date = dayjs(time.createdAt);
  // console.log(data);
  return (
    <>
      <Flex>
        <Box p="2">
          <HStack>
            {data.type === 0 ? (
              <Circle size="50px" bg="teal" color="white">
                <Text>충전</Text>
              </Circle>
            ) : (
              <Circle size="50px" bg="tomato" color="white">
                <Text>사용</Text>
              </Circle>
            )}
            <Box>
              <Text>날짜</Text>
              <Text>코인 사용(콘서트 예매)</Text>
            </Box>
          </HStack>
        </Box>
        <Spacer />
        <Box>
          <HStack>
            <Text>
              {' '}
              {data.type === 0 ? '+' : '-'} {data.variation}C
            </Text>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};
export default function CoinPage() {
  const { data: userData } = useUser(); // 현재 로그인 user 정보
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();
  const page = parseInt(router.query.page as string); // query의 page 번호
  // console.log(page);
  useEffect(() => {
    if (page) {
      setPageIndex(page);
    }
  });
  const { data: coinData } = useSWR(`/coin_histories?per_page=3&filter=user_id:${userData.id}&page=${pageIndex}`, fetcher);
  // console.log(coinData);

  return (
    <>
      <Flex justifyContent="center" mx={20}>
        <Box w="100%">
          <VStack>
            <Heading fontWeight="700" size="2xl" my="20px">
              마이페이지/내코인
            </Heading>
            <Box p={5} shadow="md" width="100%">
              <CoinHeader data={userData} />
              <Divider my={6} orientation="horizontal" />
              {!coinData ? (
                <Center>
                  <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                </Center>
              ) : (
                <Box>
                  {coinData.data?.map((coinInfo, index) => (
                    <Box key={index}>
                      <CoinHistory data={coinInfo} />
                    </Box>
                  ))}
                  <Center>
                    <PaginationBtn data={coinData.meta} url={`/my/coin?`} />
                  </Center>
                </Box>
              )}
            </Box>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}

CoinPage.getLayout = function getLayout(page: ReactElement) {
  return <MyLayout>{page}</MyLayout>;
};
