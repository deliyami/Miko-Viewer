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
  path: DonateIconName;
  loop?: boolean;
  autoplay?: boolean;
  width?: string;
};
export type { DonateIconName, DonateProps };
