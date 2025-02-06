import * as S from "./HeaderStyle";

import bellIcon from "../../../assets/icons/bell.svg";
import hamburgerIcon from "../../../assets/icons/hamburger.svg";

interface HeaderProps {
  onToggleSideBar: () => void;
}

const Header = ({ onToggleSideBar }: HeaderProps) => (
  <S.HeaderContainer>
    <S.IconButton onClick={onToggleSideBar}>
      <S.Icon src={hamburgerIcon} alt="메뉴 아이콘" />
    </S.IconButton>

    <S.SideContainer>
      <S.IconLink to="#">
        <S.Icon src={bellIcon} alt="알림 아이콘" />
      </S.IconLink>
      <S.IconLink to="/profile">
        <S.ProfileImage />
      </S.IconLink>
    </S.SideContainer>
  </S.HeaderContainer>
);

export default Header;
