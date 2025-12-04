import { chakra, ChakraProps } from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';

export interface MotionBoxProps
  extends HTMLMotionProps<'div'>,
    Omit<ChakraProps, 'transition' | 'color'> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MotionBox = motion(chakra.div as any);
