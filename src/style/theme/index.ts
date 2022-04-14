import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { colors } from './colorTheme';
import { components } from './componentTheme/componentTheme';
import { global } from './globalTheme';
import { layerStyles } from './layerTheme';
import { breakpoints, sizes, spacing } from './responsiveTheme';
import { fonts, fontSizes, fontWeights, letterSpacings, lineHeights, textStyles } from './textTheme';
import { zIndices } from './zIndexTheme';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'ck', // "var(--ck-colors-gray-100)" or sx props
};

// 1 -> 0.25rem -> 4px  ( 1)

//  NOTE  defaultProps 는 colorScheme, variant, and size
//  NOTE  components는 html class가 붙는 경우만 적용됨 ex chakra-text
// theme tokens 기반으로 작동.
const theme = extendTheme(
  {
    config,
    styles: {
      global,
    },
    layerStyles,
    // -- Text --
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    fonts,
    textStyles,
    // -- Color --
    colors,
    // -- Responsive --
    breakpoints,
    spacing,
    sizes,
    // --
    zIndices,
    components,
  },
  // withDefaultColorScheme({
  //   colorScheme: 'red',
  //   components: ['Button', 'Badge'],
  // }),
  // withDefaultSize({
  //   size: 'lg',
  //   components: ['Button', 'Badge'],
  // }),
  // withDefaultVariant({
  //   variant: 'outline',
  //   components: ['Input', 'NumberInput', 'PinInput'],
  // }),
  // withDefaultProps({
  //   defaultProps: {
  //     variant: 'outline',
  //     size: 'lg',
  //   },
  //   components: ['Input', 'NumberInput', 'PinInput'],
  // }),
);

export default theme;
