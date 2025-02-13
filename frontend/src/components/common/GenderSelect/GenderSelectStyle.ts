import styled from "styled-components";

export const GenderSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 16rem;
`;

export const Label = styled.label`
  font-weight: 600;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const RadioButton = styled.div`
  flex: 1;
  display: flex;
`;

export const RadioInput = styled.input`
  display: none;

  &:checked + label {
    background-color: var(--gray-300);
    color: var(--white);
  }
`;

export const RadioLabel = styled.label`
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 4px;
  font-size: 0.875rem;
  text-align: center;
  cursor: pointer;

  transition: background-color 0.3s ease, color 0.3s ease;
`;
