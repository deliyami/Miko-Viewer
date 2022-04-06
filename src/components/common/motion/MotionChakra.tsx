import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const MotionBox = motion<Omit<BoxProps, 'transition' | ''>>(Box);
