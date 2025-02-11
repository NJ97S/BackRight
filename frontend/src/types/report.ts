export interface Detection {
  startedAt: string;
  endedAt: string;
  videoUrl: string;
  neckDetected: boolean;
  leftShoulderDetected: boolean;
  rightShoulderDetected: boolean;
  backDetected: boolean;
}

export interface SessionStat {
  sessionDuration: number;
  properPostureDuration: number;
}

export interface Session {
  startedAt: string;
  endedAt: string;
  detections: Detection[];
  sessionStat: SessionStat;
}

export interface DetectionCountStat {
  neck: number;
  leftShoulder: number;
  rightShoulder: number;
  back: number;
}

// Request Types
export interface BaseReportRequest {
  timezone: string;
}

export interface DailyReportRequest extends BaseReportRequest {
  date: string;
}

export interface WeeklyReportRequest extends BaseReportRequest {
  "start-date": string;
}

export interface MonthlyReportRequest extends BaseReportRequest {
  year: number;
  month: number;
}

// Response Types
export interface DailyReportResponse {
  sessions: Session[];
  detectionCountStat: DetectionCountStat;
}

export interface WeeklyReportResponse {
  detectionCountStat: DetectionCountStat;
  dailyProperPostureMinutesPerHours: number[];
  age_group_percentile: number;
  age_group_posture_time_distribution: number[];
}

export interface MonthlyReportResponse {
  detectionCountStat: DetectionCountStat;
  weeklyProperPostureMinutesPerHours: number[];
  age_group_percentile: number;
  age_group_posture_time_distribution: number[];
}

// Local UI Types
export type SessionStatus = "정상 종료" | "강제 종료";

export interface LocalWarning {
  id: string;
  timestamp: string;
  description: string;
}

export interface LocalSession {
  id: string;
  startTime: string;
  endTime: string;
  warningCount: number;
  status: SessionStatus;
  warnings: LocalWarning[];
}
