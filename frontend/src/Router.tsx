import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
