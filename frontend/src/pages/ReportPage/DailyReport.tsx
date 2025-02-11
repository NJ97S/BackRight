import * as S from "./ReportPageStyle";
import PostureWarningSection from "../../components/PostureWarning/PostureWarningSection";
import CalendarSection from "../../components/Calendar/CalendarSection";
import DailyStatsSection from "../../components/DailyStats/DailyStatsSection";
import SessionLogSection from "../../components/SessionLog/SessionLogSection";

const DailyReport = () => (
  <S.MainContent>
    <PostureWarningSection />
    <CalendarSection />
    <DailyStatsSection />
    <SessionLogSection />
  </S.MainContent>
);

export default DailyReport;
