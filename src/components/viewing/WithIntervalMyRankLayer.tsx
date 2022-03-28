import useSocket from '@src/hooks/useSocket';
import { curUserTicketState } from '@src/state/recoil/concertState';
import { myRankState } from '@src/state/recoil/myRankState';
import { useUser } from '@src/state/swr/useUser';
import produce from 'immer';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const WithIntervalMyRankLayer: FC = ({ children }) => {
  const { data: user } = useUser();
  const socket = useSocket();
  // const userId = "0";
  const userTicket = useRecoilValue(curUserTicketState);
  const { ticketId } = userTicket;

  const setMyRankState = useSetRecoilState(myRankState);

  useEffect(() => {
    const updateMyRankInterval = setInterval(() => {
      setMyRankState(
        produce(draft => {
          socket.emit('fe-update-myRank', ticketId, user.uuid);
          console.log('df', draft[user.uuid]);
        }),
      );
    }, 5000);

    return () => {
      clearInterval(updateMyRankInterval);
    };
    // NOTE 또 이거 까먹어서 고생함.
  }, [user.uuid, setMyRankState]);

  return <>{children}</>;
};
