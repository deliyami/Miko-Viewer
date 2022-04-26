import { Center, StackProps, Text, useEventListener, VStack } from '@chakra-ui/react';
import { BiCamera } from '@react-icons/all-files/bi/BiCamera';
import { BiHelpCircle } from '@react-icons/all-files/bi/BiHelpCircle';
import { FiShoppingBag } from '@react-icons/all-files/fi/FiShoppingBag';
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline';
import { IconType } from '@react-icons/all-files/lib';
import { Children, cloneElement, FC, ReactElement, useRef } from 'react';
import MyCamera from './MyCamera';
import SideShop from './sideshop/SideShop';
import ViewingSettingDrawer from './ViewingDrawer';
import ViewingHelp from './ViewingHelp';
import ViewingScoreHistory from './ViewingScoreHistory';

const IconBox: FC<{ text: string; icon: IconType; children: ReactElement; shortKey: string }> = ({ children, text, icon, shortKey }) => {
  const imperativeRef = useRef<{ open: () => void }>(null);

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === shortKey) {
      imperativeRef.current?.open();
    }
  };

  useEventListener('keyup', onKeyUp);

  return (
    <Center
      flexDir="column"
      color="white"
      onClick={() => {
        imperativeRef.current?.open();
      }}
      cursor="pointer"
      _hover={{ color: '#39c5bb' }}
    >
      {icon({ size: '100%', style: { padding: '0.5rem' } })}
      <Text>{text} </Text>

      {Children.map(children, (child, _) => cloneElement(child, { ...child.props, ref: imperativeRef }))}
    </Center>
  );
};

const ViewingSideMenuBar: FC<StackProps> = ({ ...props }) => {
  return (
    <VStack width="5rem" bgColor="#202020" minH="100vh" {...props}>
      <IconBox icon={BiCamera} text="カメラ" shortKey="v">
        <MyCamera />
      </IconBox>
      <IconBox icon={IoSettingsOutline} text="設定" shortKey="s">
        <ViewingSettingDrawer />
      </IconBox>
      <IconBox icon={FiShoppingBag} text="グッズ" shortKey="g">
        <SideShop />
      </IconBox>
      <IconBox icon={BiHelpCircle} text="ヘルプ" shortKey="h">
        <ViewingHelp />
      </IconBox>
      <IconBox icon={BiHelpCircle} text="スコア" shortKey="p">
        <ViewingScoreHistory />
      </IconBox>
    </VStack>
  );
};

export default ViewingSideMenuBar;
