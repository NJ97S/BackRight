import { DailyReportType } from "../../../types/reportType";

const DAILY_MOCK_DATA: DailyReportType = {
  sessions: [
    {
      startedAt: "2025-02-15T08:00:00Z",
      endedAt: "2025-02-15T08:30:00Z",
      detections: [
        {
          startedAt: "2025-02-15T08:05:00Z",
          endedAt: "2025-02-15T08:07:00Z",
          videoUrl: "https://example.com/video1.mp4",
          neckDetected: true,
          leftShoulderDetected: false,
          rightShoulderDetected: true,
          backDetected: true,
        },
        {
          startedAt: "2025-02-15T08:15:00Z",
          endedAt: "2025-02-15T08:17:00Z",
          videoUrl: "https://example.com/video2.mp4",
          neckDetected: true,
          leftShoulderDetected: true,
          rightShoulderDetected: false,
          backDetected: false,
        },
      ],
      sessionStat: {
        sessionDuration: 30,
        properPostureDuration: 12,
        detectionDuration: 9,
        detectionCount: 2,
        averageProperPoseDuration: 6,
      },
    },
    {
      startedAt: "2025-02-15T09:00:00Z",
      endedAt: "2025-02-15T09:45:00Z",
      detections: [
        {
          startedAt: "2025-02-15T09:10:00Z",
          endedAt: "2025-02-15T09:12:00Z",
          videoUrl: "https://example.com/video3.mp4",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: true,
        },
        {
          startedAt: "2025-02-15T09:20:00Z",
          endedAt: "2025-02-15T09:23:00Z",
          videoUrl: "https://example.com/video4.mp4",
          neckDetected: true,
          leftShoulderDetected: false,
          rightShoulderDetected: true,
          backDetected: false,
        },
      ],
      sessionStat: {
        sessionDuration: 45,
        properPostureDuration: 20,
        detectionDuration: 12,
        detectionCount: 2,
        averageProperPoseDuration: 6,
      },
    },
    {
      startedAt: "2025-02-15T10:30:00Z",
      endedAt: "2025-02-15T11:00:00Z",
      detections: [
        {
          startedAt: "2025-02-15T10:35:00Z",
          endedAt: "2025-02-15T10:38:00Z",
          videoUrl: "https://example.com/video5.mp4",
          neckDetected: true,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 30,
        properPostureDuration: 18,
        detectionDuration: 3,
        detectionCount: 1,
        averageProperPoseDuration: 9,
      },
    },
    // 7개의 추가 세션을 생성 (이전 패턴을 유지하며 시간대 조정)
    ...Array.from({ length: 7 }, (_, i) => ({
      startedAt: `2025-02-15T${12 + i}:00:00Z`,
      endedAt: `2025-02-15T${12 + i}:30:00Z`,
      detections: [
        {
          startedAt: `2025-02-15T${12 + i}:05:00Z`,
          endedAt: `2025-02-15T${12 + i}:10:00Z`,
          videoUrl: `https://example.com/video${i + 6}.mp4`,
          neckDetected: i % 2 === 0,
          leftShoulderDetected: i % 3 === 0,
          rightShoulderDetected: i % 4 === 0,
          backDetected: i % 5 === 0,
        },
      ],
      sessionStat: {
        sessionDuration: 30,
        properPostureDuration: 15 + (i % 5),
        detectionDuration: 5 + (i % 3),
        detectionCount: 1,
        averageProperPoseDuration: 5 + (i % 2),
      },
    })),
  ],
  sessionsStat: {
    sessionDuration: 300,
    properPostureDuration: 140,
    detectionDuration: 65,
    detectionCount: 10,
    averageProperPoseDuration: 7,
  },
  detectionCountStat: {
    totalDetection: 100,
    countMap: {
      neck: 35,
      leftShoulder: 25,
      rightShoulder: 30,
      back: 10,
    },
  },
} as const;

export default DAILY_MOCK_DATA;
