export type FaceDirection<K extends keyof any, T> = {
  [Direction in K]: T;
};
