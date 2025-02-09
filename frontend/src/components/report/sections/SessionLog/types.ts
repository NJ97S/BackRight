// types.ts
export type SessionStatus = "정상 종료" | "강제 종료";

export interface Warning {
  id: string;
  timestamp: string;
  description: string;
}

export interface Session {
  id: string;
  startTime: string;
  endTime: string;
  warningCount: number;
  status: SessionStatus;
  warnings: Warning[];
}
