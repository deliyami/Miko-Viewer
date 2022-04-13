import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react';
import { quizResultMetaDataState } from '@src/state/recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const QuizResultView = () => {
  const [quizResultMetaData, setQuizResultMetaData] = useRecoilState(quizResultMetaDataState);

  useEffect(() => {
    if (!quizResultMetaData) return;
    const {
      data: { durationTime },
    } = quizResultMetaData;

    const setTimeOutId = setTimeout(() => {
      setQuizResultMetaData(undefined);
    }, durationTime * 1000);

    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [quizResultMetaData]);

  if (!quizResultMetaData) return <></>;

  const {
    data: { choices, title },
  } = quizResultMetaData;

  return (
    <Center position="absolute" w="full" h="full" zIndex="200" flexDir="column">
      <Text fontSize="3xl" fontWeight="600" bgColor="#FFFFFF44" px="4">
        결과: {title}
      </Text>
      <Box h="5%" />
      <SimpleGrid columns={2} spacingX="10px" spacingY="10px" height="60%" width="50%">
        {choices.map(({ id, value }, idx) => (
          <Center
            _hover={{ boxShadow: '0 0 0 3px white inset', backgroundColor: '#000000AA' }}
            bg="#00000055"
            color="white"
            borderRadius="base"
            borderColor="whiteAlpha.700"
            border="ActiveBorder"
            key={id + idx}
            fontWeight="bold"
          >
            <Text>{id}</Text>
            <Text>{value}</Text>
          </Center>
        ))}
      </SimpleGrid>
      {/* <Timer durationTime={durationTime} /> */}
    </Center>
  );
};

export default QuizResultView;
