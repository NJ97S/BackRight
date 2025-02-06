import React, { useState } from "react";
import * as S from "./ReportTabStyle";

type TabType = "daily" | "weekly" | "monthly";

const ReportTab = () => {
  const [activeTab, setActiveTab] = useState<TabType>("daily");

  const tabs = [
    { id: "daily", text: "일일 보고서" },
    { id: "weekly", text: "주간 보고서" },
    { id: "monthly", text: "월간 보고서" },
  ];

  return (
    <S.TabContainer>
      {tabs.map((tab, index) => (
        <S.TabItem
          key={tab.id}
          isActive={activeTab === tab.id}
          style={{ left: `${index * 184.66}px` }}
          onClick={() => setActiveTab(tab.id as TabType)}
        >
          <S.TabText isActive={activeTab === tab.id}>{tab.text}</S.TabText>
        </S.TabItem>
      ))}
    </S.TabContainer>
  );
};

export default ReportTab;
