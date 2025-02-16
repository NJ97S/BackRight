export interface DetectionType {
  startedAt: string;
  endedAt: string;
  videoUrl: string;
  neckDetected: boolean;
  leftShoulderDetected: boolean;
  rightShoulderDetected: boolean;
  backDetected: boolean;
}

export interface DetectionCountStatType {
  totalDetection: number;
  detectionDuration: number;
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
  detectionCountStat: DetectionCountStatType;
}

export interface SessionType {
  startedAt: string;
  endedAt: string;
  detections: DetectionType[];
  sessionStat: SessionStatType;
}

export interface DailyReportType {
  sessions: SessionType[];
  sessionStat: SessionStatType;
}

export interface WeeklyReportType {
  detectionCountStat: DetectionCountStatType;
  dailyProperPostureMinutesPerHours: number[];
  ageGroupPercentile: number;
  ageGroupPostureTimeDistribution: number[];
}

export interface MonthlyReportType {
  detectionCountStat: DetectionCountStatType;
  weeklyProperPostureMinutesPerHours: number[];
  ageGroupPercentile: number;
  ageGroupPostureTimeDistribution: number[];
}
