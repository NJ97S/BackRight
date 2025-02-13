import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: var(--white);
  border-radius: 0.75rem;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
`;

export const MonthTitle = styled.span`
  color: var(--black);
  font-size: 1rem;
  font-weight: 600;
`;

export const ArrowIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

export const ArrowButton = styled.button<{ direction: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1rem;
  height: 1rem;
  padding: 0;
  cursor: pointer;

  svg {
    width: 0.5rem;
    height: 1rem;
    fill: var(--gray-300);
    transform: ${({ direction }) =>
      direction === "left" ? "none" : "rotate(180deg)"};
  }
`;

export const StyledCalendar = styled.div`
  .react-calendar {
    width: 100%;
    height: 100%;
    border: none;

    .react-calendar__viewContainer {
      height: 100%;
    }

    .react-calendar__month-view {
      height: 100%;
    }

    .react-calendar__navigation {
      display: none;
    }

    .react-calendar__month-view__weekdays {
      margin-bottom: 0.75rem;
      text-align: center;
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;

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

    .react-calendar__tile {
      display: flex;
      align-items: center;
      justify-content: center;

      aspect-ratio: 1;
      padding: 0;
      font-size: 0.75rem;

      &.react-calendar__month-view__days__day--weekend {
        color: var(--black);
      }

      &--now {
        background: var(--mint);
        color: var(--white);
        font-weight: 700;
        border-radius: 0.75rem;

        &.react-calendar__tile--active {
          background: var(--mint);
          color: var(--white);
        }
      }

      &:not(.react-calendar__tile--now):enabled:hover {
        opacity: 0.9;
        background-color: rgba(118, 171, 174, 0.1);
        border-radius: 0.75rem;
      }

      &--active:not(.react-calendar__tile--now) {
        background: var(--mint);
        color: var(--white);
        border-radius: 0.75rem;
      }

      &.react-calendar__month-view__days__day--neighboringMonth {
        color: var(--gray-300);
      }

      &--now:not(.react-calendar__tile--active) {
        background: none;
        color: var(--black);
        font-weight: 700;
      }
    }
  }
`;
