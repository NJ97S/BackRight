import { useState } from "react";

import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import WeeklyCalendar from "../../../components/common/Calendar/WeeklyCalendar";

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
      <WeeklyCalendar
        selectedDate={selectedDate}
        onDateChange={handleDateSelect}
      />
    </S.WeeklyReportPageContainer>
  );
};

export default WeeklyReportPage;
