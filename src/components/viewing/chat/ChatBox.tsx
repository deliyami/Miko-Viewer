import { Box, Heading, VStack } from '@chakra-ui/react';
import { messagesState } from '@src/state/recoil/viewingState';
import { useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowRenderer } from 'react-virtualized';
import { useRecoilValue } from 'recoil';
import Message from './Message';

const cache = new CellMeasurerCache({
  defaultHeight: 200,
  minHeight: 30,
  fixedWidth: true,
});

const ChatBox = () => {
  const messages = useRecoilValue(messagesState);
  const messagesEndRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);
  const listRef = useRef<List>(null);

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
              overscanRowCount={10}
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
