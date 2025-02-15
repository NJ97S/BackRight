import useAuthStore from "../../../store/useAuthStore";

import * as S from "./HeaderStyle";

import bellIcon from "../../../assets/icons/bell.svg";
import hamburgerIcon from "../../../assets/icons/hamburger.svg";
import logo from "../../../assets/images/logo.webp";
import defaultProfileImg from "../../../assets/images/mock-profile.jpg";

interface HeaderProps {
  onToggleSideBar: () => void;
}

const Header = ({ onToggleSideBar }: HeaderProps) => {
  const { user } = useAuthStore();

  return (
    <S.HeaderContainer>
      <S.LogoContainer>
        <S.IconButton onClick={onToggleSideBar}>
          <S.Icon src={hamburgerIcon} alt="메뉴 아이콘" />
        </S.IconButton>
        <S.Icon src={logo} alt="로고" />
      </S.LogoContainer>

      <S.SideContainer>
        <S.IconLink to="#">
          <S.Icon src={bellIcon} alt="알림 아이콘" />
        </S.IconLink>
        <S.IconLink to="/profile">
          <S.ProfileImage
            src={user?.profileImgUrl || defaultProfileImg}
            alt="프로필 사진"
          />
        </S.IconLink>
      </S.SideContainer>
    </S.HeaderContainer>
  );
};

export default Header;
