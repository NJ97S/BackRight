import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem;
  background: var(--white);
  border-radius: 0.75rem;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  height: calc(100% - 3.5rem);
`;

export const DonutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const DonutWrapper = styled.div`
  position: relative;
  width: 13.75rem;
  height: 13.75rem;
`;

export const DonutLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--mint);
`;

export const Divider = styled.div`
  width: 0.0625rem;
  height: 19.8125rem;
  background: var(--gray-300);
  border: none;
  border-left: 0.0625rem dashed var(--gray-300);
`;

export const BarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const BarWrapper = styled.div`
  position: relative;
  height: 11.5rem;
`;

export const DonutDescription = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

export const BarDescription = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

export const DescriptionTitle = styled.div`
  font-size: 0.875rem;
  color: var(--black);
  font-family: "Pretendard";
  margin-bottom: 0.5rem;
`;

export const DescriptionText = styled.div`
  font-size: 0.875rem;
  color: var(--black);
  font-family: "Pretendard";
`;

export const HighlightText = styled.span`
  font-weight: 700;
`;

export const DifferenceIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DifferenceText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--mint);
`;
