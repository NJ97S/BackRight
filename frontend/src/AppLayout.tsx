import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/common/Header/Header";
import SideBar from "./components/common/SideBar/SideBar";

import * as S from "./AppLayoutStyle";

const AppLayout = () => {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

  const onToggleSideBar = () => {
    setIsSideBarExpanded((prev) => !prev);
  };

  return (
    <>
      <Header onToggleSideBar={onToggleSideBar} />

      <S.BodyContainer>
        <SideBar isExpanded={isSideBarExpanded} />
        <Outlet />
      </S.BodyContainer>
    </>
  );
};

export default AppLayout;
