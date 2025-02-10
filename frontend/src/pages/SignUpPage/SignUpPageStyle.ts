import styled from "styled-components";

export const SignUpPageContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.label``;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--gray-200);
`;

export const SubmitButton = styled.button`
  padding: 0.5rem;
  border-radius: 12px;
  background-color: var(--mint);
  color: var(--white);
`;
