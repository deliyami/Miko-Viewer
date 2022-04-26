import { addedScoreForSeconds } from '@src/state/shareObject/shareAddedScoreForSeconds';
import { useEffect } from 'react';

export const TempAddScoreLogic = () => {
  useEffect(() => {
    const setIntervalId = setInterval(() => {
      addedScoreForSeconds.addScore(Math.round(Math.random() * 10), 'test');
    }, 1000);
    return () => {
      clearInterval(setIntervalId);
    };
  }, []);

  return <></>;
};
