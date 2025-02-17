import { MonthlyReportType } from "../../../types/reportType";

const MONTHLY_MOCK_DATA: MonthlyReportType = {
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
  ageGroupPostureTimeDistribution: Array.from({ length: 60 }, () =>
    Math.floor(Math.random() * 100)
  ),
};

export default MONTHLY_MOCK_DATA;
