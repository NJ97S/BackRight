interface Connection {
  start: number;
  end: number;
}

export const ERROR_CONNECTIONS: Record<number, Connection[]> = {
  2: [{ start: 11, end: 12 }], // 왼쪽 어깨
  4: [{ start: 11, end: 12 }], // 오른쪽 어깨
  7: [
    { start: 11, end: 12 },
    { start: 11, end: 23 },
    { start: 12, end: 24 },
    { start: 23, end: 24 },
  ], // 허리
} as const;

export const ERROR_POINTS: Record<number, number[]> = Object.fromEntries(
  Object.entries(ERROR_CONNECTIONS).map(([key, connections]) => [
    Number(key),
    [...new Set(connections.flatMap(({ start, end }) => [start, end]))],
  ])
) as Record<number, number[]>;
