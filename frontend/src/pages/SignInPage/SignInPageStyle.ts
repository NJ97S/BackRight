import styled from "styled-components";

export const SignInPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  background-color: var(--navy-100);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rem;
  max-width: 31.25rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
`;

export const LogoIcon = styled.img`
  width: 100%;
`;

export const ServiceDescription = styled.p`
  color: var(--white);
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.75rem;
  padding: 1.25rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;

  background-color: var(--kakao);

  :hover {
    cursor: pointer;
  }
`;

export const NaverLoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.75rem;
  padding: 1.25rem;
  border: none;
  border-radius: 10px;
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;

  background-color: var(--naver);

  :hover {
    cursor: pointer;
  }
`;

export const SignInLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const SignInType = styled.span`
  width: 100%;
`;
