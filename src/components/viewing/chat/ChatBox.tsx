import { Box, Heading, VStack } from '@chakra-ui/react';
import { MAX_MSGS } from '@src/const';
import useSocket from '@src/hooks/useSocket';
import { messagesState } from '@src/state/recoil/viewingState';
import { ChatMessageInterface } from '@src/types/ChatMessageType';
import produce from 'immer';
import { useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowRenderer } from 'react-virtualized';
import { useRecoilState } from 'recoil';
import Message from './Message';

const cache = new CellMeasurerCache({
  defaultHeight: 200,
  minHeight: 30,
  fixedWidth: true,
});

const ChatBox = () => {
  const [messages, setMessages] = useRecoilState(messagesState);
  const messagesEndRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);
  const listRef = useRef<List>(null);
  const socket = useSocket();

  useEffect(() => {
    const getBroadcastedNewMessage = (data: ChatMessageInterface) => {
      setMessages(
        produce(prevMsgs => {
          const len = prevMsgs.length;
          if (len > MAX_MSGS) {
            const deleteLength = Math.round(len - MAX_MSGS + MAX_MSGS * 0.5);
            prevMsgs.splice(0, deleteLength);
            const hList = [];
            const w = cache.getWidth(0, 0);
            for (let i = 0; i < prevMsgs.length; i++) {
              const h = cache.getHeight(i + deleteLength, 0);
              hList.push(h);
            }
            // console.log(a);
            cache.clearAll();
            hList.forEach((h, idx) => {
              cache.set(idx, 0, w, h);
            });
          }
          prevMsgs.push(data);
          return prevMsgs;
        }),
      );
    };
    socket.on('be-broadcast-new-message', getBroadcastedNewMessage);

    return () => {
      cache.clearAll();
      socket.off('be-broadcast-new-message', getBroadcastedNewMessage);
    };
  }, [socket]);

  const rowRenderer: ListRowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} columnIndex={0} rowIndex={index} key={key} parent={parent}>
        <div style={style}>
          <Message key={index} data={messages[index]} />
        </div>
      </CellMeasurer>
    );
  };
  const noRowsRenderer = () => {
    return <Box>チャットがありません。</Box>;
  };

  const handelOnScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    setIsBottom(clientHeight + scrollTop === scrollHeight);
  };

  return (
    <VStack flexGrow="1" backgroundColor="#202020" border="2px" borderColor="#262626" overflow="scroll" width="full" textColor="white">
      <Heading size="sm">チャット</Heading>
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
              overscanRowCount={2}
              noRowsRenderer={noRowsRenderer}
              scrollToIndex={isBottom ? messages.length - 1 : undefined}
            />
          )}
        </AutoSizer>
        <Box float="left" id="end-of-chatbox" style={{ clear: 'both' }} ref={messagesEndRef} />
      </VStack>
    </VStack>
  );
};

export default ChatBox;
