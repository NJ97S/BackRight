import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import useAuthStore from "./store/useAuthStore";
import Header from "./components/common/Header/Header";
import SideBar from "./components/common/SideBar/SideBar";
import MeasurementService from "./components/common/MeasurementService/MeasurementService";

import * as S from "./AppLayoutStyle";

const AppLayout = () => {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const { isAuthenticated, fetchUserInfo } = useAuthStore();

  const onToggleSideBar = () => {
    setIsSideBarExpanded((prev) => !prev);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!isAuthenticated) return null;

  return (
    <>
      <Header onToggleSideBar={onToggleSideBar} />

      <MeasurementService />

      <S.BodyContainer>
        <SideBar isExpanded={isSideBarExpanded} />
        <Outlet />
      </S.BodyContainer>
    </>
  );
};

export default AppLayout;
