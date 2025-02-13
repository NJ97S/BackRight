import PostureWarningSection from "../../components/PostureWarning/PostureWarning";
import CalendarSection from "../../components/Calendar/Calendar";
import DailyStatsSection from "../../components/DailyStats/DailyStats";
import SessionLogSection from "../../components/SessionLog/SessionLog";

const DailyReport = () => (
  <>
    <PostureWarningSection />
    <CalendarSection />
    <DailyStatsSection />
    <SessionLogSection />
  </>
);

export default DailyReport;
