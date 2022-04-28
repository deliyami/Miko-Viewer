import { Center } from '@chakra-ui/react';
import { doneItem } from '@src/const';
import { useSocket } from '@src/hooks/dynamicHooks';
import { addedScoreForSeconds } from '@src/state/shareObject';
import { useUser } from '@src/state/swr';
import { DoneSendInterface } from '@src/types/share';
import { useEffect, useState } from 'react';
import DoneAnimationBox from './done/DoneAnimationBox';
import { DoneIcon } from './done/DoneIcon';

interface DoneRenderData {
  x: number;
  y: number;
  id: number;
  data: DoneSendInterface;
}

const DONE_HOLD_TIME = 2000;

const [MAX_X, MAX_Y] = [window.innerWidth, window.innerHeight];

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCoordinate() {
  const { top, left, right, bottom } = document.getElementById('player-wrapper')!.getBoundingClientRect();
  const x = randomIntFromInterval(0, MAX_X - 200);
  let y: number;
  if (x < left || x > right) {
    y = randomIntFromInterval(0, bottom);
  } else {
    y = randomIntFromInterval(0, top);
  }
  return [x, y];
}

export default function DoneRenderBox(): JSX.Element {
  const [doneList, setDoneList] = useState<DoneRenderData[]>([]);
  const socket = useSocket();
  const { data: userData } = useUser();

  const getBroadcastedNewDone = (data: DoneSendInterface) => {
    if (data.sender === userData!.name) {
      const { price } = doneItem[data.itemId];
      addedScoreForSeconds.addScore(Math.round(price / 10), 'done');
    }

    setDoneList(prev => {
      const [x, y] = getCoordinate();
      const newDone = {
        id: Date.now(),
        x,
        y,
        data,
      };
      return [...prev, newDone];
    });
    setTimeout(() => {
      setDoneList(prev => [...prev.slice(1)]);
    }, DONE_HOLD_TIME);
  };

  useEffect(() => {
    socket.on('be-broadcast-done-item', getBroadcastedNewDone);
    return () => {
      socket.off('be-broadcast-done-item', getBroadcastedNewDone);
    };
  }, [socket]);

  return (
    <Center h="full" w="full" zIndex="2" pointerEvents="none" position="absolute" backgroundColor="transparent">
      {doneList.map(({ data, id, x, y }) => (
        <Center key={id} left={x} top={y} bgColor="transparent" position="absolute">
          <DoneAnimationBox>
            <DoneIcon width={200} itemId={data.itemId}></DoneIcon>
          </DoneAnimationBox>
        </Center>
      ))}
    </Center>
  );
}
