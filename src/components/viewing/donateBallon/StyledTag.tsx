import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const popUp = keyframes({
  '0%': { transform: 'translateY(10%)' },
  '100%': { transform: 'translateY(0%)' },
});
export const Box = styled.div({
  width: '300px',
  // animationName: popUp,
  // animationDuration: '1s',
});
