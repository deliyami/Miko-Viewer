import { nanoid } from 'nanoid';
import { useState } from 'react';

const abc = nanoid();

export const useABC = () => {
  const [abcd, setAbc] = useState(abc);

  return abcd;
};
