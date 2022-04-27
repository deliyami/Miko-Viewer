import { Box, Heading, VStack } from '@chakra-ui/react';
import { MAX_MSGS } from '@src/const';
import { useSocket } from '@src/hooks/dynamicHooks';
import { isOnChatState } from '@src/state/recoil';
import { addedScoreForSeconds } from '@src/state/shareObject';
import { useUser } from '@src/state/swr';
import { ChatMessageInterface } from '@src/types/dto/ChatMessageType';
import produce from 'immer';
// @ts-ignore
import { FC, memo, useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowRenderer } from 'react-virtualized';
import { useRecoilValue } from 'recoil';
import Message from './Message';
import SuperChatList from './SuperChatList';

const cache = new CellMeasurerCache({
  defaultHeight: 200,
  minHeight: 30,
  fixedWidth: true,
});

const ChatBoxRender: FC<{ messages: any[] }> = memo(({ messages }) => {
  const messagesEndRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);
  const listRef = useRef<List>(null);

  const rowRenderer: ListRowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} columnIndex={0} rowIndex={index} key={key} parent={parent}>
        <div style={style}>
          <Message data={messages[index]} />
        </div>
      </CellMeasurer>
    );
  };
  const noRowsRenderer = () => {
    return <Box>チャットがありません。</Box>;
  };

  const handelOnScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    setIsBottom(clientHeight + scrollTop + 30 >= scrollHeight);
  };

  return (
    <VStack width="full" height="full" overflow="hidden" alignItems="start">
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            width={width}
            height={height}
            rowCount={messages.length}
            rowRenderer={rowRenderer}
            rowHeight={cache.rowHeight}
            onScroll={handelOnScroll}
            overscanRowCount={1}
            noRowsRenderer={noRowsRenderer}
            scrollToIndex={isBottom ? messages.length - 1 : undefined}
          />
        )}
      </AutoSizer>
      <Box float="left" id="end-of-chatbox" style={{ clear: 'both' }} ref={messagesEndRef} />
    </VStack>
  );
});

ChatBoxRender.displayName = 'ChatBoxRender';

const MESSAGE_THROTTLE_TIME = 1000 * 1;

const ChatBox = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [superChats, setSuperChats] = useState<ChatMessageInterface[]>([]);
  const messagesBuffer = useRef<ChatMessageInterface[]>([]);
  const updatedTimestamp = useRef(Date.now());
  const setTimeoutId = useRef<NodeJS.Timeout>();
  const isOnChat = useRecoilValue(isOnChatState);
  const { data: userData } = useUser();

  useEffect(() => {
    const getBroadcastedNewMessage = (data: ChatMessageInterface) => {
      const curTimestamp = Date.now();

      if (data.amount && data.sender === userData?.name) {
        addedScoreForSeconds.addScore(Math.round(data.amount / 10), 'superChat');
      }

      if (data.amount) {
        setSuperChats(prev => [data, ...prev]);
      }

      const handleSetMessages = () => {
        setMessages(
          produce(prevMsgs => {
            const len = prevMsgs.length;
            if (len > MAX_MSGS) {
              const deleteLength = Math.round(len - MAX_MSGS + MAX_MSGS * 0.5);
              prevMsgs.splice(0, deleteLength);
              const heightList = [];
              const width = cache.getWidth(0, 0);
              for (let i = 0; i < prevMsgs.length; i++) {
                const h = cache.getHeight(i + deleteLength, 0);
                heightList.push(h);
              }
              cache.clearAll();
              heightList.forEach((h, idx) => {
                cache.set(idx, 0, width, h);
              });
            }
            prevMsgs.push(...messagesBuffer.current.splice(0, messagesBuffer.current.length));
            // prevMsgs = [...prevMsgs, ...];
          }),
        );
      };

      clearTimeout(setTimeoutId.current as NodeJS.Timeout);
      messagesBuffer.current.push(data);

      if (curTimestamp - updatedTimestamp.current < MESSAGE_THROTTLE_TIME) {
        setTimeoutId.current = setTimeout(() => {
          handleSetMessages();
        }, MESSAGE_THROTTLE_TIME - (curTimestamp - updatedTimestamp.current));
      } else {
        updatedTimestamp.current = curTimestamp;
        handleSetMessages();
      }
    };
    if (isOnChat) socket.on('be-broadcast-new-message', getBroadcastedNewMessage);

    return () => {
      clearTimeout(setTimeoutId.current as NodeJS.Timeout);
      cache.clearAll();
      socket.off('be-broadcast-new-message', getBroadcastedNewMessage);
    };
  }, [socket, isOnChat]);

  return (
    <VStack flexGrow={1} backgroundColor="#202020" border="2px" borderColor="#262626" overflow="scroll" width="full" textColor="white">
      <Heading size="sm">チャット</Heading>
      <SuperChatList messages={superChats} setMessages={setSuperChats} />
      <ChatBoxRender messages={messages} />
    </VStack>
  );
};

export default ChatBox;
