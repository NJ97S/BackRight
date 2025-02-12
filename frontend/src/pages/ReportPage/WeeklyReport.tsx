import type React from "react";
import CalendarSection from "../../components/Calendar/Calendar";
import PostureWarningSection from "../../components/PostureWarning/PostureWarning";
import AveragePostureTime from "../../components/common/charts/AveragePostureTime";

const WeeklyReport: React.FC = () => {
  const weeklyData = [45, 55, 25, 48, 44, 5, 13];
  const weekLabels = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <>
      <PostureWarningSection />
      <CalendarSection />
      <AveragePostureTime data={weeklyData} labels={weekLabels} />
    </>
  );
};

export default WeeklyReport;
