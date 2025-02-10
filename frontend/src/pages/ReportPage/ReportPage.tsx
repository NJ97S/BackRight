import * as S from "./ReportPageStyle";
import ReportTab from "../../components/common/ReportTab/ReportTab";
import CalendarSection from "../../components/Calendar/CalendarSection";
import DailyStatsSection from "../../components/DailyStats/DailyStatsSection";
import PostureWarningSection from "../../components/PostureWarning/PostureWarningSection";
import SessionLogSection from "../../components/SessionLog/SessionLogSection";

const ReportPage = () => (
  <S.PageContainer>
    <S.ContentContainer>
      <ReportTab />
      <S.MainContent>
        <PostureWarningSection />
        <CalendarSection />
        <DailyStatsSection />
        <SessionLogSection />
      </S.MainContent>
    </S.ContentContainer>
  </S.PageContainer>
);

export default ReportPage;
