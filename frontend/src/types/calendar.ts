import type { CalendarProps } from "react-calendar";

export interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export type CalendarDateChangeHandler = CalendarProps["onChange"];
