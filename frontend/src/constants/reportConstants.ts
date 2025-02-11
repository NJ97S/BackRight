export const PERIOD_TABS = [
  { name: "일간/세션", path: "/report/daily" },
  { name: "주간", path: "/report/weekly" },
  { name: "월간", path: "/report/monthly" },
] as const;

export const MODAL_DIMENSIONS = {
  MAX_WIDTH: "60rem",
  MAX_HEIGHT: "40rem",
} as const;

export const CHART_COLORS = {
  PRIMARY: "#76abae",
  SECONDARY: "#777777",
  WARNING: "#FF3131",
  WARNING_MEDIUM: "#FF893A",
} as const;
