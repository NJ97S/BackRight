import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 12px;
  padding: 1.5rem;
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
`;

export const StyledCalendar = styled.div`
  .react-calendar {
    border: none;
    width: 100%;
    height: 100%;

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
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 0.75rem;
      margin-bottom: 0.75rem;

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
      aspect-ratio: 1;
      padding: 0;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.react-calendar__month-view__days__day--weekend {
        color: var(--black);
      }

      &--now {
        background: var(--mint) !important;
        color: white !important;
        font-weight: 700;
        border-radius: 12px;

        &.react-calendar__tile--active {
          background: var(--mint) !important;
          color: white !important;
        }
      }

      &:not(.react-calendar__tile--now):enabled:hover {
        background-color: rgba(118, 171, 174, 0.1) !important;
        border-radius: 12px;
        opacity: 0.9;
      }

      &--active:not(.react-calendar__tile--now) {
        background: var(--mint) !important;
        color: white;
        border-radius: 12px;
        font-weight: normal;
      }

      &.react-calendar__month-view__days__day--neighboringMonth {
        color: var(--gray-300);
      }

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
