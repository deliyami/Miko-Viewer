import { isShowChatInputState } from '@src/state/recoil/viewingState';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const ViewingWindowEventLayout: FC = ({ children }) => {
  const setIsShowChatInputState = useSetRecoilState(isShowChatInputState);

  useEffect(() => {
    const keyupEventHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'c':
        case 'C':
          setIsShowChatInputState(prev => {
            if (!prev === true) {
              document.getElementById('chat-input')?.focus();
            }
            return !prev;
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keyup', keyupEventHandler);

    return () => {
      window.removeEventListener('keyup', keyupEventHandler);
    };
  }, []);

  return <>{children}</>;
};

export default ViewingWindowEventLayout;
