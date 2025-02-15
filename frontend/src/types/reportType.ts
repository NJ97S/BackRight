export interface DetectionType {
  startedAt: string;
  endedAt: string;
  videoUrl: string;
  neckDetected: boolean;
  leftShoulderDetected: boolean;
  rightShoulderDetected: boolean;
  backDetected: boolean;
}

export interface SessionStatType {
  sessionDuration: number;
  properPostureDuration: number;
}

export interface SessionType {
  startedAt: string;
  endedAt: string;
  detections: DetectionType[];
  sessionStat: SessionStatType;
}

export interface DetectionCountStatType {
  neck: number;
  leftShoulder: number;
  rightShoulder: number;
  back: number;
}

export interface DailyReportType {
  sessions: SessionType[];
  detectionCountStat: DetectionCountStatType;
}
