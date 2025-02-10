import styled from "styled-components";

// 전체 컨테이너 스타일링
export const Container = styled.div`
  padding: 1.5rem;
  background: var(--white);
  border-radius: 0.75rem;
  width: 100%;
  height: 100%;
`;

// 제목 스타일링
export const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

// Grid 레이아웃을 사용한 콘텐츠 영역
export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 1.5rem;
  height: calc(100% - 3.5rem);
`;

// 도넛 차트 wrapper
export const DonutWrapper = styled.div`
  position: relative;
  width: 13.75rem;
  height: 13.75rem;
  justify-self: center;
  align-self: center;
`;

// 도넛 차트 중앙 레이블
export const DonutLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--mint);
`;

// 막대 그래프 wrapper
export const BarWrapper = styled.div`
  position: relative;
  height: 11.5rem;
  justify-self: center;
  align-self: center;
`;

// 설명 텍스트 공통 스타일링
export const Description = styled.div`
  text-align: center;
  align-self: center;
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

// 차이 표시 인디케이터
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
