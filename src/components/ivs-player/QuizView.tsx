import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react';
import { useSocket } from '@src/hooks/dynamicHooks';
import { quizMetaDataState } from '@src/state/recoil';
import { memo, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const Timer = memo<{ durationTime: number }>(({ durationTime }) => {
  const [remainTime, setRemainTime] = useState(durationTime);

  useEffect(() => {
    // setInterval(() => {});

    return () => {
      // second
    };
  }, []);

  return <Box h="3%" w="70%" bgColor="white"></Box>;
});

Timer.displayName = 'Timer';

const QuizView = () => {
  const [quizMetaData, setQuizMetaData] = useRecoilState(quizMetaDataState);
  const socket = useSocket();

  const sendQuizChoice = (idx: number) => {
    socket.emit('fe-send-quiz-choice', quizMetaData.createdAt, idx);
    setQuizMetaData(undefined);
  };

  useEffect(() => {
    if (!quizMetaData) return;
    const {
      data: { mainText, choices, durationTime },
    } = quizMetaData;

    const setTimeOutId = setTimeout(() => {
      setQuizMetaData(undefined);
    }, durationTime * 1000);

    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [quizMetaData]);

  if (!quizMetaData) return <></>;

  const {
    data: { mainText, choices, durationTime },
  } = quizMetaData;

  return (
    <Center position="absolute" w="full" h="full" zIndex="200" flexDir="column">
      <Text fontSize="3xl" fontWeight="600" bgColor="#FFFFFF44" px="4">
        {mainText}
      </Text>
      <Box h="5%" />
      <SimpleGrid columns={2} spacingX="10px" spacingY="10px" height="60%" width="50%">
        {choices.map((text, idx) => (
          <Center
            _hover={{ boxShadow: '0 0 0 3px white inset', backgroundColor: '#000000AA' }}
            bg="#00000055"
            color="white"
            borderRadius="base"
            borderColor="whiteAlpha.700"
            border="ActiveBorder"
            key={text + idx}
            onClick={() => sendQuizChoice(idx)}
            fontWeight="bold"
          >
            <Text>{text}</Text>
          </Center>
        ))}
      </SimpleGrid>
      <Timer durationTime={durationTime} />
    </Center>
  );
};

export default QuizView;
