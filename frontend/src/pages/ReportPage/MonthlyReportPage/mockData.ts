import { MonthlyReportType } from "../../../types/reportType";

const MOCK_DATA: MonthlyReportType = {
  weeklyProperPoseMinutesPerHours: [0, 0, 0, 54, 0],
  detectionCountStat: {
    totalDetection: 1,
    counts: {
      NECK: 0,
      LEFT_SHOULDER: 0,
      RIGHT_SHOULDER: 1,
      BACK: 1,
    },
  },
  overallDistribution: {
    groupPercentile: 98,
    groupProperPoseTimeDistribution: [
      {
        lowerBound: 1,
        upperBound: 5,
      },
      {
        lowerBound: 5,
        upperBound: 6,
      },
      {
        lowerBound: 6,
        upperBound: 7,
      },
      {
        lowerBound: 7,
        upperBound: 8,
      },
      {
        lowerBound: 8,
        upperBound: 8,
      },
      {
        lowerBound: 8,
        upperBound: 9,
      },
      {
        lowerBound: 9,
        upperBound: 9,
      },
      {
        lowerBound: 9,
        upperBound: 10,
      },
      {
        lowerBound: 10,
        upperBound: 10,
      },
      {
        lowerBound: 10,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 14,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 25,
      },
      {
        lowerBound: 25,
        upperBound: 25,
      },
      {
        lowerBound: 25,
        upperBound: 25,
      },
      {
        lowerBound: 25,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 27,
      },
      {
        lowerBound: 27,
        upperBound: 27,
      },
      {
        lowerBound: 27,
        upperBound: 27,
      },
      {
        lowerBound: 27,
        upperBound: 27,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 28,
        upperBound: 29,
      },
      {
        lowerBound: 29,
        upperBound: 29,
      },
      {
        lowerBound: 29,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 31,
      },
      {
        lowerBound: 31,
        upperBound: 31,
      },
      {
        lowerBound: 31,
        upperBound: 32,
      },
      {
        lowerBound: 32,
        upperBound: 33,
      },
      {
        lowerBound: 33,
        upperBound: 34,
      },
      {
        lowerBound: 34,
        upperBound: 35,
      },
      {
        lowerBound: 35,
        upperBound: 36,
      },
      {
        lowerBound: 37,
        upperBound: 40,
      },
      {
        lowerBound: 40,
        upperBound: 60,
      },
    ],
  },
  ageRangeDistribution: {
    groupPercentile: 98,
    groupProperPoseTimeDistribution: [
      {
        lowerBound: 1,
        upperBound: 6,
      },
      {
        lowerBound: 6,
        upperBound: 7,
      },
      {
        lowerBound: 7,
        upperBound: 7,
      },
      {
        lowerBound: 7,
        upperBound: 8,
      },
      {
        lowerBound: 8,
        upperBound: 8,
      },
      {
        lowerBound: 8,
        upperBound: 8,
      },
      {
        lowerBound: 8,
        upperBound: 9,
      },
      {
        lowerBound: 9,
        upperBound: 9,
      },
      {
        lowerBound: 9,
        upperBound: 10,
      },
      {
        lowerBound: 10,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 11,
      },
      {
        lowerBound: 12,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 16,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 25,
      },
      {
        lowerBound: 25,
        upperBound: 25,
      },
      {
        lowerBound: 25,
        upperBound: 25,
      },
      {
        lowerBound: 25,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 27,
        upperBound: 27,
      },
      {
        lowerBound: 27,
        upperBound: 28,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 29,
        upperBound: 29,
      },
      {
        lowerBound: 29,
        upperBound: 29,
      },
      {
        lowerBound: 29,
        upperBound: 29,
      },
      {
        lowerBound: 29,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 31,
        upperBound: 31,
      },
      {
        lowerBound: 31,
        upperBound: 32,
      },
      {
        lowerBound: 32,
        upperBound: 32,
      },
      {
        lowerBound: 32,
        upperBound: 33,
      },
      {
        lowerBound: 33,
        upperBound: 34,
      },
      {
        lowerBound: 34,
        upperBound: 35,
      },
      {
        lowerBound: 37,
        upperBound: 39,
      },
      {
        lowerBound: 39,
        upperBound: 40,
      },
      {
        lowerBound: 44,
        upperBound: 45,
      },
      {
        lowerBound: 46,
        upperBound: 47,
      },
      {
        lowerBound: 53,
        upperBound: 54,
      },
      {
        lowerBound: 55,
        upperBound: 60,
      },
    ],
  },
  ageRangeGenderDistribution: {
    groupPercentile: 99,
    groupProperPoseTimeDistribution: [
      {
        lowerBound: 1,
        upperBound: 5,
      },
      {
        lowerBound: 7,
        upperBound: 7,
      },
      {
        lowerBound: 7,
        upperBound: 7,
      },
      {
        lowerBound: 8,
        upperBound: 8,
      },
      {
        lowerBound: 8,
        upperBound: 9,
      },
      {
        lowerBound: 9,
        upperBound: 9,
      },
      {
        lowerBound: 10,
        upperBound: 10,
      },
      {
        lowerBound: 11,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 11,
      },
      {
        lowerBound: 11,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 12,
      },
      {
        lowerBound: 12,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 13,
        upperBound: 13,
      },
      {
        lowerBound: 14,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 14,
      },
      {
        lowerBound: 14,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 15,
        upperBound: 15,
      },
      {
        lowerBound: 16,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 16,
      },
      {
        lowerBound: 16,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 17,
      },
      {
        lowerBound: 17,
        upperBound: 18,
      },
      {
        lowerBound: 18,
        upperBound: 18,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 19,
      },
      {
        lowerBound: 19,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 20,
        upperBound: 20,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 21,
        upperBound: 21,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 22,
        upperBound: 22,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 23,
        upperBound: 23,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 24,
        upperBound: 24,
      },
      {
        lowerBound: 25,
        upperBound: 25,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 26,
        upperBound: 26,
      },
      {
        lowerBound: 27,
        upperBound: 27,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 28,
        upperBound: 28,
      },
      {
        lowerBound: 29,
        upperBound: 29,
      },
      {
        lowerBound: 29,
        upperBound: 29,
      },
      {
        lowerBound: 29,
        upperBound: 29,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 30,
        upperBound: 30,
      },
      {
        lowerBound: 31,
        upperBound: 31,
      },
      {
        lowerBound: 32,
        upperBound: 32,
      },
      {
        lowerBound: 32,
        upperBound: 32,
      },
      {
        lowerBound: 32,
        upperBound: 32,
      },
      {
        lowerBound: 33,
        upperBound: 33,
      },
      {
        lowerBound: 34,
        upperBound: 34,
      },
      {
        lowerBound: 34,
        upperBound: 34,
      },
      {
        lowerBound: 35,
        upperBound: 35,
      },
      {
        lowerBound: 54,
        upperBound: 54,
      },
    ],
  },
};

export default MOCK_DATA;
