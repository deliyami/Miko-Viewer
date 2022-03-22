import { Center, Text, VStack } from '@chakra-ui/react';
import DonateModal from '@src/components/test/DonateModal';
import { Children, cloneElement, FC, ReactElement, ReactNode, useRef } from 'react';
import { BiMoney } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';

type Props = {
  DonateFunction?: Function;
  children?: ReactNode;
};

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

const DonateButton: FC = (props: Props) => {
  const { DonateFunction } = props;
  return (
    <VStack width="5rem" bgColor="#202020" minH="100vh">
      <IconBox icon={BiMoney} text="donate">
        <DonateModal DonateFunction={DonateFunction} />
      </IconBox>
    </VStack>
  );
};

export default DonateButton;
