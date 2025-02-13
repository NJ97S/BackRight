import * as S from "./SignInPageStyle";

import logo from "../../assets/images/logo.webp";
import kakaoLogo from "../../assets/icons/kakao-logo.webp";
import naverLogo from "../../assets/icons/naver-logo.svg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignInPage = () => {
  const handleKakaoButtonClick = () => {
    location.href = `${BASE_URL}/oauth2/authorization/kakao`;
  };

  const handleNaverButtonClick = () => {
    location.href = `${BASE_URL}/oauth2/authorization/naver`;
  };

  return (
    <S.SignInPageContainer>
      <S.ContentContainer>
        <S.LogoContainer>
          <S.LogoIcon src={logo} alt="로고" />
          <S.ServiceDescription>
            장시간 앉아 있는 당신만을 위한,
            <br />
            맞춤형 자세교정 서비스를 시작해보세요.
          </S.ServiceDescription>
        </S.LogoContainer>
        <S.LoginButtonContainer>
          <S.KakaoLoginButton onClick={handleKakaoButtonClick}>
            <S.SignInLogo src={kakaoLogo} alt="카카오" />
            <S.SignInType>카카오로 로그인</S.SignInType>
          </S.KakaoLoginButton>
          <S.NaverLoginButton onClick={handleNaverButtonClick}>
            <S.SignInLogo src={naverLogo} alt="네이버" />
            <S.SignInType>네이버로 로그인</S.SignInType>
          </S.NaverLoginButton>
        </S.LoginButtonContainer>
      </S.ContentContainer>
    </S.SignInPageContainer>
  );
};

export default SignInPage;
