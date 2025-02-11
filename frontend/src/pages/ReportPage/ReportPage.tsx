import { Routes, Route, Navigate } from "react-router-dom";
import * as S from "./ReportPageStyle";
import ReportTab from "../../components/common/ReportTab/ReportTab";
import DailyReport from "./DailyReport";
import WeeklyReport from "./WeeklyReport";
import MonthlyReport from "./MonthlyReport";

const ReportPage = () => (
  <S.PageContainer>
    <S.ContentContainer>
      <ReportTab />
      <Routes>
        {/* '/' -> '' 로 변경 */}
        <Route path="" element={<Navigate to="daily" replace />} />
        {/* '/daily' -> 'daily' 로 변경 */}
        <Route path="daily" element={<DailyReport />} />
        {/* '/weekly' -> 'weekly' 로 변경 */}
        <Route path="weekly" element={<WeeklyReport />} />
        {/* '/monthly' -> 'monthly' 로 변경 */}
        <Route path="monthly" element={<MonthlyReport />} />
      </Routes>
    </S.ContentContainer>
  </S.PageContainer>
);

export default ReportPage;
