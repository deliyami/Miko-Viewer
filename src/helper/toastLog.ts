import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

type ToastLogType = (type: 'error' | 'info' | 'warning' | 'success', title: string, desc?: string, err?: Error) => void;
export const toastLog: ToastLogType = (type, title, desc, err) => {
  switch (type) {
    case 'error':
      console.error(title, desc, err);
      break;
    case 'info':
      console.info(title, desc);
      break;
    default:
      console.log(title, desc);
      break;
  }

  toast({
    title,
    position: 'top-left',
    description: desc,
    status: type,
    duration: 2500,
    isClosable: true,
  });
};
