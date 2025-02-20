import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  initial: { backgroundColor: "var(--black)" },
  animate: { backgroundColor: "var(--navy-100)" },
};

export const lampWrapperVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
  hover: { scale: 1.05 },
};

export const lampImageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  tap: { scale: 0.9 },
};

export const textWrapperVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: [1, 1.2, 1],
    y: [0, -30, 0],
  },
  exit: {
    opacity: 0,
    scale: 1,
    y: -100,
  },
};

export const wordVariants = (wordIndex: number) => ({
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -100,
    scale: 0.5,
  },
  transition: {
    duration: 0.8,
    delay: wordIndex * 0.2,
  },
});
export const logoVariants: Variants = {
  initial: { opacity: 0, y: -100, scale: 2 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: [90, 0],
  },
};

export const descriptionVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

export const buttonGroupVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    y: -3,
    boxShadow: "0 10px 20px rgba(100, 173, 172, 0.2)",
  },
  tap: { scale: 0.95 },
};
