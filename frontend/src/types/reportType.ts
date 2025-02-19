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

export interface TimeDistributionType {
  lowerBound: number;
  upperBound: number;
}

export interface DistributionType {
  groupPercentile: number;
  groupProperPoseTimeDistribution: TimeDistributionType[];
}

export interface DailyReportType {
  sessions: SessionType[];
  dailyStat: DailyStatType;
  previousDailyStat: DailyStatType | null;
}

export interface WeeklyReportType {
  dailyProperPoseMinutesPerHours: number[];
  detectionCountStat: DetectionCountStatType;
  overallDistribution: DistributionType;
  ageRangeDistribution: DistributionType;
  ageRangeGenderDistribution: DistributionType;
}

export interface MonthlyReportType {
  weeklyProperPoseMinutesPerHours: number[];
  detectionCountStat: DetectionCountStatType;
  overallDistribution: DistributionType;
  ageRangeDistribution: DistributionType;
  ageRangeGenderDistribution: DistributionType;
}
