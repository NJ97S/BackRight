const MONTHLY_MOCK_DATA = {
  detectionCountStat: {
    totalDetection: 1200,
    counts: {
      NECK: 300,
      LEFT_SHOULDER: 250,
      RIGHT_SHOULDER: 320,
      BACK: 330,
    },
  },
  weeklyProperPostureMinutesPerHours: [30, 28, 35, 40, 38],
  ageGroupPercentile: 82.5,
  ageGroupPostureTimeDistribution: [
    1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 22, 21, 20, 19, 18, 17, 16, 15,
    14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 2, 1, 1, 1, 1,
  ],
  userAgeGroup: "20대",
  ageGroupAverageTime: 25,
  userName: "소남주",
};

export default MONTHLY_MOCK_DATA;
