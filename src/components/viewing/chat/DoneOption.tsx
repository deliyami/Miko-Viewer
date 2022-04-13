import { Button, Center } from '@chakra-ui/react';
import { IconType } from '@react-icons/all-files';
import { RiGiftFill } from '@react-icons/all-files/ri/RiGiftFill';
import { ViewingDone } from '@src/components/viewing/chat/ViewingDone';
import { useColorStore } from '@src/hooks';
import { Children, cloneElement, FC, memo, ReactElement, useRef } from 'react';

const IconBox: FC<{ icon: IconType; children: ReactElement }> = ({ children, icon }) => {
  const imperativeRef = useRef(null);
  const primary = useColorStore('primary');

  return (
    <Center
      onClick={() => {
        imperativeRef.current.open();
      }}
      cursor="pointer"
      _hover={{ color: primary }}
    >
      {Children.map(children, (child, _) =>
        cloneElement(
          child as ReactElement,
          // @ts-ignore
          { ...child.props, ref: imperativeRef },
        ),
      )}

      <Button>{icon({})}</Button>
    </Center>
  );
};

export const DoneOption: FC = memo(() => {
  return (
    <IconBox icon={RiGiftFill}>
      <ViewingDone />
    </IconBox>
  );
});

DoneOption.displayName = 'TempDoneOption';
