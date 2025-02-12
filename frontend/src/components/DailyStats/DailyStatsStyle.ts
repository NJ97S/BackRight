import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: var(--white);
  border-radius: 0.75rem;
`;

export const Title = styled.h2`
  color: var(--black);
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 1.5rem;
`;

export const Description = styled.div`
  text-align: center;
  align-self: center;
`;

export const DescriptionTitle = styled.div`
  margin-bottom: 0.5rem;
  color: var(--black);
  font-size: 0.875rem;
`;

export const DescriptionText = styled.div`
  color: var(--black);
  font-size: 0.875rem;
`;

export const HighlightText = styled.span`
  font-weight: 700;
`;
