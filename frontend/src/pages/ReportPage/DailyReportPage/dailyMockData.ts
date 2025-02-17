import { DailyReportType } from "../../../types/reportType";

const DAILY_MOCK_DATA: DailyReportType = {
  sessions: [
    {
      startedAt: "2025-02-17T09:00:00Z",
      endedAt: "2025-02-17T09:20:00Z",
      detectionStat: {
        totalDetection: 4,
        counts: {
          NECK: 2,
          LEFT_SHOULDER: 3,
          RIGHT_SHOULDER: 2,
          BACK: 1,
        },
      },
      detections: [
        {
          id: 1011,
          startedAt: "2025-02-17T09:05:00Z",
          endedAt: "2025-02-17T09:05:30Z",
          videoUrl: "uploads/session_1011/detection1.webm",
          neckDetected: true,
          leftShoulderDetected: true,
          rightShoulderDetected: false,
          backDetected: false,
        },
        {
          id: 1012,
          startedAt: "2025-02-17T09:10:00Z",
          endedAt: "2025-02-17T09:10:45Z",
          videoUrl: "uploads/session_1011/detection2.webm",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 20,
        properPoseDuration: 12,
        averagePoseDuration: 50,
      },
    },
    {
      startedAt: "2025-02-17T10:30:00Z",
      endedAt: "2025-02-17T10:45:00Z",
      detectionStat: {
        totalDetection: 3,
        counts: {
          NECK: 2,
          LEFT_SHOULDER: 3,
          RIGHT_SHOULDER: 2,
          BACK: 1,
        },
      },
      detections: [
        {
          id: 1021,
          startedAt: "2025-02-17T10:31:00Z",
          endedAt: "2025-02-17T10:31:30Z",
          videoUrl: "uploads/session_1021/detection1.webm",
          neckDetected: true,
          leftShoulderDetected: true,
          rightShoulderDetected: false,
          backDetected: false,
        },
        {
          id: 1022,
          startedAt: "2025-02-17T10:33:00Z",
          endedAt: "2025-02-17T10:33:45Z",
          videoUrl: "uploads/session_1021/detection2.webm",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 15,
        properPoseDuration: 10,
        averagePoseDuration: 45,
      },
    },
    {
      startedAt: "2025-02-17T13:00:00Z",
      endedAt: "2025-02-17T13:25:00Z",
      detectionStat: {
        totalDetection: 5,
        counts: {
          NECK: 3,
          LEFT_SHOULDER: 4,
          RIGHT_SHOULDER: 3,
          BACK: 2,
        },
      },
      detections: [
        {
          id: 1031,
          startedAt: "2025-02-17T13:05:00Z",
          endedAt: "2025-02-17T13:05:45Z",
          videoUrl: "uploads/session_1031/detection1.webm",
          neckDetected: true,
          leftShoulderDetected: false,
          rightShoulderDetected: true,
          backDetected: false,
        },
        {
          id: 1032,
          startedAt: "2025-02-17T13:15:00Z",
          endedAt: "2025-02-17T13:15:30Z",
          videoUrl: "uploads/session_1031/detection2.webm",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 25,
        properPoseDuration: 18,
        averagePoseDuration: 55,
      },
    },
  ],
  dailyStat: {
    totalDuration: 60,
    averagePoseDuration: 50,
    properPoseDuration: 40,
    detectionCountStat: {
      totalDetection: 12,
      counts: {
        NECK: 20,
        LEFT_SHOULDER: 12,
        RIGHT_SHOULDER: 27,
        BACK: 8,
      },
    },
  },
  previousDailyStat: {
    totalDuration: 70,
    averagePoseDuration: 52,
    properPoseDuration: 45,
    detectionCountStat: {
      totalDetection: 14,
      counts: {
        NECK: 8,
        LEFT_SHOULDER: 11,
        RIGHT_SHOULDER: 8,
        BACK: 5,
      },
    },
  },
};

export default DAILY_MOCK_DATA;
