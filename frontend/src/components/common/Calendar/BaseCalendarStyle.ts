import styled from "styled-components";

import ReactCalendar from "react-calendar";

export const CalendarContainer = styled.div`
  border-radius: 12px;
  background-color: var(--white);
  padding: 2rem 1.5rem;
`;

export const Calendar = styled(ReactCalendar)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;

  width: 100%;
  height: 100%;

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .react-calendar__viewContainer {
    flex: 1;
  }

  .react-calendar__navigation button {
    padding: 0 0.75rem;
    border: none;
    background: none;
    font-size: 1rem;
    font-weight: 700;
    color: var(--black);
    cursor: pointer;
  }

  .react-calendar__year-view,
  .react-calendar__year-view__months,
  .react-calendar__month-view,
  .react-calendar__month-view > div {
    height: 100%;
  }

  .react-calendar__month-view__weekdays {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.55rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(1) abbr {
    color: red;
  }
  .react-calendar__month-view__weekdays__weekday:nth-child(7) abbr {
    color: blue;
  }

  .react-calendar__month-view__days {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }

  .react-calendar__tile {
    padding: 0.55rem;
    border-radius: 6px;
    font-size: 0.75rem;
    text-align: center;
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }

  .react-calendar__tile--now {
    color: var(--mint);
  }

  .react-calendar__tile:hover {
    background: var(--gray-100);
  }

  .highlighted-day {
    background-color: var(--mint);
    color: var(--white);
  }

  .highlighted-week-left {
    background-color: var(--mint);
    color: var(--white);
    border-top-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 0;
  }

  .highlighted-week-right {
    background-color: var(--mint);
    color: var(--white);
    border-top-left-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 4px;
  }

  .highlighted-week-middle {
    background-color: var(--mint);
    color: var(--white);
    border-radius: 0;
  }

  .highlighted-month {
    background-color: var(--mint);
    color: var(--white);
    font-weight: bold;
    border-radius: 8px;
  }
`;
