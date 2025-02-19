import React, { useEffect, useState } from "react";

import { postLogout } from "../../../apis/api";
import PATH from "../../../constants/path";

import * as S from "./SideBarStyle";

import recordIcon from "../../../assets/icons/record.svg";
import reportIcon from "../../../assets/icons/report.svg";
import myPageIcon from "../../../assets/icons/my-page.svg";
import logoutIcon from "../../../assets/icons/logout.svg";
import settingIcon from "../../../assets/icons/setting.svg";
import helpIcon from "../../../assets/icons/help.svg";
import arrowIcon from "../../../assets/icons/arrow-down.svg";
import docsIcon from "../../../assets/icons/docs.svg";

const SUBMENU_ITEMS = [
  { name: "일간/세션", path: PATH.REPORT_DAILY },
  { name: "주간", path: PATH.REPORT_WEEKLY },
  { name: "월간", path: PATH.REPORT_MONTHLY },
] as const;

interface SideBarProps {
  isExpanded: boolean;
}

const SideBar = ({ isExpanded }: SideBarProps) => {
  const [isReportMenuOpened, setIsReportMenuOpened] = useState(false);

  const handleReportIconClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (isExpanded) {
      e.preventDefault();
      setIsReportMenuOpened((prev) => !prev);
    } else {
      setIsReportMenuOpened(false);
    }
  };

  const handleLogoutButtonClick = async () => {
    await postLogout();

    location.href = PATH.SIGN_IN;
  };

  useEffect(() => {
    if (isExpanded) return;

    setIsReportMenuOpened(false);
  }, [isExpanded]);

  return (
    <S.SideBarContainer isExpanded={isExpanded}>
      <S.ImageContainer isExpanded={isExpanded}>
        <S.IconLink to={PATH.HOME} isExpanded={isExpanded}>
          <S.Icon src={recordIcon} alt="자세분석" />
          <S.LinkName isExpanded={isExpanded}>자세 분석</S.LinkName>
        </S.IconLink>

        <S.ReportMenuContainer>
          <S.IconLink
            to={PATH.REPORT_DAILY}
            onClick={handleReportIconClick}
            isExpanded={isExpanded}
          >
            <S.Icon src={reportIcon} alt="보고서" />
            <S.LinkName isExpanded={isExpanded}>보고서</S.LinkName>
            <S.ArrowIcon
              src={arrowIcon}
              isExpanded={isExpanded}
              isReportMenuOpened={isReportMenuOpened}
            />
          </S.IconLink>
          <S.SubMenuContainer isReportMenuOpened={isReportMenuOpened}>
            {SUBMENU_ITEMS.map((item) => (
              <S.SubMenuItem key={item.name} to={item.path}>
                <S.Icon src={docsIcon} alt="문서아이콘" />
                <S.LinkName isExpanded={isExpanded}>{item.name}</S.LinkName>
              </S.SubMenuItem>
            ))}
          </S.SubMenuContainer>
        </S.ReportMenuContainer>

        <S.IconLink to={PATH.PROFILE} isExpanded={isExpanded}>
          <S.Icon src={myPageIcon} alt="마이페이지" />
          <S.LinkName isExpanded={isExpanded}>마이페이지</S.LinkName>
        </S.IconLink>
      </S.ImageContainer>

      <S.ImageContainer isExpanded={isExpanded}>
        <S.IconButton onClick={handleLogoutButtonClick} isExpanded={isExpanded}>
          <S.Icon src={logoutIcon} alt="로그아웃" />
          <S.LinkName isExpanded={isExpanded}>로그아웃</S.LinkName>
        </S.IconButton>
        <S.IconLink to={PATH.SETTING} isExpanded={isExpanded}>
          <S.Icon src={settingIcon} alt="환경설정" />
          <S.LinkName isExpanded={isExpanded}>환경설정</S.LinkName>
        </S.IconLink>
        <S.IconLink to={PATH.HELP} isExpanded={isExpanded}>
          <S.Icon src={helpIcon} alt="도움말" />
          <S.LinkName isExpanded={isExpanded}>도움말</S.LinkName>
        </S.IconLink>
      </S.ImageContainer>
    </S.SideBarContainer>
  );
};

export default SideBar;
