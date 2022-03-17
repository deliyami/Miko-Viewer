import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ClassAttributes, HTMLAttributes } from "react";

// type

// type args = { [key in string]: string };
type props = {
  [key in string]: string;
} & ClassAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement>;

// test
export const Div = styled.div({}, (props: props) => {
  const { push } = props;
  return { backgroundColor: push };
});
export const SecDiv = styled.div(props => {
  return { backgroundColor: "#dddddd" };
});

// keyframes
const fadeIn = keyframes({
  "0%": { transform: "translateY(3%)", opacity: 0 },

  "100%": { transform: "translateY(0%)", opacity: 1 },
});

const fadeOut = keyframes({
  "0%": { transform: "translateY(0%)", opacity: 1 },

  "100%": { transform: "translateY(-3%)", opacity: 0 },
});

const hideObject = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

// animation tag
export const FadeInBox = styled.div({
  position: "absolute",
  overflow: "hidden",
  zIndex: 1,
  animationName: fadeIn,
  animationDuration: "1s",
  // animation:keyframes({'0%':{transform:'3%'}}) // ?????????????? 이게 되네?
});

export const FadeOutBox = styled.div({
  WebkitTouchCallout: "none",
  WebkitUserSelect: "none",
  msTouchSelect: "none",
  msTouchAction: "none",
  MozUserSelect: "none",
  userSelect: "none",
  select: "none",
  width: "900px",
  height: "400px",
  animationName: fadeOut,
  animationDuration: "1s",
  animationDelay: "10000ms",
  animationFillMode: "forwards",
});

const textCss = {
  position: "absolute",
  left: "50%",
  width: "625px",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};

export const Header = styled.span(() => {
  const style = { fontSize: "24px", top: "20%" };
  Object.assign(style, textCss);
  return style;
});

export const Content = styled.span(() => {
  const style = { top: "37%", height: "100px" };
  Object.assign(style, textCss);
  return style;
});

export const HideCircle = styled.g({
  animationName: hideObject,
  animationDuration: "1s",
  animationDelay: "1500ms",
  animationFillMode: "forwards",
});

const front = 14;
const frontMiddle = 8;
const back = 18;
const backMiddle = 9;

const makeCircleKeyframes = (calcX: number, calcY: number) => {
  return keyframes({
    "0%": {
      opacity: 0,
      transform: "translateY(0%)",
    },
    "100%": {
      opacity: 1,
      transform: `translateY(${calcY}%) translateX(${calcX}%)`,
    },
  });
};

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

export const Circle = styled.circle((props: props) => {
  const { d, i, cx, cy, r, fill } = props;
  const index = Number.parseInt(i);
  const direction = d === "front";
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
    animationDuration: "1s",
    animationFillMode: "forwards",
    cx,
    cy,
    r,
    fill,
  };
});

// color tag

// <Box className={donate.donateFadeIn} style={{ cursor: "default" }}>
