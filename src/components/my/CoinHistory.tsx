import { Box, Circle, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import { convertDate } from '@src/helper';
import { Coin } from '@src/types/share';
import { FC } from 'react';

const history = ['コイン 充電', 'チケット 購入', 'スーパーチャット', 'アイテム 使用', 'グッズ 購入'];

const CoinHistory: FC<{ data: Coin }> = ({ data }) => {
  //   console.log(data);
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
              {data.type === 0 && '+'} {data.variation}C
            </Text>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default CoinHistory;
