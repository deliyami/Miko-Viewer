export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

export const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export const lineHeights = {
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: '2',
  '3': '.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
};

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

export const fonts = {
  heading: 'Noto Sans JP, "Hiragino Kaku Gothic Pro",Meiryo,sans-serif',
  body: 'Noto Sans JP,"Hiragino Kaku Gothic ProN",Meiryo, sans-serif',
  mono: 'Menlo, monospace',
};

// Font family, weight, and size
// Line height
// Letter spacing
// Text decoration (strikethrough and underline)
// Text transform (uppercase, lowercase, and capitalization)
//  <Box textStyle='h1'>This is a box</Box>
export const textStyles = {
  h1: {
    fontSize: ['56px', '72px'], //  responsive styles
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
};
