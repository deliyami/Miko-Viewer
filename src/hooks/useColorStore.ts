import { useColorModeValue } from '@chakra-ui/react';

// 첫번째 화이트, 두번째 블랙.
const COLOR = {
  surface: ['#FFFFFF', '#2D3748'], // white , gray.700
  background: ['gray.50', '#121212'], // gray.50 , material black
  // surfaceShadow: ['#FFFFFF', '#2D3748'], // gray.50 , material black
  primary: ['#39c7bb', '#A0C1B8'],
  weekPrimary: ['#39c7bb33', '#A0C1B833'],
  red: ['#b00020', '#cf6679'],
  yellow: ['#FFF323', '#FFBD69'],
  weekGray: ['gray.700', 'gray.300'],
  textHigh: ['#000000', '#FFFFFF'],
  textMedium: ['#000000DD', '#FFFFFFDD'],
  textDisabled: ['#00000055', '#FFFFFF55'],
  doneCharBody: ['#47C8C0', '#B2F5EA'],
  doneOuterBox: ['#55557b', '#47C8C0'],
  doneInnerBox: ['#E1E1E1', '#E2E8F0'],
};

export const useColorStore = (colorKey: keyof typeof COLOR) => {
  const [light, black] = COLOR[colorKey];
  const color = useColorModeValue(light, black);
  return color;
};
