import { Box, Button, Center, Circle, Divider, Flex, Heading, HStack, Spacer, Spinner, Text, VStack } from '@chakra-ui/react';
import PaginationBtn from '@src/components/common/button/PaginationBtn';
import { convertDate } from '@src/helper';
import BasicLayout from '@src/layout/BasicLayout';
import { useUser } from '@src/state/swr';
import { usePageLaravel } from '@src/state/swr/useLaravel';
import { Coin, User } from '@src/types/share';
import { CommonFSW } from '@src/types/share/common';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';

const PER_PAGE = 10;
const history = ['コイン 充電', 'チケット 購入', 'スーパーチャット', 'アイテム 使用', 'グッズ 購入'];

const CoinHeader: FC<{ data: User }> = ({ data }) => {
  // console.log(data);
  return (
    <Flex>
      <Heading pt={3} size="md">
        {data.name}様の Coin
      </Heading>
      <Spacer />
      <Box>
        <HStack>
          <Text fontSize="2xl" fontWeight="550">
            {data.coin}C
          </Text>
          <Button
            bg="yellow.300"
            borderColor="yellow.300"
            _hover={{ bg: 'yellow.400', color: 'white' }}
            _active={{
              bg: 'yellow.400',
              color: 'white',
              transform: 'scale(0.98)',
            }}
          >
            充電
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

const CoinHistory: FC<{ data: Coin }> = ({ data }) => {
  // const date = dayjs(time.createdAt);
  console.log(data);
  const historyDate = convertDate(data.createdAt, 'YMD');
  return (
    <>
      <Flex>
        <Box p="2">
          <HStack>
            {data.type === 0 ? (
              <Circle size="53px" fontWeight="510" bg="teal" color="white">
                <Text>充電</Text>
              </Circle>
            ) : (
              <Circle size="53px" fontWeight="510" bg="tomato" color="white">
                <Text>使用</Text>
              </Circle>
            )}
            <Box>
              <Text fontSize="sm">{historyDate}</Text>
              <Text>{data.type != 0 ? `コイン使用 (${history[data.type]})` : history[data.type]} </Text>
            </Box>
          </HStack>
        </Box>
        <Spacer />
        <Box>
          <HStack>
            <Text fontSize="lg" fontWeight="500">
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
  const router = useRouter();
  const page = parseInt(router.query.page as string); // query의 page 번호

  // console.log(page);
  const query: CommonFSW = {
    page,
    perPage: PER_PAGE,
    filter: [['user_id', userData.id]],
  };
  const { data: coinData } = usePageLaravel('/coin_histories', query);

  if (!coinData) {
    return (
      <Center height="auto" width="full">
        <Text fontSize="7xl">No Data</Text>
      </Center>
    );
  }

  return (
    <>
      <Box>
        <Flex justifyContent="center">
          <Box w="100%" maxW="120vh">
            <VStack>
              <Heading fontWeight="700" size="2xl" my="20px">
                私のコイン
              </Heading>
              <Box p={10} boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 10px" w="100%">
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
                      <PaginationBtn data={coinData.meta} options={{ shallow: true }} />
                    </Center>
                  </Box>
                )}
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

CoinPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
