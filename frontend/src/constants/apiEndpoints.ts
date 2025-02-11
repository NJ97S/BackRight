export const API_ENDPOINTS = {
  SESSIONS: "/api/sessions",
  WARNINGS: "/api/warnings",
  DAILY: (memberId: string) => `/members/${memberId}/reports/daily`,
  WEEKLY: (memberId: string) => `/members/${memberId}/reports/weekly`,
  MONTHLY: (memberId: string) => `/members/${memberId}/reports/monthly`,
} as const;

export const API_CONFIG = {
  TIMEOUT: 5000,
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
} as const;
