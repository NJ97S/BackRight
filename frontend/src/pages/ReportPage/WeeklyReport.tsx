import * as S from "./ReportPageStyle";
import CalendarSection from "../../components/Calendar/Calendar";
import PostureWarningSection from "../../components/PostureWarning/PostureWarning";

const WeeklyReport = () => (
  <S.MainContent>
    <PostureWarningSection />
    <CalendarSection />
    <CalendarSection />
    <CalendarSection />
  </S.MainContent>
);

export default WeeklyReport;
