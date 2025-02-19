import { useState } from "react";

import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import DailyCalendar from "../../../components/common/Calendar/DailyCalendar";
import DailyStatistic from "../../../components/DailyStatistic/DailyStatistic";
import SessionLogList from "../../../components/SessionLogList/SessionLogList";
import SessionReport from "../SessionReportPage/SessionReportPage";

import { SessionType } from "../../../types/reportType";
import DAILY_MOCK_DATA from "./dailyMockData";

import * as S from "./DailyReportPageStyle";

const { sessions, dailyStat, previousDailyStat } = DAILY_MOCK_DATA;

const DailyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(
    null
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSessionSelect = (session: SessionType) => {
    setSelectedSession(session);
  };

  const handleCloseSessionReport = () => {
    setSelectedSession(null);
  };

  return (
    <S.DailyReportPageContainer $hasSelectedSession={!!selectedSession}>
      {selectedSession ? (
        <SessionReport
          session={selectedSession}
          onClose={handleCloseSessionReport}
        />
      ) : (
        <>
          <PostureWarningSummary
            detectionCountStat={dailyStat.detectionCountStat}
          />
          <DailyStatistic
            dailyStat={dailyStat}
            previousDailyStat={previousDailyStat}
          />
        </>
      )}
      <DailyCalendar
        selectedDate={selectedDate}
        onDateChange={handleDateSelect}
      />
      <SessionLogList
        sessions={sessions}
        selectedSession={selectedSession}
        onSessionSelect={handleSessionSelect}
      />
    </S.DailyReportPageContainer>
  );
};

export default DailyReportPage;
