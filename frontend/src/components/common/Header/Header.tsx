import * as S from "./HeaderStyle";

import bellIcon from "../../../assets/icons/bell.svg";
import hamburgerIcon from "../../../assets/icons/hamburger.svg";

const Header = () => (
  <S.HeaderContainer>
    <S.IconLink to="#">
      <S.Icon src={hamburgerIcon} alt="메뉴 아이콘" />
    </S.IconLink>

    <S.SideContainer>
      <S.IconLink to="#">
        <S.Icon src={bellIcon} alt="알림 아이콘" />
      </S.IconLink>
      <S.IconLink to="#">
        <S.ProfileImage />
      </S.IconLink>
    </S.SideContainer>
  </S.HeaderContainer>
);

export default Header;
