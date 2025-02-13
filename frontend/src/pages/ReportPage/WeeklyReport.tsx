import CalendarSection from "../../components/Calendar/Calendar";
import PostureWarningSection from "../../components/PostureWarning/PostureWarning";
import AveragePostureTime from "../../components/common/charts/AveragePostureTime";

interface WeeklyReportProps {
  weeklyData?: number[];
  weekLabels?: string[];
}

const WeeklyReport = ({
  weeklyData = [45, 55, 25, 48, 44, 5, 13],
  weekLabels = ["월", "화", "수", "목", "금", "토", "일"],
}: WeeklyReportProps) => (
  <>
    <PostureWarningSection />
    <CalendarSection />
    <AveragePostureTime data={weeklyData} labels={weekLabels} />
  </>
);

export default WeeklyReport;
