import { useState } from "react";
import * as S from "./ReportTabStyle";

type TabType = "daily" | "weekly" | "monthly";

interface TabItem {
  id: TabType;
  label: string;
}

const TAB_ITEMS: TabItem[] = [
  { id: "daily", label: "일일 보고서" },
  { id: "weekly", label: "주간 보고서" },
  { id: "monthly", label: "월간 보고서" },
];

const ReportTab = () => {
  const [activeTab, setActiveTab] = useState<TabType>("daily");

  return (
    <S.TabContainer>
      {TAB_ITEMS.map((tab) => (
        <S.TabItem
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        >
          <S.TabText isActive={activeTab === tab.id}>{tab.label}</S.TabText>
        </S.TabItem>
      ))}
    </S.TabContainer>
  );
};

export default ReportTab;
