import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./AppLayout";
import SettingPage from "./pages/SettingPage/SettingPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ReportLayout from "./ReportLayout";
import DailyReport from "./pages/ReportPage/DailyReport";
import WeeklyReport from "./pages/ReportPage/WeeklyReport";
import MonthlyReport from "./pages/ReportPage/MonthlyReport";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="report/" element={<ReportLayout />}>
          <Route index element={<Navigate to="daily" replace />} />
          <Route path="daily" element={<DailyReport />} />
          <Route path="weekly" element={<WeeklyReport />} />
          <Route path="monthly" element={<MonthlyReport />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
