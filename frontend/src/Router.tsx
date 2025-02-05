import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./AppLayout";
import ReportPage from "./pages/ReportPage/ReportPage";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="report" element={<ReportPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
