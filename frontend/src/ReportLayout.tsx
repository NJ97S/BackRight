import { Outlet } from "react-router-dom";
import * as S from "./ReportLayoutStyle";
import ReportTab from "./components/common/ReportTab/ReportTab";

const ReportLayout = () => (
  <S.PageContainer>
    <S.ContentContainer>
      <ReportTab />
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.ContentContainer>
  </S.PageContainer>
);

export default ReportLayout;
