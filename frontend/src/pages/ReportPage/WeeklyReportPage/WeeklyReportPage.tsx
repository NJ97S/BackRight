import { useEffect, useState } from "react";

import PostureWarningSummary from "../../../components/common/PostureWarningSummary/PostureWarningSummary";
import WeeklyCalendar from "../../../components/common/Calendar/WeeklyCalendar";
import AveragePostureTime from "../../../components/common/AveragePostureTime/AveragePostureTime";
import Loading from "../../../components/common/Loading/Loading";

import RankingSummary from "../../../components/common/RankingSummary/RankingSummary";
import { convertDateToString } from "../../../utils/timeFormatUtils";
import { getWeeklyReport } from "../../../apis/api";
import { WeeklyReportType } from "../../../types/reportType";

import * as S from "./WeeklyReportPageStyle";

const getMondayOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);

  monday.setDate(date.getDate() + diff);
  return monday;
};

const WeeklyReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(getMondayOfWeek(new Date()));
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReportType | null>(
    null
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(getMondayOfWeek(date));
  };

  const requestWeeklyReport = async (date: Date) => {
    const formattedDate = convertDateToString(date);

    const reportData = await getWeeklyReport(formattedDate);

    setWeeklyReport(reportData);
  };

  useEffect(() => {
    requestWeeklyReport(selectedDate);
  }, [selectedDate]);

  if (!weeklyReport)
    return <Loading backgroundColor="cream">Loading...</Loading>;

  return (
    <S.WeeklyReportPageContainer>
      <S.FirstRowContainer>
        <PostureWarningSummary
          detectionCountStat={weeklyReport.detectionCountStat}
        />
        <WeeklyCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateSelect}
        />
      </S.FirstRowContainer>

      <S.SecondeRowContainer>
        <AveragePostureTime
          data={weeklyReport.dailyProperPoseMinutesPerHours}
          labels={["월", "화", "수", "목", "금", "토", "일"]}
        />
        <RankingSummary />
      </S.SecondeRowContainer>
    </S.WeeklyReportPageContainer>
  );
};

export default WeeklyReportPage;
