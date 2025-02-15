import { Outlet } from "react-router-dom";

import ReportTabs from "../../components/common/ReportTabs/ReportTabs";

import * as S from "./ReportLayoutStyle";

const ReportLayout = () => (
  <S.ReportLayoutContainer>
    <S.ContentContainer>
      <ReportTabs />

      <S.ReportContainer>
        <Outlet />
      </S.ReportContainer>
    </S.ContentContainer>
  </S.ReportLayoutContainer>
);

export default ReportLayout;
