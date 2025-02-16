import { useState } from "react";

import MonthlyCalendar from "../../../components/common/Calendar/MonthlyCalendar";
import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import AveragePostureTime from "../../../components/common/AveragePostureTime/AveragePostureTime";

import MONTHLY_MOCK_DATA from "./monthlyMockData";

import * as S from "./MonthlyReportPageStyle";
import RankingSummary from "../../../components/common/RankingSummary/RankingSummary";

const { detectionCountStat, weeklyProperPostureMinutesPerHours } =
  MONTHLY_MOCK_DATA;

const MonthlyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <S.MonthlyReportPageContainer>
      <S.FirstRowContainer>
        <PostureWarningSummary detectionCountStat={detectionCountStat} />
        <MonthlyCalendar
          selectedDate={selectedDate}
          onMonthChange={handleDateSelect}
        />
      </S.FirstRowContainer>

      <S.SecondeRowContainer>
        <AveragePostureTime
          data={weeklyProperPostureMinutesPerHours}
          labels={Array.from(
            { length: weeklyProperPostureMinutesPerHours.length },
            (_, i) => `${i + 1}주차`
          )}
        />
        <RankingSummary />
      </S.SecondeRowContainer>
    </S.MonthlyReportPageContainer>
  );
};

export default MonthlyReportPage;
