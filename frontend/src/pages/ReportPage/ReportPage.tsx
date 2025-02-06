import * as S from "./ReportPageStyle";
import ReportTab from "../../components/report/tab/ReportTab";
import ReportContent from "../../components/report/ReportContent";

const ReportPage = () => (
  <S.ReportContainer>
    <S.ReportWrapper>
      <ReportTab />
      <S.MainContent>
        <S.Background />
        <ReportContent />
      </S.MainContent>
    </S.ReportWrapper>
  </S.ReportContainer>
);

export default ReportPage;
