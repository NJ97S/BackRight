import * as S from "./HeaderStyle";

import bellIcon from "../../../assets/icons/bell.svg";
import hamburgerIcon from "../../../assets/icons/hamburger.svg";

const Header = () => (
  <S.HeaderContainer>
    <S.Icon src={hamburgerIcon} alt="메뉴 아이콘" />

    <S.SideContainer>
      <S.Icon src={bellIcon} alt="알림 아이콘" />
      <S.ProfileImage />
    </S.SideContainer>
  </S.HeaderContainer>
);

export default Header;
