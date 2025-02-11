// =============== sessionConstants.ts ===============
export const SESSION_STATUS = {
  NORMAL: "정상 종료",
  FORCED: "강제 종료",
} as const;

export const WARNING_TYPES = {
  POSTURE: "자세 불량",
  PROXIMITY: "근접 거리",
  BRIGHTNESS: "조명 부족",
} as const;

export const TIME_FORMAT_OPTIONS = {
  hour: "2-digit",
  minute: "2-digit",
} as const;
