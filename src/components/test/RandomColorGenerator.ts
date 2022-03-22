export const RandomColorGenerator = (kazu: number) => {
  const colors: string[] = [];
  for (let i = 0; i < kazu; i += 1) {
    colors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  return colors;
};
