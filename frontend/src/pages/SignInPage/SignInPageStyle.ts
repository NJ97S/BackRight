import styled from "styled-components";

export const SignInPageContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 18rem;
  height: 3.75rem;
  padding: 1.25rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;

  background-color: #fee500;

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
