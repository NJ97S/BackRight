import { useState } from "react";

import Calendar from "../../../components/common/Calendar/Calendar";
import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import DailyStatistic from "../../../components/DailyStatistic/DailyStatistic";
import SessionLogList from "../../../components/SessionLogList/SessionLogList";

import DAILY_MOCK_DATA from "./dailyMockData";

import * as S from "./DailyReportPageStyle";

const { sessions, detectionCountStat } = DAILY_MOCK_DATA;

const DailyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <S.DailyReportPageContainer>
      <PostureWarningSummary detectionCountStat={detectionCountStat} />
      <Calendar selectedDate={selectedDate} onDateChange={handleDateSelect} />
      <DailyStatistic />
      <SessionLogList sessions={sessions} />
    </S.DailyReportPageContainer>
  );
};

export default DailyReportPage;
