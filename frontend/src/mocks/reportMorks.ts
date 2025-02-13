import type {
  DailyReportResponse,
  WeeklyReportResponse,
  MonthlyReportResponse,
} from "../types";

export const mockDailyReport: DailyReportResponse = {
  sessions: [
    {
      startedAt: "2024-02-11T09:00:00Z",
      endedAt: "2024-02-11T10:30:00Z",
      detections: [
        {
          startedAt: "2024-02-11T09:15:00Z",
          endedAt: "2024-02-11T09:20:00Z",
          videoUrl: "mock/video/url",
          neckDetected: true,
          leftShoulderDetected: false,
          rightShoulderDetected: false,
          backDetected: true,
        },
      ],
      sessionStat: {
        sessionDuration: 90,
        properPostureDuration: 85,
      },
    },
  ],
  detectionCountStat: {
    neck: 5,
    leftShoulder: 3,
    rightShoulder: 2,
    back: 4,
  },
};

export const mockWeeklyReport: WeeklyReportResponse = {
  detectionCountStat: {
    neck: 35,
    leftShoulder: 21,
    rightShoulder: 14,
    back: 28,
  },
  dailyProperPostureMinutesPerHours: [6, 7, 5, 8, 6, 7, 8],
  age_group_percentile: 75.5,
  age_group_posture_time_distribution: Array(61)
    .fill(0)
    .map((_, i) => i / 60),
};

export const mockMonthlyReport: MonthlyReportResponse = {
  detectionCountStat: {
    neck: 140,
    leftShoulder: 84,
    rightShoulder: 56,
    back: 112,
  },
  weeklyProperPostureMinutesPerHours: [30, 32, 28, 35],
  age_group_percentile: 82.5,
  age_group_posture_time_distribution: Array(61)
    .fill(0)
    .map((_, i) => i / 60),
};
