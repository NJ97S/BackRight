import * as S from "./SignInPageStyle";

import kakaoLogo from "../../assets/icons/kakao-logo.webp";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignInPage = () => {
  const handleKakaoButtonClick = () => {
    location.href = `${BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <S.SignInPageContianer>
      <S.KakaoLoginButton onClick={handleKakaoButtonClick}>
        <S.SignInLogo src={kakaoLogo} alt="카카오" />
        <S.SignInType>카카오로 로그인</S.SignInType>
      </S.KakaoLoginButton>
    </S.SignInPageContianer>
  );
};

export default SignInPage;
