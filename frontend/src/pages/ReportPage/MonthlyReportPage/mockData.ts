import { MonthlyReportType } from "../../../types/reportType";

export const MOCK_DATA: MonthlyReportType = {
  weeklyProperPoseMinutesPerHours: [0, 0, 0, 45, 0],
  detectionCountStat: {
    totalDetection: 7,
    counts: { NECK: 6, LEFT_SHOULDER: 4, RIGHT_SHOULDER: 4, BACK: 6 },
  },
  monthlyAveragePoseDuration: 45,
  overallDistribution: {
    groupBinCounts: [
      0, 4, 1, 0, 7, 9, 10, 20, 27, 31, 31, 41, 49, 57, 58, 58, 59, 74, 67, 65,
      84, 77, 85, 88, 74, 50, 60, 43, 46, 26, 35, 20, 24, 11, 15, 14, 5, 6, 4,
      3, 2, 0, 0, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1,
    ],
    groupPercentile: 99.51757408683667,
  },
  ageRangeDistribution: {
    groupBinCounts: [
      0, 1, 0, 0, 0, 1, 3, 6, 8, 6, 3, 11, 8, 11, 10, 14, 8, 14, 12, 13, 12, 18,
      19, 15, 15, 10, 9, 3, 5, 7, 7, 3, 4, 2, 2, 1, 0, 1, 0, 2, 1, 0, 0, 0, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1,
    ],
    groupPercentile: 97.44525547445255,
  },
  ageRangeGenderDistribution: {
    groupBinCounts: [
      0, 0, 0, 0, 0, 0, 3, 2, 5, 3, 1, 6, 2, 4, 5, 7, 3, 8, 9, 8, 4, 5, 9, 9, 8,
      9, 4, 2, 2, 4, 3, 2, 1, 1, 0, 0, 0, 1, 0, 2, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0,
      0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
    ],
    groupPercentile: 95.74468085106383,
  },
};
