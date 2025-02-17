import { useState } from "react";

import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import DailyCalendar from "../../../components/common/Calendar/DailyCalendar";
import DailyStatistic from "../../../components/DailyStatistic/DailyStatistic";
import SessionLogList from "../../../components/SessionLogList/SessionLogList";

import DAILY_MOCK_DATA from "./dailyMockData";

import * as S from "./DailyReportPageStyle";

const { sessions, dailyStat, previousDailyStat } = DAILY_MOCK_DATA;

const DailyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <S.DailyReportPageContainer>
      <PostureWarningSummary
        detectionCountStat={dailyStat.detectionCountStat}
      />
      <DailyCalendar
        selectedDate={selectedDate}
        onDateChange={handleDateSelect}
      />
      <DailyStatistic
        dailyStat={dailyStat}
        previousDailyStat={previousDailyStat}
      />
      <SessionLogList sessions={sessions} />
    </S.DailyReportPageContainer>
  );
};

export default DailyReportPage;
