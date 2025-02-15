import { DailyReportType } from "../../../types/reportType";

const DAILY_MOCK_DATA: DailyReportType = {
  sessions: [
    {
      startedAt: "2025-02-15T10:00:00Z",
      endedAt: "2025-02-15T10:30:00Z",
      detections: [
        {
          startedAt: "2025-02-15T10:05:00Z",
          endedAt: "2025-02-15T10:06:00Z",
          videoUrl: "https://example.com/video1.mp4",
          neckDetected: true,
          leftShoulderDetected: false,
          rightShoulderDetected: true,
          backDetected: true,
        },
        {
          startedAt: "2025-02-15T10:10:00Z",
          endedAt: "2025-02-15T10:12:00Z",
          videoUrl: "https://example.com/video2.mp4",
          neckDetected: true,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: false,
        },
        {
          startedAt: "2025-02-15T10:20:00Z",
          endedAt: "2025-02-15T10:25:00Z",
          videoUrl: "https://example.com/video3.mp4",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: false,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 30,
        properPostureDuration: 15,
        detectionDuration: 12,
        detectionCount: 3,
        averageProperPoseDuration: 5,
      },
    },
    {
      startedAt: "2025-02-15T14:00:00Z",
      endedAt: "2025-02-15T14:45:00Z",
      detections: [
        {
          startedAt: "2025-02-15T14:05:00Z",
          endedAt: "2025-02-15T14:08:00Z",
          videoUrl: "https://example.com/video4.mp4",
          neckDetected: true,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: true,
        },
        {
          startedAt: "2025-02-15T14:20:00Z",
          endedAt: "2025-02-15T14:25:00Z",
          videoUrl: "https://example.com/video5.mp4",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: false,
        },
      ],
      sessionStat: {
        sessionDuration: 45,
        properPostureDuration: 20,
        detectionDuration: 15,
        detectionCount: 2,
        averageProperPoseDuration: 7,
      },
    },
  ],
  sessionsStat: {
    sessionDuration: 75,
    properPostureDuration: 35,
    detectionDuration: 27,
    detectionCount: 5,
    averageProperPoseDuration: 6,
  },
  detectionCountStat: {
    totalDetection: 60,
    countMap: {
      neck: 20,
      leftShoulder: 12,
      rightShoulder: 27,
      back: 8,
    },
  },
} as const;

export default DAILY_MOCK_DATA;
