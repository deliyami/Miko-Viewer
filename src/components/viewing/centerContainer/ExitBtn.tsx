import { Center } from '@chakra-ui/react';
import { ImExit } from '@react-icons/all-files/im/ImExit';
import { useRouter } from 'next/router';

export default function ExitBtn(): JSX.Element {
  const router = useRouter();

  const onExitClickHandler = () => {
    router.push('/my/lists/ticket');
  };

  return (
    <Center
      h="14"
      w="14"
      zIndex="1"
      left="1"
      bottom="2"
      position="absolute"
      border="1px"
      borderColor="white"
      borderRadius="md"
      _hover={{ color: '#39c5bb', borderColor: '#39c5bb' }}
      cursor="pointer"
      onClick={onExitClickHandler}
    >
      <ImExit size="1.6rem" />
    </Center>
  );
}
