import { ReceivedDataType } from "../types/type";

interface Connection {
  start: number;
  end: number;
}

export const ERROR_CONNECTIONS: Record<
  keyof ReceivedDataType["problemPart"],
  Connection[]
> = {
  neck: [
    { start: 9, end: 10 },
    { start: 11, end: 12 },
  ],
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
  keyof ReceivedDataType["problemPart"],
  number[]
> = Object.fromEntries(
  Object.entries(ERROR_CONNECTIONS).map(([key, connections]) => [
    key,
    [...new Set(connections.flatMap(({ start, end }) => [start, end]))],
  ])
) as Record<keyof ReceivedDataType["problemPart"], number[]>;
