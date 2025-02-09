// PostureWarningSectionStyle.ts
import styled from "styled-components";

export const Container = styled.div`
  background: var(--white);
  border-radius: 0.75rem;
  padding: 1.93rem 1.57rem 1.93rem 1.57rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 3.62rem;
`;

export const Title = styled.h2`
  color: var(--black);
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

export const TotalWarnings = styled.div`
  position: absolute;
  right: 0;
  color: var(--gray-300);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const WarningCount = styled.span`
  color: var(--red);
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  padding: 0 1.57rem;
`;

export const Card = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 10.47rem;
  height: 11.44rem;
  padding: 1.12rem 1rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--gray-100);
`;

export const CardImage = styled.img`
  width: 5.68rem;
  height: 5.69rem;
  object-fit: contain;
`;

export const CardCount = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-top: 1.93rem;
`;
