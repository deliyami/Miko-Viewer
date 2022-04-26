import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import AsyncBoundary from '@src/components/common/wrapper/AsyncBoundary';
import { convertDate } from '@src/helper';
import { db, ScoreHistory } from '@src/pwa/db/db';
import { curUserTicketState } from '@src/state/recoil';
import { scoreIdxToStringArray } from '@src/state/shareObject';
import React, { FC, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInterval } from 'usehooks-ts';

const MAX_HISTORY_NUM = 30;

const MoveHistoryPage: FC<{ page: number; setPage: React.Dispatch<React.SetStateAction<number>> }> = ({ page, setPage }) => {
  const onClickBefore = () => {
    setPage(prev => prev + 1);
  };
  const onClickAfter = () => {
    setPage(prev => prev - 1);
  };

  return (
    <Center w="full" gap="4">
      <Button onClick={onClickBefore}>Before</Button>
      <Text>Page: {page} </Text>
      <Button onClick={onClickAfter} isDisabled={page === 0}>
        After
      </Button>
    </Center>
  );
};

const LatestScoreHistoryView: FC<{ page: number }> = ({ page }) => {
  const curUserTicket = useRecoilValue(curUserTicketState);
  // const scoreHistory = useLiveQuery(() => db.scoreHistory.where('concertId').equals(curUserTicket.concertId).limit(MAX_HISTORY_NUM).reverse().sortBy('id'));
  const [scoreHistory, setScoreHistory] = useState<ScoreHistory[]>([]);

  const refreshHistory = useCallback(
    function () {
      db.scoreHistory
        .where('concertId')
        .equals(curUserTicket.concertId)
        .offset(page * MAX_HISTORY_NUM)
        .limit(MAX_HISTORY_NUM)
        .reverse()
        .sortBy('id')
        .then(result => {
          setScoreHistory(result);
        });
    },
    [page],
  );

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  useInterval(refreshHistory, 10000);

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Type</Th>
              <Th isNumeric>Added Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scoreHistory?.map(({ id, addedScore, totalScore, createdAt, type }) => (
              <Tr key={id}>
                <Td>{convertDate(createdAt, 'YMDHMS')}</Td>
                <Td>{scoreIdxToStringArray[type]}</Td>
                <Td isNumeric>{addedScore}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const ViewingScoreHistory = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(0);

  useImperativeHandle(ref, () => ({
    open: () => {
      onOpen();
    },
  }));

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={() => {
        setPage(0);
        onClose();
      }}
    >
      <DrawerOverlay backgroundColor="transparent" />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Score History</DrawerHeader>
        <DrawerBody>
          <AsyncBoundary>
            <LatestScoreHistoryView page={page} />
          </AsyncBoundary>
        </DrawerBody>

        <DrawerFooter>
          <MoveHistoryPage page={page} setPage={setPage} />
          <Button variant="outline" mr={3} onClick={onClose}>
            閉じる
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

ViewingScoreHistory.displayName = 'ViewingScoreHistory';

export default ViewingScoreHistory;
