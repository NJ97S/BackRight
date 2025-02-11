import type {
  DailyReportRequest,
  DailyReportResponse,
  WeeklyReportRequest,
  WeeklyReportResponse,
  MonthlyReportRequest,
  MonthlyReportResponse,
} from "../types";

// 실제 API 연동 시 사용할 import
// import instance from './instance';
// import { API_ENDPOINTS } from '../constants/apiEndpoints';

import {
  mockDailyReport,
  mockWeeklyReport,
  mockMonthlyReport,
} from "../mocks/reportMorks";

export const getDailyReport = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  memberId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: DailyReportRequest
): Promise<DailyReportResponse> => {
  try {
    return mockDailyReport;
  } catch (error) {
    throw new Error("일간 보고서 조회 실패");
  }
};

export const getWeeklyReport = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  memberId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: WeeklyReportRequest
): Promise<WeeklyReportResponse> => {
  try {
    return mockWeeklyReport;
  } catch (error) {
    throw new Error("주간 보고서 조회 실패");
  }
};

export const getMonthlyReport = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  memberId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: MonthlyReportRequest
): Promise<MonthlyReportResponse> => {
  try {
    return mockMonthlyReport;
  } catch (error) {
    throw new Error("월간 보고서 조회 실패");
  }
};
