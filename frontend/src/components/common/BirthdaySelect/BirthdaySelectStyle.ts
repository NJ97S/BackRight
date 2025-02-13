import styled from "styled-components";
import Calendar from "react-calendar";

export const BirthdaySelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 16rem;
`;

export const Label = styled.label`
  font-weight: 600;
`;

const getInputBorderStyle = (hasError: boolean, isOpened: boolean) => {
  if (isOpened) return "1.5px solid var(--mint)";
  if (hasError) return "1px solid var(--red)";
  return "1px solid var(--gray-300)";
};

interface InputContainerProps {
  isEmpty: boolean;
  isOpened: boolean;
  hasError: boolean;
}

export const InputContainer = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "isEmpty" && prop !== "isOpened" && prop !== "hasError",
})<InputContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;
  border: ${({ hasError, isOpened }) =>
    getInputBorderStyle(hasError, isOpened)};
  border-radius: 4px;

  color: ${({ isEmpty }) => (isEmpty ? "#757575" : "var(--black)")};
  font-size: 1rem;
  font-weight: 600;
  text-align: left;

  cursor: pointer;
`;

export const CalendarIcon = styled.img`
  height: 100%;
`;

export const ErrorMessage = styled.span`
  position: absolute;
  bottom: -1.25rem;
  font-size: 14px;
  color: var(--red);
`;

export const StyledCalendar = styled(Calendar)`
  z-index: 10;
  position: absolute;
  top: 4.5rem;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  border-radius: 4px;
  padding: 1rem;
  background: var(--white);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .react-calendar__navigation button {
    padding: 0.5rem;
    border: none;
    background: none;
    color: var(--black);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }

  .react-calendar__month-view__weekdays {
    padding-bottom: 0.5rem;
    color: var(--gray-500);
    font-size: 0.875rem;
    font-weight: bold;
    text-align: center;

    abbr[title] {
      text-decoration: none;
    }
  }

  .react-calendar__tile {
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.875rem;
    text-align: center;
    transition: 0.2s ease-in-out;
    cursor: pointer;
  }

  .react-calendar__tile--now {
    color: var(--mint);
    font-weight: bold;
  }

  .react-calendar__tile--active {
    background: var(--mint);
    color: var(--white);
    font-weight: bold;
  }

  .react-calendar__tile:hover {
    background: var(--gray-100);
  }
`;
