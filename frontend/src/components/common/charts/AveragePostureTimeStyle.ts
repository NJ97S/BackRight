import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;

  background: var(--white);
  border-radius: 0.75rem;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  color: var(--black);
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 25rem;
  padding: 2rem;
`;
