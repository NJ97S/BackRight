import * as S from "./SideBarStyle";

import recordIcon from "../../../assets/icons/record.svg";
import reportIcon from "../../../assets/icons/report.svg";
import myPageIcon from "../../../assets/icons/my-page.svg";
import settingIcon from "../../../assets/icons/setting.svg";
import helpIcon from "../../../assets/icons/help.svg";

const SideBar = () => (
  <S.SideBarContainer>
    <S.ImageContainer>
      <S.IconLink to="#">
        <S.Icon src={recordIcon} alt="자세분석" />
      </S.IconLink>
      <S.IconLink to="#">
        <S.Icon src={reportIcon} alt="보고서" />
      </S.IconLink>
      <S.IconLink to="#">
        <S.Icon src={myPageIcon} alt="마이페이지" />
      </S.IconLink>
    </S.ImageContainer>

    <S.ImageContainer>
      <S.IconLink to="#">
        <S.Icon src={settingIcon} alt="환경설정" />
      </S.IconLink>
      <S.IconLink to="#">
        <S.Icon src={helpIcon} alt="도움말" />
      </S.IconLink>
    </S.ImageContainer>
  </S.SideBarContainer>
);

export default SideBar;
