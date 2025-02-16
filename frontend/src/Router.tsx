import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./AppLayout";
import SettingPage from "./pages/SettingPage/SettingPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ReportLayout from "./pages/ReportPage/ReportLayout";
import DailyReportPage from "./pages/ReportPage/DailyReportPage/DailyReportPage";
import WeeklyReportPage from "./pages/ReportPage/WeeklyReportPage/WeeklyReportPage";
import MonthlyReportPage from "./pages/ReportPage/MonthlyReportPage/MonthlyReportPage";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="report/" element={<ReportLayout />}>
          <Route path="daily" element={<DailyReportPage />} />
          <Route path="weekly" element={<WeeklyReportPage />} />
          <Route path="monthly" element={<MonthlyReportPage />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
