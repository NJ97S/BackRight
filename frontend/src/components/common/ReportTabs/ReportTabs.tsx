import { useLocation } from "react-router-dom";

import * as S from "./ReportTabsStyle";

const TAB_LIST = [
  { name: "일일 보고서", path: "/report/daily" },
  { name: "주간 보고서", path: "/report/weekly" },
  { name: "월간 보고서", path: "/report/monthly" },
];

const ReportTabs = () => {
  const location = useLocation();

  return (
    <S.ReportTabsContainer>
      {TAB_LIST.map((tab) => (
        <S.ReportTab
          key={tab.path}
          to={tab.path}
          $isActive={location.pathname === tab.path}
        >
          {tab.name}
        </S.ReportTab>
      ))}
    </S.ReportTabsContainer>
  );
};

export default ReportTabs;
