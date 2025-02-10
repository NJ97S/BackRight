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
      display: none;
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

      .react-calendar__month-view__weekdays__weekday:last-child {
        color: var(--red);
      }

      .react-calendar__month-view__weekdays__weekday:nth-child(6) {
        color: var(--blue);
      }
    }

    // 날짜 타일
    .react-calendar__tile {
      padding: 0.5rem;
      font-size: 0.75rem;

      &.react-calendar__month-view__days__day--weekend {
        color: var(--black);
      }

      &--now {
        background: var(--mint) !important;
        color: white !important;
        font-weight: 700;
        border-radius: 12px;

        &:hover {
          opacity: 0.9;
        }

        // 오늘 날짜가 선택되었을 때
        &.react-calendar__tile--active {
          background: var(--mint) !important;
          color: white !important;
        }
      }

      // 다른 날짜가 선택되었을 때
      &--active:not(.react-calendar__tile--now) {
        background: var(--mint) !important;
        color: white;
        border-radius: 12px;
        font-weight: normal;
      }

      &.react-calendar__month-view__days__day--neighboringMonth {
        color: var(--gray-300);
      }

      &:enabled:hover {
        background-color: rgba(118, 171, 174, 0.1) !important;
        border-radius: 12px;
      }

      // 오늘 날짜가 아닌 날짜가 선택되었을 때 오늘 날짜의 스타일
      &--now:not(.react-calendar__tile--active) {
        background: none !important;
        color: var(--black) !important;
        font-weight: 700;
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
