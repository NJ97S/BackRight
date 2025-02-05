// CalendarStyle.ts
import styled, { css } from "styled-components";

interface ArrowIconProps {
  $direction: "left" | "right";
}

export const CalendarContainer = styled.div`
  width: 22.4269rem; // 358.83px
  height: 18.8681rem; // 301.89px
  border-radius: 0.75rem; // 12px
  background-color: var(--white);
  padding: 1.875rem 1.5625rem;

  .react-calendar {
    width: 100%;
    border: none;
    background: none;
    font-family: "Pretendard";

    // 달력 header (년월, 화살표)
    .react-calendar__navigation {
      margin-bottom: 2.5rem;
      height: auto;

      .react-calendar__navigation__label {
        font-size: 1rem;
        font-weight: 600;
        color: var(--black);
      }

      .react-calendar__navigation__arrow {
        min-width: 1.5rem;
        background: none;

        &:enabled:hover,
        &:enabled:focus {
          background: none;
        }
      }
    }

    // 요일
    .react-calendar__month-view__weekdays {
      abbr {
        text-decoration: none;
        font-size: 0.75rem; // 12px
        font-weight: 500;
      }

      .react-calendar__month-view__weekdays__weekday {
        &:first-child {
          color: var(--red); // Sunday
        }
        &:last-child {
          color: var(--blue); // Saturday
        }
      }
    }

    // 날짜
    .react-calendar__tile {
      font-size: 0.75rem; // 12px
      font-weight: 400;
      padding: 0.5rem;

      &:enabled:hover,
      &:enabled:focus {
        background: var(--mint-light);
        border-radius: 0.75rem;
      }

      // 오늘 날짜
      &.react-calendar__tile--now {
        background: var(--mint);
        border-radius: 0.75rem;
        color: var(--white);
      }

      // 선택된 날짜
      &.react-calendar__tile--active {
        background: var(--mint);
        border-radius: 0.75rem;
        color: var(--white);

        &:enabled:hover,
        &:enabled:focus {
          background: var(--mint);
        }
      }

      // 이전/다음 달 날짜
      &.react-calendar__month-view__days__day--neighboringMonth {
        color: var(--gray-300);
      }
    }
  }
`;

// 화살표 아이콘이 SVG 컴포넌트로 있다면:
export const ArrowIcon = styled.div<ArrowIconProps>`
  width: 0.5019rem; // 8.03px
  height: 0.9506rem; // 15.21px
  background-color: var(--gray-300);

  ${({ $direction }) =>
    $direction === "right" &&
    css`
      transform: rotate(180deg);
    `}
`;
