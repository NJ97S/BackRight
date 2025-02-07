// src/components/report/ReportContentStyle.ts
import styled from "styled-components";

// 추가한 코드
export const ReportContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// 메인 컨텐츠 영역
export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1.35fr;
  gap: 1.44rem; // 23px을 rem으로 변환
  padding: 2.88rem 2.63rem; // 46px 42px를 rem으로 변환
  background: var(--cream);
  box-shadow: 0px 0px 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

// // 섹션 컴포넌트들 - 모두 100% 사용
// export const TopLeftSection = styled.div`
//   background: var(--white);
//   border-radius: 12px;
// `;

// export const TopRightSection = styled.div`
//   background: var(--white);
//   border-radius: 12px;
// `;

// export const BottomLeftSection = styled.div`
//   background: var(--white);
//   border-radius: 12px;
// `;

// export const BottomRightSection = styled.div`
//   background: var(--white);
//   border-radius: 12px;
// `;
