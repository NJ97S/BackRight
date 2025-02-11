import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./AppLayout";
import SettingPage from "./pages/SettingPage/SettingPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ReportPage from "./pages/ReportPage/ReportPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="report/*" element={<ReportPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
