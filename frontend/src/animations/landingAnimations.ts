import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  initial: { backgroundColor: "#000" },
  animate: { backgroundColor: "#31363F" },
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

export const pulsingBorderVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
  },
};

export const textWrapperVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: [1, 1.2, 1], // 0.8 대신 1로 수정
    y: [0, -30, 0], // 마지막 y값도 0으로 수정
  },
  exit: {
    opacity: 0,
    scale: 1,
    y: -100,
  },
};

export const wordVariants = (
  showOnlyBrandName: boolean,
  isAccent: boolean,
  wordIndex: number // 단어의 순서를 받는 매개변수 추가
) => {
  if (!isAccent) {
    return {
      initial: { opacity: 0, y: -50 },
      animate: showOnlyBrandName ? { opacity: 0 } : { opacity: 1, y: 0 },
      transition: {
        duration: 0.8,
        delay: showOnlyBrandName ? 0 : wordIndex * 0.2, // 나타날 때는 순차적으로
      },
    };
  }

  return {
    initial: { opacity: 0, scale: 0.5 },
    animate: !showOnlyBrandName
      ? {
          opacity: 1,
          scale: [0.5, 1.2, 1],
          y: [50, -20, 0],
          x: 0,
        }
      : {
          opacity: [1, 0],
          y: [0, -100],
          scale: [1, 0.5],
        },
    transition: {
      duration: 1.2,
      delay: !showOnlyBrandName ? wordIndex * 0.2 : 1, // 나타날 때는 순차적으로, 사라질 때는 1초 딜레이
      ease: "easeOut",
    },
  };
};
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
