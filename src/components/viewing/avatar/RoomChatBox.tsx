import { Center, Text } from '@chakra-ui/react';
import { FC } from 'react';

const RoomChatBox: FC<{ peerId: string }> = ({ peerId }) => {
  return (
    <Center position="absolute" w="50vw" transform="translate(-50%, 0)" left="50%">
      <Text
        px="2"
        display="inline-block"
        borderRadius="xl"
        top="10px"
        fontWeight="bold"
        color="black"
        fontSize="xl"
        id={peerId + 'chat'}
        bgColor="#FFFFFFCC"
        // _after={{
        //   content: '""',
        //   position: 'absolute',
        //   //   margin: '-1.5em 1.87em',
        //   width: 0,
        //   height: 0,
        //   borderTop: '10px solid transparent',
        //   borderBottom: '10px solid transparent',
        //   borderLeft: '10px solid rgba(255, 255, 255, 0.2)',
        // }}
      ></Text>
    </Center>
  );
};

export default RoomChatBox;
