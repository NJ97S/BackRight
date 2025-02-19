export interface DetectionType {
  id: number;
  startedAt: string;
  endedAt: string | null;
  videoUrl: string;
  neckDetected: boolean;
  leftShoulderDetected: boolean;
  rightShoulderDetected: boolean;
  backDetected: boolean;
}

export interface DetectionCountStatType {
  totalDetection: number;
  counts: {
    NECK: number;
    LEFT_SHOULDER: number;
    RIGHT_SHOULDER: number;
    BACK: number;
  };
}

export interface SessionStatType {
  sessionDuration: number;
  properPoseDuration: number;
  averagePoseDuration: number;
}

export interface SessionType {
  startedAt: string;
  endedAt: string;
  detections: DetectionType[];
  detectionStat: DetectionCountStatType;
  sessionStat: SessionStatType;
}

export interface DailyStatType {
  totalDuration: number;
  averagePoseDuration: number;
  properPoseDuration: number;
  detectionCountStat: DetectionCountStatType;
}

export interface DailyReportType {
  sessions: SessionType[];
  dailyStat: DailyStatType;
  previousDailyStat: DailyStatType | null;
}
export interface TimeDistribution {
  lowerBound: number;
  upperBound: number;
}

export interface DistributionData {
  groupPercentile: number;
  groupProperPoseTimeDistribution: TimeDistribution[];
}

export interface WeeklyReportType {
  dailyProperPoseMinutesPerHours: number[];
  detectionCountStat: DetectionCountStatType;
  overallDistribution: DistributionData;
  ageRangeDistribution: DistributionData;
  ageRangeGenderDistribution: DistributionData;
}

export interface MonthlyReportType {
  detectionCountStat: DetectionCountStatType;
  weeklyProperPostureMinutesPerHours: number[];
  ageGroupPercentile: number;
  ageGroupPostureTimeDistribution: number[];
  userAgeGroup: string;
  ageGroupAverageTime: number;
  userName: string;
}
