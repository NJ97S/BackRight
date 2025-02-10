// SessionLog의 constants.ts에서 가져온 상수들
// Session 상태 관련 상수
export const SESSION_STATUS = {
  NORMAL: "정상 종료",
  FORCED: "강제 종료",
} as const;

// 경고 타입 관련 상수
export const WARNING_TYPES = {
  POSTURE: "자세 불량",
  PROXIMITY: "근접 거리",
  BRIGHTNESS: "조명 부족",
} as const;

// 시간 포맷 관련 상수
export const TIME_FORMAT_OPTIONS = {
  hour: "2-digit",
  minute: "2-digit",
} as const;

// 모달 크기 관련 상수
export const MODAL_DIMENSIONS = {
  MAX_WIDTH: "62.5rem", // 1000px
  MAX_HEIGHT: "80vh",
} as const;

// API 엔드포인트 관련 상수
export const API_ENDPOINTS = {
  SESSIONS: "/api/sessions",
  WARNINGS: "/api/warnings",
} as const;

// 목업 데이터
export const MOCK_SESSION_DATA = [
  {
    id: "1",
    startTime: "2023-06-01T10:00:00Z",
    endTime: "2023-06-01T11:30:00Z",
    warningCount: 3,
    status: SESSION_STATUS.NORMAL,
    warnings: [
      {
        id: "1a",
        timestamp: "2023-06-01T10:15:00Z",
        description: WARNING_TYPES.POSTURE,
      },
      {
        id: "1b",
        timestamp: "2023-06-01T10:45:00Z",
        description: WARNING_TYPES.PROXIMITY,
      },
      {
        id: "1c",
        timestamp: "2023-06-01T11:15:00Z",
        description: WARNING_TYPES.BRIGHTNESS,
      },
    ],
  },
  {
    id: "2",
    startTime: "2023-06-01T14:00:00Z",
    endTime: "2023-06-01T15:45:00Z",
    warningCount: 2,
    status: SESSION_STATUS.FORCED,
    warnings: [
      {
        id: "2a",
        timestamp: "2023-06-01T14:30:00Z",
        description: WARNING_TYPES.POSTURE,
      },
      {
        id: "2b",
        timestamp: "2023-06-01T15:15:00Z",
        description: WARNING_TYPES.PROXIMITY,
      },
    ],
  },
];

// 페이지네이션 관련 상수
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  MAX_VISIBLE_PAGES: 5,
} as const;

// 스타일 관련 상수
export const STYLE_CONSTANTS = {
  BORDER_RADIUS: "0.75rem",
  TIMELINE_WIDTH: "0.25rem",
  TIMELINE_DOT_SIZE: "1rem",
  WARNING_ITEM_GAP: "0.75rem",
} as const;
