import { DailyReportType } from "../../../types/reportType";

const DAILY_MOCK_DATA: DailyReportType = {
  sessions: [
    {
      startedAt: "2025-02-16T08:00:00Z",
      endedAt: "2025-02-16T08:30:00Z",
      detections: [
        {
          startedAt: "2025-02-16T08:05:00Z",
          endedAt: "2025-02-16T08:05:10Z",
          videoUrl: "https://example.com/video1.mp4",
          neckDetected: true,
          leftShoulderDetected: true,
          rightShoulderDetected: false,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 1800,
        properPoseDuration: 1200,
        averagePoseDuration: 600,
        detectionCountStat: {
          totalDetection: 5,
          detectionDuration: 300,
          counts: {
            NECK: 3,
            LEFT_SHOULDER: 2,
            RIGHT_SHOULDER: 1,
            BACK: 4,
          },
        },
      },
    },
    {
      startedAt: "2025-02-16T09:00:00Z",
      endedAt: "2025-02-16T09:25:00Z",
      detections: [
        {
          startedAt: "2025-02-16T09:10:00Z",
          endedAt: "2025-02-16T09:10:10Z",
          videoUrl: "https://example.com/video2.mp4",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 1500,
        properPoseDuration: 800,
        averagePoseDuration: 400,
        detectionCountStat: {
          totalDetection: 3,
          detectionDuration: 250,
          counts: {
            NECK: 2,
            LEFT_SHOULDER: 3,
            RIGHT_SHOULDER: 2,
            BACK: 3,
          },
        },
      },
    },
    {
      startedAt: "2025-02-16T10:00:00Z",
      endedAt: "2025-02-16T10:20:00Z",
      detections: [
        {
          startedAt: "2025-02-16T10:05:00Z",
          endedAt: "2025-02-16T10:05:20Z",
          videoUrl: "https://example.com/video3.mp4",
          neckDetected: true,
          leftShoulderDetected: false,
          rightShoulderDetected: false,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 1200,
        properPoseDuration: 700,
        averagePoseDuration: 350,
        detectionCountStat: {
          totalDetection: 4,
          detectionDuration: 200,
          counts: {
            NECK: 1,
            LEFT_SHOULDER: 2,
            RIGHT_SHOULDER: 1,
            BACK: 2,
          },
        },
      },
    },
    {
      startedAt: "2025-02-16T11:00:00Z",
      endedAt: "2025-02-16T11:45:00Z",
      detections: [
        {
          startedAt: "2025-02-16T11:15:00Z",
          endedAt: "2025-02-16T11:15:30Z",
          videoUrl: "https://example.com/video4.mp4",
          neckDetected: false,
          leftShoulderDetected: true,
          rightShoulderDetected: true,
          backDetected: false,
        },
      ],
      sessionStat: {
        sessionDuration: 2700,
        properPoseDuration: 1200,
        averagePoseDuration: 600,
        detectionCountStat: {
          totalDetection: 6,
          detectionDuration: 400,
          counts: {
            NECK: 3,
            LEFT_SHOULDER: 3,
            RIGHT_SHOULDER: 3,
            BACK: 2,
          },
        },
      },
    },
  ],
  sessionStat: {
    sessionDuration: 7200,
    properPoseDuration: 3900,
    averagePoseDuration: 975,
    detectionCountStat: {
      totalDetection: 18,
      detectionDuration: 1150,
      counts: {
        NECK: 20,
        LEFT_SHOULDER: 12,
        RIGHT_SHOULDER: 27,
        BACK: 8,
      },
    },
  },
};

export default DAILY_MOCK_DATA;
