const WEEKLY_MOCK_DATA = {
  detectionCountStat: {
    totalDetection: 5748,
    countMap: {
      neck: 1520,
      leftShoulder: 1345,
      rightShoulder: 1402,
      back: 1480,
    },
  },
  dailyProperPostureMinutesPerHours: [42, 38, 50, 47, 41, 45, 48],
  ageGroupPercentile: 82.6,
  ageGroupPostureTimeDistribution: [
    2, 3, 5, 7, 8, 10, 12, 15, 17, 20, 23, 25, 28, 30, 33, 35, 38, 40, 42, 44,
    46, 48, 50, 52, 54, 56, 58, 59, 60, 60, 58, 57, 55, 54, 52, 50, 48, 47, 45,
    43, 40, 38, 35, 33, 30, 28, 25, 23, 20, 18, 15, 12, 10, 8, 7, 5, 3, 2,
  ],
} as const;

export default WEEKLY_MOCK_DATA;
