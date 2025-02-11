// src/pages/report/WeeklyReport.tsx
import * as S from "./ReportPageStyle";
import CalendarSection from "../../components/Calendar/CalendarSection";
import PostureWarningSection from "../../components/PostureWarning/PostureWarningSection";

const WeeklyReport = () => (
  <S.MainContent>
    <PostureWarningSection />
    <CalendarSection />
    <CalendarSection />
    <CalendarSection />
  </S.MainContent>
);

export default WeeklyReport;
