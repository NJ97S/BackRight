import { useState } from "react";

import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import WeeklyCalendar from "../../../components/common/Calendar/WeeklyCalendar";
import AveragePostureTime from "../../../components/common/AveragePostureTime/AveragePostureTime";

import WEEKLY_MOCK_DATA from "./weeklyMockData";

import * as S from "./WeeklyReportPageStyle";

const getMondayOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);

  monday.setDate(date.getDate() + diff);
  return monday;
};

const { detectionCountStat, dailyProperPostureMinutesPerHours } =
  WEEKLY_MOCK_DATA;

const WeeklyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(getMondayOfWeek(new Date()));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(getMondayOfWeek(date));
  };

  return (
    <S.WeeklyReportPageContainer>
      <S.FirstRowContainer>
        <PostureWarningSummary detectionCountStat={detectionCountStat} />
        <WeeklyCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateSelect}
        />
      </S.FirstRowContainer>

      <S.SecondeRowContainer>
        <AveragePostureTime
          data={dailyProperPostureMinutesPerHours}
          labels={["월", "화", "수", "목", "금", "토", "일"]}
        />
      </S.SecondeRowContainer>
    </S.WeeklyReportPageContainer>
  );
};

export default WeeklyReportPage;
