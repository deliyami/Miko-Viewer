import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { heading: 'Noto Sans JP, "Hiragino Kaku Gothic Pro",Meiryo,sans-serif', body: 'Noto Sans JP,"Hiragino Kaku Gothic ProN",Meiryo, sans-serif' };

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
  layerStyles: {
    base: {
      bg: 'gray.50',
      border: '2px solid',
      borderColor: 'gray.500',
    },
    selected: {
      bg: 'teal.500',
      color: 'teal.700',
      borderColor: 'orange.500',
    },
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ['56px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['40px', '56px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    h3: {
      fontSize: ['28px', '40px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    h4: {
      fontSize: ['26px', '32px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    h5: {
      fontSize: ['22px', '32px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    h6: {
      fontSize: ['20px', '28px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    st: {
      fontSize: ['20px', '16px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    body: {
      fontSize: ['20px', '16px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
    mm: {
      fontFamily: 'mm10thpixel',
    },
  },
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
