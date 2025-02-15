import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import useAuthStore from "./store/useAuthStore";
import Header from "./components/common/Header/Header";
import SideBar from "./components/common/SideBar/SideBar";
import MeasurementService from "./components/common/MeasurementService/MeasurementService";
import PATH from "./constants/path";

import * as S from "./AppLayoutStyle";

const AppLayout = () => {
  const navigate = useNavigate();

  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const { isAuthenticated, fetchUserInfo } = useAuthStore();

  const onToggleSideBar = () => {
    setIsSideBarExpanded((prev) => !prev);
  };

  const checkAuth = async () => {
    await fetchUserInfo();

    const updatedAuthState = useAuthStore.getState().isAuthenticated;

    if (!updatedAuthState) {
      navigate(PATH.SIGN_IN, { replace: true });
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated, navigate]);

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
