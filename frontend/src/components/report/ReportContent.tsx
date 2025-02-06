// src/report/ReportContent.tsx
import React, { useState } from "react";
import styled from "styled-components";
import CalendarSection from "./sections/Calendar/CalendarSection";
import PostureWarningSection from "./sections/PostureWarning/PostureWarningSection";
import DailyStatsSection from "./sections/DailyStats/DailyStatsSection";
import SessionLogSection from "./sections/SessionLog/SessionLogSection";

const ContentContainer = styled.div`
  width: 100%;
  padding: 2.5rem;
  background: var(--cream);
  border-radius: 0.75rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const ReportContent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ContentContainer>
      <PostureWarningSection />
      <CalendarSection
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <DailyStatsSection />
      <SessionLogSection />
    </ContentContainer>
  );
};

export default ReportContent;
