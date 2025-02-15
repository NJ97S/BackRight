import { useState } from "react";

import Calendar from "../../../components/common/Calendar/Calendar";
import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import DailyStatistic from "../../../components/DailyStatistic/DailyStatistic";
import SessionLog from "../../../components/SessionLog/SessionLog";

import DAILY_MOCK_DATA from "./dailyMockData";

import * as S from "./DailyReportPageStyle";

const { detectionCountStat } = DAILY_MOCK_DATA;

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
      <SessionLog />
    </S.DailyReportPageContainer>
  );
};

export default DailyReportPage;
