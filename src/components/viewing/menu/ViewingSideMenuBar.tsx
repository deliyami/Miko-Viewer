import { Center, StackProps, Text, VStack } from '@chakra-ui/react';
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

      {Children.map(children, (child, _) =>
        cloneElement(
          child as ReactElement,
          // @ts-ignore
          { ...child.props, ref: imperativeRef },
        ),
      )}
    </Center>
  );
};

const ViewingSideMenuBar: FC<StackProps> = ({ children, ...props }) => {
  return (
    <VStack width="5rem" bgColor="#202020" minH="100vh" {...props}>
      <IconBox icon={BiCamera} text="カメラ">
        <MyCamera />
      </IconBox>
      <IconBox icon={IoSettingsOutline} text="設定">
        <ViewingSettingDrawer />
      </IconBox>
      <IconBox icon={FiShoppingBag} text="グッズ">
        <SideShop />
      </IconBox>
      <IconBox icon={BiHelpCircle} text="ヘルプ">
        <ViewingHelp />
      </IconBox>
    </VStack>
  );
};

export default ViewingSideMenuBar;
