// src/types/types.ts

// 기존 타입
export interface ReceivedDataType {
  initialSet: boolean;
  detected: boolean;
  videoUrl: string | null;
  detectionStartAt: string | null;
  problemPart: {
    neck: boolean;
    leftShoulder: boolean;
    rightShoulder: boolean;
    back: boolean;
  };
}

export interface SignUpInfoType {
  name: string;
  nickname: string;
  birthDate: string;
  gender: "FEMALE" | "MALE";
}

// SessionLog의 types.ts에서 가져온 타입들
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
