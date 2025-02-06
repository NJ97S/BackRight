import { ReceivedDataType } from "../types/type";

interface Connection {
  start: number;
  end: number;
}

export const ERROR_CONNECTIONS: Record<
  keyof ReceivedDataType["postureStatus"],
  Connection[]
> = {
  neck: [],
  leftShoulder: [{ start: 11, end: 12 }],
  rightShoulder: [{ start: 11, end: 12 }],
  back: [
    { start: 11, end: 12 },
    { start: 11, end: 23 },
    { start: 12, end: 24 },
    { start: 23, end: 24 },
  ],
} as const;

export const ERROR_POINTS: Record<
  keyof ReceivedDataType["postureStatus"],
  number[]
> = {
  neck: [0, 1],
  leftShoulder: [11, 12],
  rightShoulder: [11, 12],
  back: [11, 12, 23, 24],
} as const;
