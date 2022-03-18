import { Center, Text, VStack } from '@chakra-ui/react';
import { Children, cloneElement, FC, ReactElement, useRef } from 'react';
import { BiCamera } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import MyCamera from './MyCamera';
import ViewingDrawer from './ViewingDrawer';

const IconBox: FC<{ text: string; icon: IconType }> = ({ children, text, icon }) => {
  const imperativeRef = useRef(null);

  return (
    <Center
      flexDir="column"
      color="white"
      onClick={() => {
        imperativeRef.current.open();
      }}
      cursor="pointer"
      _hover={{ color: '#39c5bb' }}
    >
      {icon({ size: '100%', style: { padding: '0.5rem' } })}
      <Text>{text} </Text>

      {Children.map(children, (child, index) =>
        cloneElement(
          child as ReactElement,
          // @ts-ignore
          { ...child.props, ref: imperativeRef },
        ),
      )}
    </Center>
  );
};

const ViewingSideMenuBar: FC = () => {
  return (
    <VStack width="5rem" bgColor="#202020" minH="100vh">
      <IconBox icon={BiCamera} text="카메라">
        <MyCamera />
      </IconBox>
      <IconBox icon={IoSettingsOutline} text="설정">
        <ViewingDrawer />
      </IconBox>
    </VStack>
  );
};

export default ViewingSideMenuBar;
