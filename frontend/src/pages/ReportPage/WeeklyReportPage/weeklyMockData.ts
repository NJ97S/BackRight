const WEEKLY_MOCK_DATA = {
  detectionCountStat: {
    totalDetection: 50,
    counts: {
      NECK: 20,
      LEFT_SHOULDER: 15,
      RIGHT_SHOULDER: 10,
      BACK: 5,
    },
  },
  dailyProperPostureMinutesPerHours: [32, 35, 30, 38, 33, 31, 34],
  ageGroupPercentile: 78.5,
  ageGroupPostureTimeDistribution: [
    1,
    1,
    2,
    2,
    2,
    3,
    3, // 0-6분
    3,
    4,
    4,
    4,
    5,
    5,
    5, // 7-13분
    6,
    6,
    7,
    7,
    8,
    8,
    9, // 14-20분
    10,
    11,
    12,
    13,
    14,
    15,
    16, // 21-27분
    17,
    18,
    19,
    20,
    21,
    22,
    23, // 28-34분
    22,
    21,
    20,
    19,
    18,
    17,
    16, // 35-41분
    15,
    14,
    13,
    12,
    11,
    10,
    9, // 42-48분
    8,
    7,
    6,
    5,
    4,
    3,
    2, // 49-55분
    2,
    1,
    1,
    1,
    1, // 56-60분
  ],
  userAgeGroup: "20대",
  ageGroupAverageTime: 27,
  userName: "소남주",
};

export default WEEKLY_MOCK_DATA;
