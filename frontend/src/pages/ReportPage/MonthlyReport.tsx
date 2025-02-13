import React, { useState } from "react";
import CalendarSection from "../../components/Calendar/Calendar";
import PostureWarningSection from "../../components/PostureWarning/PostureWarning";
import AveragePostureTime from "../../components/common/charts/AveragePostureTime";

const getWeeksInMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstThursday = new Date(
    year,
    month,
    1 + ((4 - firstDay.getDay() + 7) % 7)
  );
  const lastThursday = new Date(
    year,
    month,
    lastDay.getDate() - ((lastDay.getDay() + 3) % 7)
  );

  return (
    Math.ceil(
      (lastThursday.getTime() - firstThursday.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    ) + 1
  );
};

const MonthlyReport: React.FC = () => {
  const [selectedDate] = useState(new Date());
  const monthlyData = [45, 52, 38, 42, 35];

  const weeksCount = getWeeksInMonth(selectedDate);
  const monthLabels = Array.from(
    { length: weeksCount },
    (_, i) => `${i + 1}주차`
  );

  return (
    <>
      <PostureWarningSection />
      <CalendarSection />
      <AveragePostureTime
        data={monthlyData.slice(0, weeksCount)}
        labels={monthLabels}
      />
    </>
  );
};

export default MonthlyReport;
