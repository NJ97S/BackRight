import { useEffect, useState } from "react";

import MonthlyCalendar from "../../../components/common/Calendar/MonthlyCalendar";
import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import AveragePostureTime from "../../../components/common/AveragePostureTime/AveragePostureTime";
import RankingSummary from "../../../components/common/RankingSummary/RankingSummary";
import Loading from "../../../components/common/Loading/Loading";

import { MonthlyReportType } from "../../../types/reportType";
import { convertDateToString } from "../../../utils/timeFormatUtils";
import { getMonthlyReport } from "../../../apis/api";

import * as S from "./MonthlyReportPageStyle";

const getFirstDayOfMonth = (): Date => {
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth(), 1);
};

const MonthlyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(getFirstDayOfMonth());
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReportType | null>(
    null
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const requestMonthlyReport = async (date: Date) => {
    const formattedDate = convertDateToString(date);

    const reportData = await getMonthlyReport(formattedDate);

    setMonthlyReport(reportData);
  };

  useEffect(() => {
    requestMonthlyReport(selectedDate);
  }, [selectedDate]);

  if (!monthlyReport)
    return <Loading backgroundColor="cream">Loading...</Loading>;

  return (
    <S.MonthlyReportPageContainer>
      <S.FirstRowContainer>
        <PostureWarningSummary
          detectionCountStat={monthlyReport.detectionCountStat}
        />
        <MonthlyCalendar
          selectedDate={selectedDate}
          onMonthChange={handleDateSelect}
        />
      </S.FirstRowContainer>

      <S.SecondeRowContainer>
        <AveragePostureTime
          data={monthlyReport.weeklyProperPoseMinutesPerHours}
          labels={Array.from(
            {
              length: monthlyReport.weeklyProperPoseMinutesPerHours.length,
            },
            (_, i) => `${i + 1}주차`
          )}
        />
        <RankingSummary />
      </S.SecondeRowContainer>
    </S.MonthlyReportPageContainer>
  );
};

export default MonthlyReportPage;
