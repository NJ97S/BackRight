import type { LocalSession } from "../types";

const MOCK_SESSION_DATA: LocalSession[] = [
  {
    id: "1",
    startTime: "2025-02-11T09:00:00Z",
    endTime: "2025-02-11T10:30:00Z",
    status: "정상 종료",
    warningCount: 3,
    warnings: [
      {
        id: "w1",
        timestamp: "2025-02-11T09:15:00Z",
        description: "목이 앞으로 기울어졌습니다.",
      },
      {
        id: "w2",
        timestamp: "2025-02-11T09:45:00Z",
        description: "허리가 구부정합니다.",
      },
      {
        id: "w3",
        timestamp: "2025-02-11T10:15:00Z",
        description: "어깨가 올라갔습니다.",
      },
    ],
  },
  {
    id: "2",
    startTime: "2025-02-11T11:00:00Z",
    endTime: "2025-02-11T12:00:00Z",
    status: "강제 종료",
    warningCount: 2,
    warnings: [
      {
        id: "w4",
        timestamp: "2025-02-11T11:20:00Z",
        description: "허리가 구부정합니다.",
      },
      {
        id: "w5",
        timestamp: "2025-02-11T11:40:00Z",
        description: "목이 앞으로 기울어졌습니다.",
      },
    ],
  },
  {
    id: "3",
    startTime: "2025-02-11T14:00:00Z",
    endTime: "2025-02-11T15:30:00Z",
    status: "정상 종료",
    warningCount: 1,
    warnings: [
      {
        id: "w6",
        timestamp: "2025-02-11T14:45:00Z",
        description: "어깨가 올라갔습니다.",
      },
    ],
  },
] as const;

export default MOCK_SESSION_DATA;
