// src/sections/Calendar/CalendarSection.styles.ts
import styled from "styled-components";

// 캘린더 컨테이너 - flex 레이아웃으로 변경
export const CalendarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: var(--white);
  border-radius: 12px;
  padding: 1.5rem;
  align-content: center;
  justify-content: center;
`;

// 캘린더 헤더 - 기존 마진 대신 gap 사용
export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const MonthTitle = styled.span`
  color: var(--black);
  font-size: 1rem;
  font-weight: 600;
  font-family: "Pretendard";
`;

export const StyledCalendar = styled.div`
  .react-calendar {
    border: none;

    // 네비게이션 버튼 (화살표)
    .react-calendar__navigation {
      display: none; // 우리는 커스텀 화살표를 사용할 것이므로
    }

    // 요일 행
    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 0.75rem;

      abbr {
        text-decoration: none;
        border: none;
      }

      // 일요일
      .react-calendar__month-view__weekdays__weekday:last-child {
        color: var(--red);
      }

      // 토요일
      .react-calendar__month-view__weekdays__weekday: nth-child(6) {
        color: var(--blue);
      }
    }

    // 날짜 타일
    .react-calendar__tile {
      padding: 0.5rem;
      font-size: 0.75rem;

      &.react-calendar__month-view__days__day--weekend {
        color: var(
          --black
        ); // 요거를 안하면, 기본적으로 react-calendar는 토욜 날짜 일욜 날짜에 색을 입힘!
      }

      &--now {
        background: none;
        color: var(--black);
        font-weight: 700;
      }

      &--active {
        background: var(--mint) !important;
        color: white;
        border-radius: 12px;
      }

      // 이전/다음 달 날짜
      &.react-calendar__month-view__days__day--neighboringMonth {
        color: var(--gray-300);
      }
    }
  }
`;

export const ArrowButton = styled.button<{ direction: "left" | "right" }>`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  svg {
    width: 0.5rem;
    height: 1rem;
    fill: var(--gray-300);
    transform: ${({ direction }) =>
      direction === "left" ? "none" : "rotate(180deg)"};
  }
`;
