import { mode } from '@chakra-ui/theme-tools';

export const global = props => ({
  'html, body': {
    fontFamily: 'body',
    color: mode('gray.800', 'whiteAlpha.900')(props),
    bg: mode('white', 'gray.800')(props),
    lineHeight: 'base',
  },
  '*::placeholder': {
    color: mode('gray.400', 'whiteAlpha.400')(props),
  },
  '*, *::before, &::after': {
    borderColor: mode('gray.200', 'whiteAlpha.300')(props),
    wordWrap: 'break-word',
  },
  //   className을 줌으로써 차크라 UI가 아닌 elements에 용
  '.non-ck': {
    h1: {
      fontSize: 'xl',
      mb: '4',
    },
    p: {
      fontSize: 'sm',
      lineHeight: '1.4',
    },
  },
});
