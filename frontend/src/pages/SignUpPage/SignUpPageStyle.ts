import styled from "styled-components";

export const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  padding: 4rem;
  background-color: var(--navy-100);
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  width: 100%;
  max-width: 36rem;
  max-height: 80vh;

  padding: 4rem 2rem;
  border-radius: 12px;
  background-color: var(--cream);

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 16rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  background-color: var(--mint);
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
`;
