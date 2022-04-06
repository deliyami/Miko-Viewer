import { ComponentSingleStyleConfig } from '@chakra-ui/react';

export const ckButton: ComponentSingleStyleConfig = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: 'bold', // Normally, it is "semibold"
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // 3. We can add a new visual variant
  variants: {
    'with-shadow': {
      bg: 'red.400',
      boxShadow: '0 0 2px 2px #efdfde',
    },
    // 4. We can override existing variants
    solid: props => ({
      bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
    }),
  },
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
};
