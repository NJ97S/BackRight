import { Outlet } from "react-router-dom";

import Header from "./components/common/Header/Header";
import SideBar from "./components/common/SideBar/SideBar";

import * as S from "./AppLayoutStyle";

const AppLayout = () => (
  <>
    <Header />

    <S.BodyContainer>
      <SideBar />
      <Outlet />
    </S.BodyContainer>
  </>
);

export default AppLayout;
