import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ReportTabStyle";

type TabType = "daily" | "weekly" | "monthly";

interface TabItem {
  id: TabType;
  label: string;
  path: string;
}

const REPORT_PERIOD_TABS: TabItem[] = [
  { id: "daily", label: "일일 보고서", path: "/report/daily" },
  { id: "weekly", label: "주간 보고서", path: "/report/weekly" },
  { id: "monthly", label: "월간 보고서", path: "/report/monthly" },
];

const ReportTab = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("daily");

  const handleTabClick = (tab: TabItem) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <S.TabContainer>
      {REPORT_PERIOD_TABS.map((tab) => (
        <S.TabItem
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab)}
        >
          <S.TabText isActive={activeTab === tab.id}>{tab.label}</S.TabText>
        </S.TabItem>
      ))}
    </S.TabContainer>
  );
};

export default ReportTab;
