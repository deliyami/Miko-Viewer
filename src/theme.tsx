import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

//  NOTE  defaultProps 는 colorScheme, variant, and size
//  NOTE  components는 html class가 붙는 경우만 적용됨 ex chakra-text
const theme = extendTheme({
  config,
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  components: {
    Stack: {
      baseStyle: {},
    },
  },
});

export default theme;
