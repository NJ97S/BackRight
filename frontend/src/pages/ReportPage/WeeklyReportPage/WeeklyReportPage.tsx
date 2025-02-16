import { useState } from "react";

import Calendar from "../../../components/common/Calendar/Calendar";
import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";

import WEEKLY_MOCK_DATA from "./weeklyMockData";

import * as S from "./WeeklyReportPageStyle";

const getMondayOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);

  monday.setDate(date.getDate() + diff);
  return monday;
};

const { detectionCountStat } = WEEKLY_MOCK_DATA;

const WeeklyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(getMondayOfWeek(new Date()));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(getMondayOfWeek(date));
  };

  return (
    <S.WeeklyReportPageContainer>
      <PostureWarningSummary detectionCountStat={detectionCountStat} />
      <Calendar selectedDate={selectedDate} onDateChange={handleDateSelect} />
    </S.WeeklyReportPageContainer>
  );
};

export default WeeklyReportPage;
