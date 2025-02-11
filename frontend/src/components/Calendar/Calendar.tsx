import { useState } from "react";
import Calendar from "react-calendar";
import type { CalendarDateChangeHandler } from "../../types/calendar";
import * as S from "./CalendarStyle";

import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import arrowRightIcon from "../../assets/icons/arrow-right.svg";

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handlePreviousMonth = () => {
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
    const selectedValue = Array.isArray(value) ? value[0] : value;

    if (selectedValue) {
      setSelectedDate(selectedValue);
    }
  };

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.ArrowButton direction="left" onClick={handlePreviousMonth}>
          <S.ArrowIcon src={arrowLeftIcon} alt="이전 달" />
        </S.ArrowButton>
        <S.MonthTitle>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </S.MonthTitle>
        <S.ArrowButton direction="right" onClick={handleNextMonth}>
          <S.ArrowIcon src={arrowRightIcon} alt="다음 달" />
        </S.ArrowButton>
      </S.CalendarHeader>
      <S.StyledCalendar>
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          activeStartDate={currentDate}
          defaultValue={new Date()}
          defaultActiveStartDate={new Date()}
          showNavigation={false}
          locale="en"
          formatDay={(_, date) => date.getDate().toString()}
          showFixedNumberOfWeeks={true}
        />
      </S.StyledCalendar>
    </S.CalendarContainer>
  );
};

export default CalendarSection;
