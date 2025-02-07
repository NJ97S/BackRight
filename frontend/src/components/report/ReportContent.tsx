// src/components/report/ReportContent.tsx
import * as S from "./ReportContentStyle";
import ReportTab from "./tab/ReportTab";
import CalendarSection from "./sections/Calendar/CalendarSection";
import DailyStatsSection from "./sections/DailyStats/DailyStatsSection";
import PostureWarningSection from "./sections/PostureWarning/PostureWarningSection";
import SessionLogSection from "./sections/SessionLog/SessionLogSection";

const ReportContent = () => (
  <S.ReportContentContainer>
    <ReportTab />
    <S.MainContent>
      <PostureWarningSection />
      <CalendarSection />
      <DailyStatsSection />
      <SessionLogSection />
    </S.MainContent>
  </S.ReportContentContainer>
);

export default ReportContent;
