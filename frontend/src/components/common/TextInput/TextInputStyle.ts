import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 16rem;
`;

export const Label = styled.label`
  font-weight: 600;
`;

interface InputProps {
  hasError?: boolean;
}

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<InputProps>`
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 4px;
  background-color: transparent;
  font-size: 1rem;
  font-weight: 600;

  border-color: ${({ hasError }) =>
    hasError ? "var(--red)" : "var(--gray-300)"};

  &:focus {
    border: 1.5px solid var(--mint);
  }
`;

export const ErrorMessage = styled.span`
  position: absolute;
  bottom: -1.25rem;
  font-size: 14px;
  color: var(--red);
`;
