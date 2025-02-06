// src/sections/Calendar/CalendarSection.styles.ts
import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 358.83px;
  height: 301.89px;
  position: relative;
  background: var(--white);
  border-radius: 0.75rem;
  padding: 1.75rem 1.5rem;
`;

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
    width: 100%;
    border: none;

    // 네비게이션 버튼 (화살표)
    .react-calendar__navigation {
      display: none; // 우리는 커스텀 화살표를 사용할 것이므로
    }

    // 요일 행
    .react-calendar__month-view__weekdays {
      text-align: center;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 0.75rem;

      abbr {
        text-decoration: none;
        border: none;
      }

      // 일요일
      .react-calendar__month-view__weekdays__weekday:first-child {
        color: var(--red);
      }

      // 토요일
      .react-calendar__month-view__weekdays__weekday:last-child {
        color: var(--blue);
      }
    }

    // 날짜 타일
    .react-calendar__tile {
      padding: 0.5rem;
      font-size: 0.75rem;

      &--now {
        background: none;
        color: var(--black);
        font-weight: 700;
      }

      &--active {
        background: var(--mint) !important;
        color: white;
        border-radius: 0.75rem;
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
