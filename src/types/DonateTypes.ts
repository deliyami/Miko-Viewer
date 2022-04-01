type DonateIconName =
  | 'GreenHeart'
  | 'AvatarIcon'
  | 'CircularAudio'
  | 'Confetti'
  | 'Controller'
  | 'Crown'
  | 'Battery'
  | 'FourStar'
  | 'Gift'
  | 'HelloWorld'
  | 'Heart'
  | 'UFO'
  | 'Melting'
  | 'Mental'
  | 'Night'
  | 'Chart'
  | 'StarBurst'
  | 'MoneyRain';

type DonateProps = {
  path: number;
  loop?: boolean;
  autoplay?: boolean;
  width?: number;
};
export type { DonateIconName, DonateProps };
