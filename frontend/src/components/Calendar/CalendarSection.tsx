import { useState } from "react";
import Calendar from "react-calendar";
import type { CalendarDateChangeHandler } from "../../types/calendar";
import {
  CalendarContainer,
  CalendarHeader,
  MonthTitle,
  StyledCalendar,
  ArrowButton,
} from "./CalendarSectionStyle";

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateChange: CalendarDateChangeHandler = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      setSelectedDate(value[0]);
    }
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <ArrowButton direction="left" onClick={handlePrevMonth}>
          <svg viewBox="0 0 8 15">
            <path d="M7.72 0.28L0.72 7.28C0.53 7.47 0.43 7.73 0.43 8C0.43 8.27 0.53 8.53 0.72 8.72L7.72 15.72C8.1 16.1 8.73 16.1 9.11 15.72C9.49 15.34 9.49 14.71 9.11 14.33L2.78 8L9.11 1.67C9.49 1.29 9.49 0.66 9.11 0.28C8.73 -0.09 8.1 -0.09 7.72 0.28Z" />
          </svg>
        </ArrowButton>
        <MonthTitle>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </MonthTitle>
        <ArrowButton direction="right" onClick={handleNextMonth}>
          <svg viewBox="0 0 8 15">
            <path d="M7.72 0.28L0.72 7.28C0.53 7.47 0.43 7.73 0.43 8C0.43 8.27 0.53 8.53 0.72 8.72L7.72 15.72C8.1 16.1 8.73 16.1 9.11 15.72C9.49 15.34 9.49 14.71 9.11 14.33L2.78 8L9.11 1.67C9.49 1.29 9.49 0.66 9.11 0.28C8.73 -0.09 8.1 -0.09 7.72 0.28Z" />
          </svg>
        </ArrowButton>
      </CalendarHeader>
      <StyledCalendar>
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          activeStartDate={currentDate}
          defaultValue={new Date()}
          defaultActiveStartDate={new Date()}
          showNavigation={false}
          locale="en"
          formatDay={(_, date) => date.getDate().toString()}
        />
      </StyledCalendar>
    </CalendarContainer>
  );
};

export default CalendarSection;
