import { useEffect, useState } from "react";

import MonthlyCalendar from "../../../components/common/Calendar/MonthlyCalendar";
import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";

import MONTHLY_MOCK_DATA from "./monthlyMockData";

import * as S from "./MonthlyReportPageStyle";
import AveragePostureTime from "../../../components/common/AveragePostureTime/AveragePostureTime";

const { detectionCountStat } = MONTHLY_MOCK_DATA;

const MonthlyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <S.MonthlyReportPageContainer>
      <S.FirstRowContainer>
        <PostureWarningSummary detectionCountStat={detectionCountStat} />
        <MonthlyCalendar
          selectedDate={selectedDate}
          onMonthChange={handleDateSelect}
        />
      </S.FirstRowContainer>

      <S.SecondeRowContainer></S.SecondeRowContainer>
    </S.MonthlyReportPageContainer>
  );
};

export default MonthlyReportPage;
