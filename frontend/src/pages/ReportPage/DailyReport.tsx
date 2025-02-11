import * as S from "./ReportPageStyle";
import PostureWarningSection from "../../components/PostureWarning/PostureWarning";
import CalendarSection from "../../components/Calendar/Calendar";
import DailyStatsSection from "../../components/DailyStats/DailyStats";
import SessionLogSection from "../../components/SessionLog/SessionLog";

const DailyReport = () => (
  <S.MainContent>
    <PostureWarningSection />
    <CalendarSection />
    <DailyStatsSection />
    <SessionLogSection />
  </S.MainContent>
);

export default DailyReport;
