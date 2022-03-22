import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ClassAttributes, FC, HTMLAttributes } from 'react';

// type

// type args = { [key in string]: string };
type Props = {
  [key in string]: string | any; // children 유효하도록 바꿔야 함
} & ClassAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement>;

export const Div = styled.div({}, (props: any) => {
  const { push } = props;
  return { backgroundColor: push };
});

// keyframes
const fadeIn = keyframes({
  '0%': { transform: 'translateY(3%)', opacity: 0 },

  '100%': { transform: 'translateY(0%)', opacity: 1 },
});

const fadeOut = keyframes({
  '0%': { transform: 'translateY(0%)', opacity: 1 },

  '100%': { transform: 'translateY(-3%)', opacity: 0 },
});

const hideObject = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const makeCircleKeyframes = (calcX: number, calcY: number) => {
  return keyframes({
    '0%': {
      opacity: 0,
      transform: 'translateY(0%)',
    },
    '100%': {
      opacity: 1,
      transform: `translateY(${calcY}%) translateX(${calcX}%)`,
    },
  });
};

// animation tag
export const FadeInBox = styled.div({
  overflow: 'hidden',
  animationName: fadeIn,
  animationDuration: '1s',
  // animation:keyframes({'0%':{transform:'3%'}}) // ?????????????? 이게 되네?
});

export const FadeOutBox = styled.div((props: Props) => {
  const { delay } = props;
  return {
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    msTouchSelect: 'none',
    msTouchAction: 'none',
    MozUserSelect: 'none',
    userSelect: 'none',
    select: 'none',
    width: '900px',
    height: '400px',
    animationName: fadeOut,
    animationDuration: '1s',
    animationDelay: `${delay}ms`,
    animationFillMode: 'forwards',
  };
});

const textCss = {
  position: 'absolute',
  left: '50%',
  width: '625px',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};

export const Header = styled.span(() => {
  const style = { fontSize: '24px', top: '20%' };
  Object.assign(style, textCss);
  return style;
});

export const Content = styled.span(() => {
  const style = { top: '37%', height: '100px' };
  Object.assign(style, textCss);
  return style;
});

export const HideCircle = styled.g({
  animationName: hideObject,
  animationDuration: '1s',
  animationDelay: '1500ms',
  animationFillMode: 'forwards',
});

// const front = 14;
const frontMiddle = 8;
// const back = 18;
const backMiddle = 9;

// export const BackCircle = styled.circle((props: props) => {
//   const { i, cx, cy, r, fill } = props;
//   const index = Number.parseInt(i);
//   const find = index < backMiddle;
//   const calcY = -(Math.random() * 50 + 20);
//   const calcX = (Math.random() * (find ? 6 : 3) + index) * (find ? -1 : 1);
//   // translateX((random($i*3)+$i)*1%)
//   // translateY(-((random(50)+20)*1%))
//   const randomShotBack = makeCircleKeyframes(calcX, calcY);
//   return {
//     opacity: 0,
//     animationName: randomShotBack,
//     animationDelay: `${Math.random() * 500}ms`,
//     animationDuration: "1s",
//     animationFillMode: "forwards",
//     cx,
//     cy,
//     r,
//     fill,
//   };
// });

// export const FrontCircle = styled.circle((props: props) => {
//   const { i, cx, cy, r, fill } = props;
//   const index = Number.parseInt(i);
//   const find = index < frontMiddle;
//   const calcX = -(Math.random() * 60 + 15);
//   const calcY = (Math.random() * (find ? 6 : 3) + index) * (find ? -1 : 1);
//   // translateX((random($i*3)+$i)*1%)
//   // translateY(-((random(50)+20)*1%))
//   const randomShotFront = makeCircleKeyframes(calcX, calcY);
//   return {
//     opacity: 0,
//     animationName: randomShotFront,
//     animationDelay: `${Math.random() * 500}ms`,
//     animationDuration: "1s",
//     animationFillMode: "forwards",
//     cx,
//     cy,
//     r,
//     fill,
//   };
// });

export const Circle = styled.circle((props: Props) => {
  const { d, i, cx, cy, r, fill } = props;
  const index: number = parseFloat(i);
  const direction = d === 'front';
  const find = index < (direction ? frontMiddle : backMiddle);
  const calcY = -(Math.random() * (direction ? 60 : 50) + (direction ? 15 : 20));
  const calcX = (Math.random() * (find ? 6 : 3) * index + index) * (find ? -1 : 1);
  // translateX((random($i*3)+$i)*1%)
  // translateY(-((random(50)+20)*1%))
  const randomShotBack = makeCircleKeyframes(calcX, calcY);
  return {
    opacity: 0,
    animationName: randomShotBack,
    animationDelay: `${Math.random() * 500}ms`,
    animationDuration: '1s',
    animationFillMode: 'forwards',
    cx,
    cy,
    r,
    fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
  };
});

// style tag

export const AvatarBody: FC<Props> = styled.g((props: Props) => {
  const { avatarColor } = props;
  return {
    fill: avatarColor,
  };
});

export const Size = styled.div((props: Props) => {
  const { donateScale, top, left } = props;
  return {
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    zIndex: 1,
    transform: `scale(${donateScale}%)`,
  };
});

export const BallonDot = styled.g((props: Props) => {
  const { color } = props;
  return {
    fill: color,
  };
});

export const Inner = styled.path((props: Props) => {
  const { color } = props;
  return {
    fill: color,
  };
});

export const Outer = styled.path((props: Props) => {
  const { color } = props;
  return {
    fill: color,
  };
});

// <Box className={donate.donateFadeIn} style={{ cursor: "default" }}>
