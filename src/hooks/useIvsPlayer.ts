import { useEffect, useState } from 'react';

const useIvsPlayer = () => {
  const [IVSPlayer, setIVSPlayer] = useState(window.IVSPlayer);

  useEffect(() => {
    const interval = setInterval(() => {
      // 처음부터 있을 경우
      if (IVSPlayer) return clearInterval(interval);
      // 로딩 완료되면 set
      if (window.IVSPlayer) {
        setIVSPlayer(window.IVSPlayer);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return IVSPlayer;
};

export default useIvsPlayer;
